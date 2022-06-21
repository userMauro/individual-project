import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getCountryID, clearCache, deleteActivity } from '../../../redux/actions';

import './CountryDetail.css';

export default function CountryDetail () {
    let { idCountry } = useParams();

    let dispatch = useDispatch();
    let c = useSelector((state) => state.country);
    const [state, setState] = useState();

    // monto el país
    useEffect(() => {
        dispatch(getCountryID(idCountry));  
    }, [dispatch, idCountry]);

    // desmonto el país
    useEffect(() => {
        return () => dispatch(clearCache());
    }, [dispatch]);

    function handleClick(idActivity) {
        c.Activities = c.Activities.filter(c => c.id !== idActivity);
        dispatch(deleteActivity({idActivity, idCountry}));
        setState({...state, state: c})  // para actualizar el renderizado de mis activities
    };

    return (
        <div>
        { 
            c.name === undefined ? 
                ( !c.msg?
                    <div className='loading'>
                        <img alt='loadingImg' src='https://1.bp.blogspot.com/-Os_G7fBordU/W1dFCdFA3AI/AAAAAAAAp-I/NLfM0h9Nvw42dtkvBlgzC_1_QFmKHBEVgCLcBGAs/s1600/world_flags_globe_1.gif'/>
                    </div> :
                    <div>
                        {c.msg}
                    </div>
                )
            :
            <div className='details'>

                <div className='detailsCountry'>
                    {/* FLAG, NAME & CONTINENT */}
                    <div className='detailsFlag'>
                        <img className='detailsImg' src={c.img} alt="img" />
                        <div className='detailsName'>
                                <h4>{c.name}</h4>
                                <p>({c.continent})</p>
                        </div>
                    </div>
                
                    {/* REST OF DETAILS */}
                    <div className='detailsCard'>
                        <div className='detailsCardLabels'>
                            <p>Capital</p>
                            <p className='detailsLabels'>Subregion</p>
                            <p className='detailsLabels'>Area</p>
                            <p className='detailsLabels'>Population</p>
                        </div>

                        <div className='detailsCardValues'>
                            <p>{c.capital}</p>
                            <p className='detailsLabels'>{c.subregion}</p>
                            <p className='detailsLabels'>{c.area}</p>
                            <p className='detailsLabels'>{c.population}</p>
                        </div>
                    </div>
                </div>

                {/* ACTIVITIES */}
                <div className='activitiesCountry'>
                    <div>
                        <p>Activities</p>
                        <div className='activitiesBox'>
                            { c.Activities?.map((a, index) => 
                                <div className='activitiesOfCountry' key={index}>
                                    <button className='btnActivitiesofCountry' onClick={() => handleClick(a.id)}>X</button>
                                    {a.name}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

        }
        </div>
    );

};