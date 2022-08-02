import React from "react";
import { useDispatch } from "react-redux";

import './SearchBar.css';

import { getCountries, getAllCountries, filterByContinent } from "../../../../redux/slice";

export default function SearchBar () {
    const dispatch = useDispatch();

    function handleChange(e) {
        e.preventDefault();
        dispatch(getCountries(e.target.value));     // modifico el estado global de 'filters' para renderizar en <Countries>
        document.getElementById('continents').value = 'All World';
        document.getElementById('order-by').value = 'Order by';
        document.getElementById('order-AZ').value = 'asc';
        document.getElementById('activities').value = 'All';
    };

    function handleSubmit(e) {
        e.preventDefault();
    };

    const handleContinent = e => { 
        e.preventDefault(e);
        if (e.target.value === 'All World') dispatch(getAllCountries());
        else dispatch(filterByContinent(e.target.value))
        document.getElementById('title').value = '';
        document.getElementById('order-by').value = 'Order by';
        document.getElementById('order-AZ').value = 'asc';
        document.getElementById('activities').value = 'All';
    }; 

    return (
        <div className='searchAndContinents'>

            {/* INPUT SEARCH COUNTRY */}
            <form onSubmit = {(e) => handleSubmit(e)}>
                <div className='inputSearch'>
                    <input
                    type = 'text'
                    placeholder = 'Search country...'
                    id = 'title'
                    autoComplete = 'off'
                    onChange = {(e) => handleChange(e)}
                    />
                </div>
            </form>

            {/* FILTER BY CONTINENTS */}
            <div>
                <select className='selectContinents' id='continents' onChange={handleContinent}>
                    <option value='All World'>All World</option>
                    <option value='Africa'>Africa</option>
                    <option value='Americas'>Americas</option>
                    <option value='Antarctic'>Antarctic</option>
                    <option value='Asia'>Asia</option>
                    <option value='Europe'>Europe</option>
                    <option value='Oceania'>Oceania</option>
                </select>
            </div>
        </div>
    );
};