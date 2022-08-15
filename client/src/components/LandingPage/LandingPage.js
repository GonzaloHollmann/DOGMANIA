import React from "react";
import {Link} from "react-router-dom";
import styles from "./LandingPage.module.css";

export default function LandingPage(){
    return(
        <div className={`${styles.main_container}`}>
            <h1 className={`${styles.titleApp}`}>DOGMANIA</h1>
            <h3>Welcome!</h3>
            <p>Look no further! This is the definitive encyclopedia on dogs. Here you will find facts such as weight, height, temperaments and more.</p>
            <Link to = "/home">
                <button className={styles.button_home}>Go home</button>
            </Link>
        </div>
    )
}