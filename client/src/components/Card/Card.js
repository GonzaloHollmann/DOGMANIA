import React from "react";
import "./Card.css";

export default function Card({ name, image, temperament }){
    return(
        <div className="contenedor">
            <div className="card">
                <h3 className="card-title">{name}</h3>
                    <div className="card-body">
                        <h5 className="card-info">{temperament}</h5>
                        <h5>{image}</h5>
                        <img className="imagen" src={image} alt="img not found"/>
                    </div>
            </div>
        </div>
    )
}