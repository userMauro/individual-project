import React from 'react';
import { Link, Route } from 'react-router-dom';

import LogoMundo from '../../../imgs/logoMundo.png';
import SearchBar from './SearchBar/SearchBar.js';
import Filters from './Filters/Filters';

import './Nav.css';

export default function Nav() {

    return (
        <header>
            <div className="navbar">
                <Link to='/home/countries'><img id="logoMundo" src={LogoMundo} alt="World" /></Link>
                <Route exact path="/home/countries" component={SearchBar} />
            </div>
            <div>
                <Route exact path="/home/countries" component={Filters} />
            </div>
        </header>
    );
};