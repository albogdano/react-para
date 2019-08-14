import React from 'react';
import { BrowserRouter as Router, Route, NavLink } from "react-router-dom";
import pkg from '../package.json';
import About from './About';
import Home from './Home';

function App() {
  return (
      <div>
          <div className="App">
              <header className="App-header">
                  <h1>Recipe Manager <code><small>v{pkg.version}</small></code></h1>
                  <div className="more"></div>
              </header>
          </div>
          <div>
              <Router>
                  <nav>
                      <NavLink to="/" exact activeClassName="router-link-active" >Home</NavLink>
                      <NavLink to="/about" activeClassName="router-link-active">About</NavLink>
                  </nav>
                  <Route path="/" exact component={Home} />
                  <Route path="/about" exact component={About} />
              </Router>
          </div>
      </div>
  );
}

export default App;

