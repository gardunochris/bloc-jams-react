import React, { Component } from 'react';
import albumData from './../data/albums';
import PlayerBar from './PlayerBar';
import './album.css';
import './player-bar.css';
import './song-list.css';



class Album extends Component {
  constructor(props) {
     super(props);

     const album = albumData.find( album => {
       return album.slug === this.props.match.params.slug
     });

     this.state = {
       album: album,
       currentSong: album.songs[0],
       currentTime: 0,
       duration: album.songs[0].duration,
       isPlaying: false,
       isHovered: false,
       songHovered: album.songs[0],

     };

     this.handleHoverOn = this.handleHoverOn.bind(this);
     this.handleHoverOff = this.handleHoverOff.bind(this);

     this.audioElement = document.createElement('audio');
     this.audioElement.src = album.songs[0].audioSrc;
   }

   componentDidMount() {
     this.eventListeners = {
       timeupdate: e => {
         this.setState({ currentTime: this.audioElement.currentTime });
       },
       durationchange: e => {
         this.setState({ duration: this.audioElement.duration });
       }
     };
     this.audioElement.addEventListener('timeupdate', this.eventListeners.timeupdate);
     this.audioElement.addEventListener('durationchange', this.eventListeners.durationchange);
   }

   componentWillUnmount() {
     this.audioElement.src = null;
     this.audioElement.removeEventListener('timeupdate', this.eventListeners.timeupdate);
     this.audioElement.removeEventListener('durationchange', this.eventListeners.durationchange);
   }

   play() {
     this.audioElement.play();
     this.setState({ isPlaying: true });
}

   pause() {
     this.audioElement.pause();
     this.setState({ isPlaying: false });
}

   setSong(song) {
     this.audioElement.src = song.audioSrc;
     this.setState({ currentSong: song });
}

   handleSongClick(song) {
     const isSameSong = this.state.currentSong === song;
     if (this.state.isPlaying && isSameSong) {
       this.pause();
     } else {
       if (!isSameSong) { this.setSong(song); }
       this.play();
     }
   }

   handleHoverOn(song){
    this.setState({
        isHovered: false
    });
    this.setState({
        songHovered: song
    });
  }

  handleHoverOff(){
    this.setState({
        isHovered: true
    });
  }

  songHover(song, index, album) {
    const isSameSong = this.state.currentSong === song;
    if (!this.state.isHovered && this.state.songHovered === song && !isSameSong) {
      return (
        <div className = "ion-play"></div>
      )
    } else if (!this.state.isPlaying && isSameSong) {
      return (
        <div className = "ion-play"></div>
      )
    } else if (this.state.isPlaying && isSameSong){
      return(
        <div className = "ion-pause"></div>
      )
    } else {
        return (
          <div className = "song-number">{index + 1}</div>
        )
    }
  }

  handlePrevClick() {
      const currentIndex = this.state.album.songs.findIndex(song => this.state.currentSong === song);
      const newIndex = Math.max(0, currentIndex - 1);
      const newSong = this.state.album.songs[newIndex];
      this.setSong(newSong);
      this.play();
    }

  handleNextClick(song) {
      this.setState({ songHovered: song });
      const currentIndex = this.state.album.songs.findIndex(song => this.state.currentSong === song);
      const albumEnd = this.state.album.songs.length - 1;
      const newIndex = Math.min(albumEnd, currentIndex + 1);
      const newSong = this.state.album.songs[newIndex];
      this.setSong(newSong);
      this.play();
    }

  handleTimeChange(e) {
      const newTime = this.audioElement.duration * e.target.value;
      this.audioElement.currentTime = newTime;
      this.setState({ currentTime: newTime });
   }

  handleVolumeChange(e) {
      const newVolume = e.target.value;
      this.audioElement.volume = newVolume;
      this.setState({ volume: newVolume});
   }

  formatTime(time) {
      var minutes = Math.floor(time/60);
      var seconds = Math.round(time % 60);
      if (typeof time !== "number") {
       return "-:--";
      }
      else if (seconds <10) {
        return minutes + ":0" + seconds;
      }
      return minutes + ":" + seconds;
   }


   render() {
     return (
       <section className="album">
         <section id="album-info">
           <img id="album-cover-art" src={this.state.album.albumCover} alt={this.state.album.title}/>
           <div className="album-details">
             <h1 id="album-title">{this.state.album.title}</h1>
             <h2 className="artist">{this.state.album.artist}</h2>
             <div id="release-info">{this.state.album.releaseInfo}</div>
           </div>
         </section>
         <table id="song-list">
           <colgroup>
             <col id="song-number-column" />
             <col id="song-title-column" />
             <col id="song-duration-column" />
           </colgroup>
           <tbody>
              {
                this.state.album.songs.map( (song, index, album) =>
                  <tr className="song" key={index} onClick={() => this.handleSongClick(song)}
                    onMouseEnter={() => this.handleHoverOn(song)}
                    onMouseLeave={this.handleHoverOff}>
                    <td>
                      {this.songHover(song, index, album)}
                    </td>
                    <td className="song-title">{song.title}</td>
                    <td className="song-duration">{this.formatTime(parseInt(song.duration, 10))}</td>
                  </tr>
                )
              }
            </tbody>
         </table>


         <PlayerBar
           isPlaying={this.state.isPlaying}
           currentSong={this.state.currentSong}
           currentTime={this.audioElement.currentTime}
           duration={this.audioElement.duration}
           handleSongClick={() => this.handleSongClick(this.state.currentSong)}
           handlePrevClick={() => this.handlePrevClick()}
           handleNextClick={() => this.handleNextClick(this.state.album.songs.song)}
           handleTimeChange={(e) => this.handleTimeChange(e)}
           handleVolumeChange={(e) => this.handleVolumeChange(e)}
           formatTime={(time) => this.formatTime(time)}
         />
       </section>


     );
   }
 }

export default Album;
