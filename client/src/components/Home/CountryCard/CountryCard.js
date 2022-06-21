import React from 'react';
import { Link } from 'react-router-dom';

import './CountryCard.css';

export default function CountryCard (props) {

  return (
    <div className='card'>
      <Link to ={`/home/countries/${props.id}`}> 
        <img className='img' alt='img' src={`${props.img}`}></img>
        <div className='country'>
          <p className='nameDetail'>{`${props.name}`}</p>
          <p className='continentsDetailName'>{`(${props.continent})`}</p>
        </div>
      </Link>
    </div>
  );

};