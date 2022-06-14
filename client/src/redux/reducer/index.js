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
  country: {},
  activities: [],
  filters: [],
};

const rootReducer = (state = initialState, action) => {
  switch(action.type) {
        case GET_ALL_COUNTRIES:
          return {
            ...state,
            countries: action.payload,
            filters: action.payload,
          };
        case GET_COUNTRIES_NAME:
          return {
            ...state,
            filters: action.payload,
          //   var pResp = paises.filter((p) => {
          //     let activities = p.Activities.filter( (a) => a.name.includes('patinar'));
          //     if (activities && activities.length > 0) {
          //         return true;
          //     }
          //     return false;
          // } );
            // filters = [{}, {}, {}, {}]         TODOS LOS COUNTRIES POR CONTINENT
            // action.payload = [{}, {}, {}, {}]  TODOS LOS COUNTRIES QUE MATCHEARON EL NAME EN EL INPUT
            // filters: [...state.filters.filter(c => action.payload.filter(a => a.name === c.name))],
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
            filters: state.countries.filter(c => c.continent === action.payload)
          };
        case ORDER_BY_NAME_AZ:
          let countriesByName;
          action.payload === 'asc' ? 
            countriesByName = state.filters.sort((a, b) => {
              if (a.name > b.name) return 1;
              if (b.name > a.name) return -1;
              return 0;
            })
          :
            countriesByName = state.filters.sort((a, b) => {
              if (a.name > b.name) return -1;
              if (b.name > a.name) return 1;
              return 0;
            })

          return {
            ...state,
            filters: countriesByName
          };
        case ORDER_BY_POPULATION_AZ:
          let countriesByPopulation;
          action.payload === 'asc' ?
            countriesByPopulation = state.filters.sort((a, b) => b.population - a.population)
          :
            countriesByPopulation = state.filters.sort((a, b) => a.population - b.population)
          
          return {
            ...state,
            filters: countriesByPopulation
          };
        case ORDER_BY_ACTIVITIES:
          return {
            ...state,
            filters: state.countries.filter(c => c.Activities.find(a => a.name === action.payload))
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