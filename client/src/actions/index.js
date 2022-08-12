import axios from "axios";

export function getDogs (){
    return async function (dispatch){
        const json = await axios("http://localhost:3001/dogs");
        console.log("ejecuté la fn que trae todos los dogs")
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

export function createDog(payload) {
    return async function () {
        const data = await axios.post("http://localhost:3001/dogs", payload);
        return data;
    }
}

export function getTemps(){
    return async function(dispatch){
        var aux = await axios("http://localhost:3001/temperaments");
        return dispatch({
            type: 'GET_TEMPS',
            payload: aux.data
        });
    }
}

export function filterDogsByTemperament(payload) {
    return {
        type: "FILTER_BY_TEMP",
        payload
    }
}
// export function filterByTemp(payload){
//     return{
//         type: 'FILTER_BY_TEMP',
//         payload
//     };
// }

export function filterCreated(payload){
    return{
        type: "FILTER_CREATED",
        payload
    }
}

export function getName(payload){
    return async function(dispatch){
        try {
            // console.log("voy a buscar los perros por nombre ", payload)
            var dataName= await axios(`http://localhost:3001/dogs?name=${payload}`)
            // console.log(dataName, "soy el res de la busqueda")
            return dispatch({
                type: 'GET_NAME',
                payload: dataName.data
            });
        } catch (error) {
            console.log(error)
        }
    }  
    
}

export function showDogDetails(id) {
    return async function (dispatch) {
        try {
            console.log("voy a mostrar detalles del dog" , id)
            const json = await axios.get("http://localhost:3001/dogs/"+id);
            console.log("resultado del pedido" , json.data)
        return dispatch({
            type: "SHOW_DOG_DETAILS",
            payload: json.data
        });
        } catch (error) {
            console.log(error);
        }
    }
};

export function cleanDogDetails(){
   console.log("estoy enviando la accion")
    return{
        type: "CLEAN_DOG_DETAILS",
    }
}