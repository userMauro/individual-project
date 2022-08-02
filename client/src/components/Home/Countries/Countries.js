import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { getAllCountries } from '../../../redux/slice.js';
import CountryCard from '../CountryCard/CountryCard.js';
import Paginate from '../Paginate/Paginate.js';
import './Countries.css';

export default function Countries () {
    const dispatch = useDispatch();

    const countries = useSelector(state => state.rootReducer.renderized);
    // const { renderized: countries } = useSelector(state => state.rootReducer);
    
    useEffect(() => {
        dispatch(getAllCountries());
    }, [dispatch]); 

    // PAGINATE
        useEffect(() => {
            paginated(1);   // cuando cambio la búsqueda de país, siempre llamo a la página 1 (sino queda en otra)
            // document.getElementById('paginateBtn').active = true;
        }, [countries])

        const [currentPage, setCurrentPage] = useState(1);
        let countriesPerPage;
        currentPage === 1 ? countriesPerPage = 9 : countriesPerPage = 10;

        const indexOfLastCountry = currentPage * countriesPerPage;
        const indexOfFirstCountry = indexOfLastCountry - countriesPerPage;
        
        let currentCountries;
        if (countries.length > 0) {
            // currentCountries = countries.slice(indexOfFirstCountry, indexOfLastCountry);
            currentCountries = countries.slice(
                (currentPage !== 1 ? indexOfFirstCountry - 1 : indexOfFirstCountry), 
                (currentPage !== 1 ? indexOfLastCountry - 1 : indexOfLastCountry))
            // console.log(currentCountries)
        };

        function paginated(pageNumber) {
            setCurrentPage(pageNumber);
        };

        function prevPage(pageNumber) {
            currentPage === 1 ? setCurrentPage(1) : setCurrentPage(pageNumber);
        };

        function nextPage(pageNumber) {
            if (currentPage < document.getElementById('btnNext').value) setCurrentPage(pageNumber);
        };
    // END PAGINATE

    return (
        <div className='home'>

            {/* PAGINATE */}
            <div>
                <Paginate
                    countries={countries.length}
                    paginate={paginated}
                    currentPage={currentPage}
                    prevPage={prevPage}
                    nextPage={nextPage}
                    countriesPerPage={countriesPerPage}
                />
            </div>

            {/* COUNTRIES CARDS */}
            <div className='container'>
            {
                !countries.length ?

                    ( !countries.msg?
                    <div className='loading'>
                        <img alt='loadingImg' src='https://1.bp.blogspot.com/-Os_G7fBordU/W1dFCdFA3AI/AAAAAAAAp-I/NLfM0h9Nvw42dtkvBlgzC_1_QFmKHBEVgCLcBGAs/s1600/world_flags_globe_1.gif'/>
                    </div> :
                    <div>
                        {countries.msg}
                    </div>)

                :
                currentCountries?.map (c =>
                    <CountryCard 
                        img={c.img}
                        name={c.name} 
                        continent={c.continent}
                        id={c.id}
                        key={c.id}
                    />
                )
            }
            </div>

        </div>
    );
};