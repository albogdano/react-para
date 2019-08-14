import React from 'react';
import { BrowserRouter, Route, NavLink } from "react-router-dom";
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
                <BrowserRouter basename={process.env.NODE_ENV === "production" ? "/react-para" : "/"}>
                    <nav>
                        <NavLink to="/" exact activeClassName="router-link-active" >Home</NavLink>
                        <NavLink to="/about" activeClassName="router-link-active">About</NavLink>
                    </nav>
                    <Route path="/" exact component={Home} />
                    <Route path="/about" exact component={About} />
                </BrowserRouter>
            </div>
        </div>
    );
}

export default App;

