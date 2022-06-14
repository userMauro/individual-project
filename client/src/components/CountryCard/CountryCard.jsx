import React from 'react';
import { Link } from 'react-router-dom';

import './CountryCard.css';

export default function CountryCard (props) {

  return (
    <div className='card'>
      <img className='img' alt='img' src={`${props.img}`}></img>
      <div className='country'>
        <Link to ={`/countries/${props.id}`}> <p>{`${props.name}`}</p></Link>
        <p>{`(${props.continent})`}</p>
      </div>
    </div>
  );

};