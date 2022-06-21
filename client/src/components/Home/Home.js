import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Nav from './Nav/Nav.js'
import Countries from './Countries/Countries.js'
import CountryDetail from './CountryDetail/CountryDetail.js'
import Activities from './Activities/Activities.js'
import NotFound from "../NotFound/NotFound.js";


function Home() {
    return (
        <Router>
            <div className="App">
                <Route path="/" component={Nav} />
                <Switch>
                    <Route exact path="/home/countries" component={Countries} />
                    <Route exact path="/home/countries/:idCountry" component={CountryDetail} />
                    <Route exact path="/home/activities" component={Activities} />
                    <Route path='*' component={NotFound} />
                </Switch>
            </div>
        </Router>
    );
}

export default Home;