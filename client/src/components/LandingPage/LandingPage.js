import React from "react";
import {Link} from "react-router-dom";
import "./LandingPage.css";

export default function LandingPage(){
    return(
        <div className="landing">
            <h1 className="titulo">DOGMANIA</h1>
            <Link to = "/home">
                <button className="boton">Ingresar</button>
            </Link>
        </div>
    )
}