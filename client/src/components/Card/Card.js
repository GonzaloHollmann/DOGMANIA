import React from "react";
import "./Card.css";
import { Link } from "react-router-dom";

export default function Card({ name, image, temperament, id }){
    return(
        <div className="contenedor">
            <div className="card">
                <Link to ={`/dogs/${id}`}><h3 className="card-title">{name}</h3></Link>
                <img className="imagen" src={image} alt="img not found"/>
                    <div className="card-body">
                       {temperament.map((el, index)=>{
                        return <h5 key={index}>{el}</h5>                       
                       })}
                    </div>
            </div>
        </div>
    )
}