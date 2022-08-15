import React from "react";
import styles from "./Card.module.css";
import { Link } from "react-router-dom";

export default function Card({ name, image, temperament, id }){
    return(
        <div className={styles.main_container}>
                <Link to ={`/dogs/${id}`}>
                <div className={styles.image_container} >
                    <img className={styles.img} src={image} alt="img not found"/>
                </div>
                </Link>
                <h2>{name}</h2>
                    <div className={`${styles.temperaments_container}`}>
                       {temperament.map((el, index)=><h3 key={index}>{el}</h3>)
                       }
                    </div>       
        </div>
    )
}