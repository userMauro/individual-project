export const GET_ALL_COUNTRIES = "GET_ALL_COUNTRIES";
export const CREATE_ACTIVITY = "CREATE_ACTIVITY";
export const DELETE_ACTIVITY = 'DELETE_ACTIVITY'
export const GET_COUNTRIES_NAME = "GET_COUNTRIES_NAME";
export const GET_COUNTRY_ID = "GET_COUNTRY_ID";
export const GET_ALL_ACTIVITIES = "GET_ALL_ACTIVITIES";
export const FILTER_BY_CONTINENT = 'FILTER_BY_CONTINENT';
export const ORDER_BY_NAME_AZ = 'ORDER_BY_NAME_AZ';
export const ORDER_BY_POPULATION_AZ = 'ORDER_BY_POPULATION_AZ';
export const ORDER_BY_ACTIVITIES = 'ORDER_BY_ACTIVITES';
export const CLEAR_CACHE = "CLEAR_CACHE";

export const getAllCountries = () => dispatch => {
    return fetch(`http://localhost:3001/countries`)
    .then((r) => r.json())
    .then((json) => {
      dispatch({ type: GET_ALL_COUNTRIES, payload: json });
    })
    .catch(error => console.error('Error:', error))
};

export const getCountries = (name) => dispatch => {
    return fetch(`http://localhost:3001/countries?name=${name}`)
    .then((r) => r.json())
    .then((json) => {
      console.log(json)
      dispatch({ type: GET_COUNTRIES_NAME, payload: json });
    })
    .catch(error => console.error('Error:', error))
};

export const getCountryID = (id) => dispatch => {
  return fetch(`http://localhost:3001/countries/${id}`)
  .then((r) => r.json())
  .then((json) => {
    dispatch({ type: GET_COUNTRY_ID, payload: json });
  })
  .catch(error => console.error('Error:', error))
};

export const getAllActivities = () => dispatch => {
  return fetch('http://localhost:3001/activities')
  .then((r) => r.json())
  .then(json => {
    dispatch({ type: GET_ALL_ACTIVITIES, payload: json});
  })
  .catch(error => console.error('Error:', error))
};

export const createActivity = (data) => dispatch => {
    return fetch('http://localhost:3001/activities', 
      {method: 'POST', body: JSON.stringify(data), headers: {'Content-Type': 'application/json'}})
    .then(r => r.json())
    .then(json => {
      dispatch({ type: CREATE_ACTIVITY, payload: json })
    })
    .catch(error => console.error('Error:', error))
};

export const deleteActivity = (data) => dispatch => {
  return fetch(`http://localhost:3001/countries/delete`,
    {method: 'DELETE', body: JSON.stringify(data), headers: {'Content-Type': 'application/json'}})
  .then(r => r.json())
  .then(json => {
    dispatch({ type: DELETE_ACTIVITY, payload: json })
  })
};

export const filterByContinent = (payload) => {
  return { type: FILTER_BY_CONTINENT, payload }
};

export const orderByNameAZ = (payload) => {
  return { type: ORDER_BY_NAME_AZ, payload }
};

export const orderByPopulationAZ = (payload) => {
  return { type: ORDER_BY_POPULATION_AZ, payload }
};

export const orderByActivities = (payload) => {
  return { type: ORDER_BY_ACTIVITIES, payload }
};

export const clearCache = () =>  {
  return { type: CLEAR_CACHE }
};