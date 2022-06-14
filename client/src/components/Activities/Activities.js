import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { Link } from "react-router-dom";
import { createActivity, getAllCountries } from "../../redux/actions";

import './Activities.css';


export default function Activities () {
    const dispatch = useDispatch();
    const countries = useSelector(state => state.countries);

    const [state, setState] = useState({
        name: "",
        difficulty: 1,
        duration: "15 minutes",
        season: "All year",
        idCountries: [],
    });

    useEffect(() => {
        dispatch(getAllCountries());
    }, [])

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
        if (!state.name || !state.difficulty || !state.duration || !state.season) alert('Empty fields')
        else {
            dispatch(createActivity(state));
            setState({
                name: "",
                difficulty: "",
                duration: "",
                season: "",
                idCountries: [],
            });
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
        <div className='container-activities'>
            <div className="label-activities">
                    Create new activity
                    {/* <Link to="/countries"><button>Back</button></Link> */}
            </div>
            <div className='activities'>
                <form onSubmit={handleOnSubmit}>
                    <div>
                        <label>Name: </label>
                        <input type="text" name="name" value={state.name} placeholder="Name here..." onChange={handleChange} />
                    </div>
                    <div>
                        <label>Duration: </label>
                        <select name="duration" onChange={handleChange}>
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
                    <div>
                        <label>Difficulty: </label>
                        <select name="difficulty" onChange={handleChange}>
                            <option value={1}>1</option>
                            <option value={2}>2</option>
                            <option value={3}>3</option>
                            <option value={4}>4</option>
                            <option value={5}>5</option>
                        </select>
                    </div>
                    <div>
                        <label>Season: </label>
                        <select name="season" onChange={handleChange}>
                            <option value={'All year'}>All Year</option>
                            <option value={'Summer'}>Summer</option>
                            <option value={'Autumn'}>Autumn</option>
                            <option value={'Winter'}>Winter</option>
                            <option value={'Spring'}>Spring</option>
                        </select>
                    </div>
                    <div>
                        <label>Countries: </label>
                        <select id='newActCountry' defaultValue='Select country' name="season" onChange={handleSelect} value={state.id}>
                            <option disabled>Select country</option>
                                {countries?.map(mp => (
                                    <option key={mp.id} value={mp.id}>{mp.name}</option>
                                ))}
                        </ select>
                    </div>
                    <button className='addBtnActivity'>Add activity</button>
                </form>
                <div>
                    <label>Countries added: </label>
                    <div className='countriesBox'>
                        {
                            state.idCountries.length ?
                                state.idCountries.map((c, index) => 
                                            <div className='countriesAdded' key={index}>
                                                <button key={index} value={c} onClick={(e) => handleClick(e)} className='btnCountriesAdded'>X</button>
                                                {c}
                                            </div>
                                )
                            :
                                <div>No countries added</div>
                        }
                    </div>
                </div>
            </div>
        </div>
    );

};