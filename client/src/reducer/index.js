const initialState = {
    dogs: []
}
function rootReducer(state=initialState, action){
    switch(action.type){
        case 'GET_DOGS':
            return{
                ...state,
                dogs: action.payload
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
    
            default:
      return state;
    }
}

export default rootReducer;
