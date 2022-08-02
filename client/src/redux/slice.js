import { createSlice } from "@reduxjs/toolkit";

export const slice = createSlice({
    name: "rootReducer",
    initialState: {
        countries: [],
        filters: [],
        renderized: [],
        country: {},
        activities: [],
    },
    reducers: {
        getAllCountries(state, action) {
            state.countries = action.payload;
            state.filters = action.payload;
            state.renderized = action.payload;
        },
        getCountries(state, action) {
            state.renderized = action.payload;
        },
        getCountryID(state, action) {
            state.country = action.payload;
        },
        getAllActivities(state, action) {
            state.activities = action.payload;
        },
        createActivity(state, action) {
            state.activities = [...state.activities, action.payload];
        },
        filterByContinent(state, action) {
            state.filters = state.countries.filter(c => c.continent === action.payload);
            state.renderized = state.countries.filter(c => c.continent === action.payload);
        },
        orderByNameAZ(state, action) {
            let countriesByName;
            action.payload === 'asc' ? 
              countriesByName = state.renderized.sort((a, b) => {
                if (a.name > b.name) return 1;
                if (b.name > a.name) return -1;
                return 0;
              })
            :
              countriesByName = state.renderized.sort((a, b) => {
                if (a.name > b.name) return -1;
                if (b.name > a.name) return 1;
                return 0;
              })
              
            state.renderized = countriesByName.filter(c => c);
        },
        orderByPopulationAZ(state, action) {
            let countriesByPopulation;
            action.payload === 'asc' ?
                countriesByPopulation = state.renderized.sort((a, b) => b.population - a.population)
            :
                countriesByPopulation = state.renderized.sort((a, b) => a.population - b.population)
            
            state.renderized = countriesByPopulation.filter(c => c);
        },
        orderByActivities(state, action) {
            state.renderized = state.filters.filter(c => c.Activities.find(a => a.name === action.payload));
        },
        clearCache(state) {
            state.country = {};
        }, 
    },
});

// ACTIONS async
    export const getAllCountries = () => dispatch => {
        fetch(`http://localhost:3001/countries`)
            .then((r) => r.json())
            .then(json => {
                dispatch(slice.actions.getAllCountries(json))
            })
            .catch(error => console.error('Error:', error))
    };

    export const getCountries = (name) => dispatch => {
        return fetch(`http://localhost:3001/countries?name=${name}`)
            .then((r) => r.json())
            .then(json => {
                dispatch(slice.actions.getCountries(json));
            })
            .catch(error => console.error('Error:', error))
    };
    
    export const getCountryID = (id) => dispatch => {
        return fetch(`http://localhost:3001/countries/${id}`)
            .then((r) => r.json())
            .then(json => {
                dispatch(slice.actions.getCountryID(json));
            })
            .catch(error => console.error('Error:', error))
    };
    
    export const getAllActivities = () => dispatch => {
      return fetch('http://localhost:3001/activities')
      .then((r) => r.json())
      .then(json => {
        dispatch(slice.actions.getAllActivities(json));
      })
      .catch(error => console.error('Error:', error))
    };
    
    export const createActivity = (data) => dispatch => {
        return fetch('http://localhost:3001/activities', 
            {method: 'POST', body: JSON.stringify(data), headers: {'Content-Type': 'application/json'}})
            .then(r => r.json())
            .then(json => {
                if (json.msg) return alert(json.msg);
                else {
                    dispatch(slice.actions.createActivity(json))
                    return alert('Activity created successfully');
                };
            })
            .catch(error => console.error('Error:', error))
    };
    
    export const deleteActivity = (data) => {
        return fetch(`http://localhost:3001/countries/delete`,
            {method: 'DELETE', body: JSON.stringify(data), headers: {'Content-Type': 'application/json'}})
                .then(r => r.json())
                .then(json => {
                    // dispatch(slice.actions.deleteActivity(json))
                    return alert('Activity erased from country');
                })
                .catch(error => console.error('Error:', error))
    };

export const { filterByContinent, orderByNameAZ, orderByPopulationAZ, orderByActivities, clearCache } = slice.actions;
export default slice.reducer;