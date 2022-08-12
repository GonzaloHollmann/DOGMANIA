import React from "react";
import { useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { showDogDetails, cleanDogDetails } from "../../actions";
import "../DogDetail/DogDetail.css"

export default function Detail(){
    const { id } = useParams();
    const dispatch = useDispatch()
    const details = useSelector((state)=>{
        return state.details
    })
    useEffect(()=>{
        dispatch(showDogDetails(id))
        return ()=>{
            dispatch(cleanDogDetails())
        }
    },[dispatch]) //recibe dos parametros: primero, una fn. segundo, un arr. Lo que se ejecute dentro de la primera fn será cuando el componente se monte. La mayoria de acciones se ejecutan cuando el componente se monta. 

return(
    <div className="component"> 
        <Link to="/home"> <button className="button">Home</button> </Link>
        <div className="card">
        {
        details && Object.keys(details).length 
        ?<div>
            <h2>{details.name}</h2>
            <h3>{details.height[0]+"-"+details.height[1]+" KG"}</h3>
            <h3>{details.weight[0]+"-"+details.weight[1]+" M"}</h3>
            <h3>{details.image}</h3>
            <h3>{details.life_span}</h3>
            <h2>Temperaments:</h2>
            {details.temperament.map((el, index)=>{
                return <h3 key={index}>{el}</h3>                       
               })}  
        </div>
        : <h1>Cargando</h1>
        }
        </div>
    </div>
)
}