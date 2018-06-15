import React, { Component } from 'react';
import { Grid, Cell } from 'react-mdl';


class Landing extends Component {
  render() {
    return(
      <div style={{width: '100%', margin: 'auto'}}>
        <Grid className="landing-grid">
          <Cell col={12}>
            <img
              src="/assets/images/reactradio.png"
              alt="avatar"
              className="avatar-img"
              />

            <div className="banner-text">
              <h1>Streaming Music For Programmers</h1>

            <hr/>

          <p><Link to="/Library">
  <img src="/assets/images/Play-Now.png" alt="play button"/>
</Link>
  </p>


            </div>
          </Cell>
        </Grid>
      </div>
    )
  }
}

export default Landing;
