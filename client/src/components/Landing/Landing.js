import React from 'react';
import { Link } from 'react-router-dom';

import './Landing.css';

export default function Landing () {
    return (
        <div className='landing'>
            <div className='backLanding'>
                <Link to = '/home/countries'>
                    <img src='https://i.gifer.com/3IsN.gif' className='btnLanding' alt='landing'/>
                </Link>
            </div>
            <div className='labelLanding'>
                Welcome to Planet Earth
            </div>
        </div>
    );
};