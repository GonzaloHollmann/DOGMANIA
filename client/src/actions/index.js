import axios from "axios";

export function getDogs (){
    return async function (dispatch){
        var json = await axios("http://localhost:3001/dogs");
        return dispatch({
            type:'GET_DOGS',
            payload: json.data
        });
    }
}