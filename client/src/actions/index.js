import axios from "axios";

export function getDogs (){
    return async function (dispatch){
        var json = await axios("http://localhost:3001/dogs");
        return dispatch({ //?
            type:'GET_DOGS',
            payload: json.data
        });
    }
}

export function orderByName (payload){
    return {
        type: 'ORDER_BY_NAME',
        payload
    };
}

export function orderByWeight(payload){
    return{
        type: 'ORDER_BY_WEIGHT',
        payload
    };
}