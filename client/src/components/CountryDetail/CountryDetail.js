import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getCountryID, clearCache } from '../../redux/actions';

import './CountryDetail.css';

export default function CountryDetail () {
    let { idCountry } = useParams();

    let dispatch = useDispatch();
    let c = useSelector((state) => state.country);

    // monto el país
    useEffect(() => {
        dispatch(getCountryID(idCountry));      
    }, [dispatch]);
    // -------------> agregar que se updatee al quitar actividad de su info

    // desmonto el país
    useEffect(() => {
        return () => dispatch(clearCache());
    }, [dispatch]);

    return (
        <div className='countries-container'>
        { 
            !c ? 
                'Loading...'
            :
            <div>
                <h1>{c.name}</h1>
                <img src={c.img} alt="img" />
                <p>Capital: {c.capital}</p>
                <p>Continent: {c.continent}</p>
                <p>Subregion: {c.subregion}</p>
                <p>Area: {c.area}</p>
                <p>Population: {c.population}</p>
                <p>Activities: </p>
                <ul>
                    {
                        c.Activities?.map((a, index) =>
                                <li key={index}>{a.name}</li>
                        )
                    }
                </ul>
            </div>
        }
        </div>
    );

};