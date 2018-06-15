import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import albumData from './../data/albums';
import { Grid, Cell, } from 'react-mdl';

class Library extends Component {
  constructor(props) {
     super(props);
     this.state = { albums: albumData };
   }

   bgStyle(bg) {
     return {background: 'url("' + bg + '") no-repeat center / cover'  }
   }

  render() {
   return (
     <section className='library'>
       <Grid className="demo-grid-1">

             {
               this.state.albums.map( (album, index) =>
                 <Link to={`/album/${album.slug}`} key={index} >

                      <Cell col={index}>
                   <div className="library-album mdl-card mdl-shadow--4dp">
                     <div style=" object-fit: scale-down" className="mdl-card__title mdl-card--expand" style={this.bgStyle(album.albumCover)} >
                       <h2 className="mdl-card__title-text">{album.title}</h2>
                     </div>
                     <div className="artist mdl-card__supporting-text">
                       {album.artist}
                     </div>

                   </div></Cell>

                 </Link>
               )
             }
             </Grid>
           </section>
    );
  }
}

export default Library;
