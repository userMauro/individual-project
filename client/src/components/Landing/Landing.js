import React from 'react';
import { Link } from 'react-router-dom';

export default function Landing () {
    return (
        <div>
            Hello World
            <Link to = '/countries'>
                <button>enter</button>
            </Link>
        </div>
    )

}