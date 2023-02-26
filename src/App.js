import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route} from "react-router-dom";
import Navbar from "./components/navbar.component"
import {Search} from "./components/search.component";
import {Login} from "./components/login.component";
import {ScrollingGallery} from "./components/scrolling-gallery.component";
import CreateUser from "./components/create-user.component";

function App() {
  return (
    <Router>
      <switch>
      </switch>
      <body>
        <div className="container">
        <Route path="/" exact component={Login} />
        </div>
        <div className="container">
        <Route path="/search" component={Search} />
        </div>
        <div className="container">
        <Route path="/summary" component={ScrollingGallery} />
        </div>

        
      </body>
      
    </Router>
  );
}

export default App;
