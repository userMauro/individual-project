import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import './App.css';

import Landing from "./components/Landing/Landing.js";
import NotFound from "./components/NotFound/NotFound.js";
import Home from "./components/Home/Home.js"

function App() {
  return (
    <Router>
      <div>
        <Switch>
          <Route exact path="/" component={Landing} />
          <Route path='/home' component={Home} />
          <Route path='*' component={NotFound} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;