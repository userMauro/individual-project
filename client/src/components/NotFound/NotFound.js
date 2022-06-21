import React from 'react';
import { Link } from 'react-router-dom';

export default function NotFound () {
    return (
        <div className='notfound'>
            Not found 404
            <Link to = '/home/countries'>
                <button>HOME</button>
            </Link>
        </div>
    );
};