import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import './App.css';
import { Layout, Header, Navigation, Drawer, Content } from 'react-mdl';
import Landing from './components/Landing';
import Library from './components/Library';
import Album from './components/Album';

class App extends Component {
  render() {
    return (
      <div className="demo-big-content">
      <Layout>
          <Header className="header-color" title={<Link style={{textDecoration: 'none', color: 'white'}} to="/">React Radio</Link>} scroll>
              <Navigation>
                  <Link to="/Library">Music Library</Link>

              </Navigation>
          </Header>
        
          <Content>
              <div className="page-content" />
                <main>
              <Route exact path="/" component={Landing} />
              <Route path="/library" component={Library} />
              <Route path="/album/:slug" component={Album} />
            </main>
          </Content>
      </Layout>
  </div>

      );
    }
  }

  export default App;
