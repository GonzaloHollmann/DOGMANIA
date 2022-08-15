import React from "react";
import styles from "./Paginado.module.css"

export default function Paginado({ dogsPerPage, allDogs, paginado }){
    const pageNumbers = []

    for (let i=1; i<=Math.ceil(allDogs/dogsPerPage); i++){
        pageNumbers.push(i)
    }
    return(
        <nav className={`${styles.nav_container}`}>
            <ul className={styles.paginado}>
                { pageNumbers &&
                pageNumbers.map(number =>(
                    <li className={`${styles.li_container}`} key={number}>
                    <button onClick={()=> paginado(number)}>{number}</button>
                    </li>
                ))}
            </ul>
        </nav>
    )
}