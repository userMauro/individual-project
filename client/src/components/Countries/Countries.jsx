import React, { Component } from 'react';
import { connect } from 'react-redux';

import { getAllCountries } from '../../redux/actions/index.js';
import CountryCard from '../CountryCard/CountryCard.jsx';
import './Countries.css';

export class Countries extends Component {

    componentDidMount(){
        this.props.getAllCountries();
    };

    render() {
        return (
            <div className='container'>
            {
                !this.props.countries.length ?
                    'Loading...'
                :
                this.props.countries?.map (c =>
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
        );
    };
};

export function mapStateToProps(state) {
    return {
      countries: state.filters,
    }
};

export function mapDispatchToProps(dispatch) {
    return {
        getAllCountries: () => dispatch(getAllCountries()),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Countries);