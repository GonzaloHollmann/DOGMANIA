const initialState = {
    dogs: [],
    allDogs: [],
    temperaments: [],
    details: {},
}
function rootReducer(state=initialState, action){
    switch(action.type){
        case 'GET_DOGS':
            return{
                ...state,
                dogs: action.payload,
                allDogs: action.payload
            }
        case 'ORDER_BY_NAME':
            let sortedArray
            if(action.payload === 'asc'){
                sortedArray = state.dogs.sort((a,b)=>{
                    if(a.name>b.name){
                        return 1;
                    }
                    if(b.name>a.name){
                        return -1;
                    }
                    return 0;
                })
            }
            if(action.payload === 'desc'){
                sortedArray = state.dogs.sort((a,b)=>{
                    if(a.name>b.name){
                        return -1;
                    }
                    if(b.name>a.name){
                        return 1;
                    }
                    return 0;
                })
            }
            return{
                ...state,
                dogs: sortedArray,
            }
        case 'ORDER_BY_WEIGHT':
            let sortedArr
            if(action.payload === 'min_weight'){
                sortedArr = state.dogs.sort((a,b)=>{
                    if(parseInt(a.weight[1]) > parseInt(b.weight[1])){
                        return 1;
                    }
                    if(parseInt(b.weight[1]) > parseInt(a.weight[1])){
                        return -1;
                    }
                    return 0;
                })
            }
            if(action.payload === 'max_weight'){
                sortedArr = state.dogs.sort((a,b)=>{
                    if(parseInt(a.weight[1]) > parseInt(b.weight[1])){
                        return -1;
                    }
                    if(parseInt(b.weight[1]) > parseInt(a.weight[1])){
                        return 1;
                    }
                    return 0;
                })
            }
            return{
                ...state,
                dogs: sortedArr,
            }
    //     case 'GET_TEMPS':
    //         let filtro = action.payload.filter((el) => el.name !== ""); 
    //   return {
    //     ...state,
    //     temperaments: filtro,
    //   };
    case "GET_TEMPS":
        return {
            ...state,
            temperaments: action.payload
        }
    case "FILTER_BY_TEMP":
        const allDogs = state.allDogs; // Al usar state.allDogs en lugar de state.dogs, cada vez que aplique un filtro, state.dogs va a cambiar, pero voy a seguir teniendo guardados todos los perros en mi state.allDogs, entonces voy a poder cambiar de filtro sin tener que volver a cargar la página.
        const temperamentFiltered = action.payload === 'all' ? allDogs : allDogs.filter(el => {
            if (typeof (el.temperaments) === 'string') return el.temperaments.includes(action.payload);
            if (Array.isArray(el.temperaments)) {
                let temps = el.temperaments.map(el => el.name);
                return temps.includes(action.payload);
            }
            return true;
        });
        return {
            ...state,
            dogs: temperamentFiltered
        }
        case "FILTER_CREATED":
            const todos = state.dogs    
            const createdFilter = action.payload === "created" ? todos.filter(el=>el.createdInDb) : todos.filter(el=> !el.createdInDb);
                return{
                    ...state,
                    dogs: action.payload === "all" ? todos : createdFilter.length ? createdFilter : ["Dog created"]
                }
        case "GET_NAME":
                return{
                    ...state,
                    dogs: action.payload
                    }        
        case "POST_DOG":
            return{
                ...state,
            }
        case "SHOW_DOG_DETAILS":
            return {
                ...state,
                details: action.payload
              };
        case "CLEAN_DOG_DETAILS":
            return{
                ...state,
                details: {}
            };
            default:
      return state;
    }
}

export default rootReducer;
