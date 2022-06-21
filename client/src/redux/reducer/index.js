import { 
  GET_ALL_COUNTRIES, 
  CREATE_ACTIVITY, 
  GET_COUNTRIES_NAME, 
  GET_COUNTRY_ID,  
  GET_ALL_ACTIVITIES, 
  FILTER_BY_CONTINENT, 
  ORDER_BY_NAME_AZ,
  ORDER_BY_POPULATION_AZ,
  CLEAR_CACHE, 
  ORDER_BY_ACTIVITIES,
} from '../actions/index.js'

const initialState = {
  countries: [],
  filters: [],
  renderized: [],
  country: {},
  activities: [],
};

const rootReducer = (state = initialState, action) => {
  switch(action.type) {
        case GET_ALL_COUNTRIES:
          return {
            ...state,
            countries: action.payload,
            filters: action.payload,
            renderized: action.payload,
          };
        case GET_COUNTRIES_NAME:
          return {
            ...state,
            renderized: action.payload,
          };
        case GET_COUNTRY_ID:
          return {
            ...state,
            country: action.payload
          };
        case CREATE_ACTIVITY:
          return {
            ...state,
            activities: [...state.activities, action.payload]
          };
        case GET_ALL_ACTIVITIES:
          return {
            ...state,
            activities: action.payload,
          };
        case FILTER_BY_CONTINENT:
          return {
            ...state,
            filters: state.countries.filter(c => c.continent === action.payload),
            renderized: state.countries.filter(c => c.continent === action.payload)
          };
        case ORDER_BY_NAME_AZ:
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

          return {
            ...state,
            renderized: countriesByName.filter(c => c)
          };
        case ORDER_BY_POPULATION_AZ:
          let countriesByPopulation;
          action.payload === 'asc' ?
            countriesByPopulation = state.renderized.sort((a, b) => b.population - a.population)
          :
            countriesByPopulation = state.renderized.sort((a, b) => a.population - b.population)
          
          return {
            ...state,
            renderized: countriesByPopulation.filter(c => c)
          };
        case ORDER_BY_ACTIVITIES:
          return {
            ...state,
            renderized: state.filters.filter(c => c.Activities.find(a => a.name === action.payload))
        };
        case CLEAR_CACHE:
          return {
            ...state,
            country: {}
          };
        default:
          return state;
  };
};

export default rootReducer;