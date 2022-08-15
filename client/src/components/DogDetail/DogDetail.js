import React from "react";
import { useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { showDogDetails, cleanDogDetails } from "../../actions";
import styles from "../DogDetail/DogDetail.module.css"

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
    <div className={`${styles.main_container}`}> 
        <Link to="/home"> <button className={styles.button}>Home</button> </Link>
        <div className={`${styles.sub_container}`}>
        {
            details && Object.keys(details).length 
        ?
        <div className={`${styles.container_elements}`}>
            <div className={`${styles.image_container}`}>
                <img src={details.image} alt={`img de ${details.name}`}/>
            </div>
            <div className={`${styles.right_container}`}>
            <h1>{details.name}</h1>
            <h3>{details.height[0]+" - "+details.height[1]+" KG"}</h3>
            <h3>{details.weight[0]+" - "+details.weight[1]+" M"}</h3>
            <h3>{details.life_span}</h3>
            
            <div>
            <h3>Temperaments:</h3>
            <ul className={`${styles.list_container}`}>
                {details.temperament.map((el, index)=>{
                return <h3 key={index}>{el}</h3>
            })}
            </ul>
            </div>
            </div>                      
        </div>
        : <h1>Cargando</h1>
        }
        </div>
    </div>
)
}