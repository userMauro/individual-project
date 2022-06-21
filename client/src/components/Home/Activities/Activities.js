import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { createActivity, getAllCountries } from "../../../redux/actions";
import './Activities.css';


export default function Activities () {
    const dispatch = useDispatch();
    let countries = useSelector(state => state.countries);

    // mostrar listado de países ordenado alfabéticamente
    countries?.sort((a, b) => {
        if (a.name > b.name) return 1;
        if (b.name > a.name) return -1;
        return 0;
    });

    const [state, setState] = useState({
        name: "",
        difficulty: "",
        duration: "",
        season: "",
        idCountries: [],
    });

    useEffect(() => {
        dispatch(getAllCountries());
    }, [dispatch])

    const handleChange = e => {
        setState({
            ...state,
            [e.target.name]: e.target.value
        });
    };

    const handleSelect = e => { 
        if (state.idCountries.length <= 30) {
            if (!state.idCountries.includes(e.target.value)) {
                setState({
                    ...state, 
                    idCountries: [...state.idCountries, e.target.value]
                });
            };
        };
        document.getElementById('newActCountry').value = 'Select country';
    };

    const handleOnSubmit = e => {
        e.preventDefault(e);
        if (!state.name || !state.difficulty || !state.duration || !state.season) alert('Empty fields');
        else {
            dispatch(createActivity(state));
            setState({
                name: "",
                difficulty: "",
                duration: "",
                season: "",
                idCountries: [],
            });
            document.getElementById('durationSel').value = 'Select duration';
            document.getElementById('difficultySel').value = 'Select difficulty';
            document.getElementById('seasonSel').value = 'Select season';
            alert('Activity added!');
        };
    };

    const handleClick = e => {
        e.preventDefault(e);
        setState({
            ...state,
            idCountries: state.idCountries.filter(c => c !== e.target.value)
        });
    };

    return (
        <div>
        <div className='containerActivities'>
            <div className='activities'>
                <form onSubmit={handleOnSubmit}>
                    <div>
                        <input required className='inputActivity' type="text" name="name" value={state.name} placeholder="New activity name..." onChange={handleChange} />
                    </div>

                    {/* SELECT DURATION */}
                    <div>
                        <select className='selectFilters' id='durationSel' defaultValue='Select duration' name="duration" onChange={handleChange}>
                            <option disabled>Select duration</option>
                            <option value={'15 minutes'}>15 minutes</option>
                            <option value={'30 minutes'}>30 minutes</option>
                            <option value={'45 minutes'}>45 minutes</option>
                            <option value={'1 hora'}>1 hour</option>
                            <option value={'2 hours'}>2 hours</option>
                            <option value={'3 hours'}>3 hours</option>
                            <option value={'4 hours'}>4 hours</option>
                            <option value={'+5 hours'}>+5 hours</option>
                        </select>
                    </div>

                    {/* SELECT DIFFICULTY */}
                    <div>
                        <select className='selectFilters' id='difficultySel' defaultValue='Select difficulty' name="difficulty" onChange={handleChange}>
                            <option disabled>Select difficulty</option>
                            <option value={1}>1</option>
                            <option value={2}>2</option>
                            <option value={3}>3</option>
                            <option value={4}>4</option>
                            <option value={5}>5</option>
                        </select>
                    </div>

                    {/* SELECT SEASON */}
                    <div>
                        <select className='selectFilters' id='seasonSel' defaultValue='Select season' name="season" onChange={handleChange}>
                            <option disabled>Select season</option>
                            <option value={'All year'}>All Year</option>
                            <option value={'Summer'}>Summer</option>
                            <option value={'Autumn'}>Autumn</option>
                            <option value={'Winter'}>Winter</option>
                            <option value={'Spring'}>Spring</option>
                        </select>
                    </div>

                    {/* SELECT COUNTRY */}
                    <div>
                        <select className='selectFilters' id='newActCountry' defaultValue='Select country' name="season" onChange={handleSelect} value={state.id}>
                            <option disabled>Select country</option>
                                {countries?.map(mp => (
                                    <option key={mp.id} value={mp.id}>{mp.name}</option>
                                ))}
                        </ select>
                    </div>

                    <button className='addBtnActivity'>Add activity</button>
                </form>

                {/* COUNTRIES ADDED */}
                <div>
                    <label className='labelCountriesAdded'>Countries added: </label>
                    <div className='countriesBox'>
                        {
                            state.idCountries?.map((c, index) => 
                                        <div className='countriesAdded' key={index}>
                                            <button key={index} value={c} onClick={(e) => handleClick(e)} className='btnCountriesAdded'>X</button>
                                            {c}
                                        </div>
                            )
                        }
                    </div>
                </div>

            </div>
        </div>
        </div>
    );

};