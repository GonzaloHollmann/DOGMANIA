import React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector} from "react-redux";
import { getDogs, orderByName, orderByWeight, filterCreated, filterDogsByTemperament, getTemps } from "../../actions";  
import { Link } from "react-router-dom";
import Card from "../Card/Card";
import Paginado from "../Paginado/Paginado";
import SearchBar from "../SearchBar/SearchBar";
import styles from "./Home.module.css";

export default function Home (){
    const dispatch = useDispatch();
    const allDogs = useSelector(state => state.dogs)
    const allTemperaments = useSelector(state => state.temperaments);

    const [orden, setOrden] = useState(''); //?
    //Paginado
    const [currentPage, setCurrentPage] = useState(1);
    const [dogsPerPage, setDogsPerPage] = useState(6);
    const indexOfLastDog = currentPage * dogsPerPage;
    const indexOfFirstDog = indexOfLastDog - dogsPerPage;
    const currentDog = allDogs.slice(indexOfFirstDog, indexOfLastDog);

    const paginado = (pageNumber) =>{
        setCurrentPage(pageNumber)
    }
    
    useEffect(()=>{
        dispatch(getDogs());
        dispatch(getTemps());
    },[dispatch])

function handleClick(e){
    e.preventDefault();
    dispatch(getDogs());
}
function handleSortByName(e){
    e.preventDefault();
    dispatch(orderByName(e.target.value));
    setCurrentPage(1);
    setOrden(`Ordenado ${e.target.value}`)
}
function handleSortByWeight(e){
    e.preventDefault();
    dispatch(orderByWeight(e.target.value));
    setCurrentPage(1);
    setOrden(`Ordenado ${e.target.value}`)
}
function handleFilterTemps(e){
    e.preventDefault();
    dispatch(filterDogsByTemperament(e.target.value));
    setCurrentPage(1);
}
function handleFilterCreated(e){
    dispatch(filterCreated(e.target.value));
    setCurrentPage(1);
}
    return(
        <div className={styles.all}>
        <header className={styles.header}>
        <div className={`${styles.header_container_left}`}>
    
    <div className={`${styles.logo}`} onClick={e=>{handleClick(e)}}></div>
    <div className={`${styles.header_left}`}>
    <SearchBar/>
    <div className={`${styles.container_filters}`}>
        <select onChange={e=>{handleSortByName(e)}}>
            <option value="asc">A - Z</option>
            <option value="desc">Z - A</option>
        </select>
        <select onChange={e=>{handleSortByWeight(e)}}>
            <option value="max_weight">+ Weight</option>
            <option value="min_weight">- Weight</option>
        </select>
        <select onChange={e => { handleFilterTemps(e) }}>
            <option key={0} value='all'>Temperamentos</option>
            {allTemperaments?.sort(function (a, b) {
                if (a.name < b.name) return -1;
                if (a.name > b.name) return 1;
                return 0;
            }).map(el => {
                return (
                    <option key={el.id} value={el.name}>{el.name}</option>
                    )
            })}
                </select>
        <select onChange={e=>{handleFilterCreated(e)}}>
            <option value="all">All</option>
            <option value="created">Created</option>
            <option value="api">API</option>
        </select>
        </div>
        </div>
        </div>
        <div className={`${styles.header_right}`}>
        <Link to = "/dogs"><button className={`${styles.button_add_dog}`}>Create dog</button></Link>
        </div>
        </header>
        <hr/>
       
       <div className={styles.main_container}>
        <div className={styles.container_cards}>
    {
    currentDog?.map((el)=>{
        return(
            <div className={styles.container_card}>
                     <Card name={el.name} image={el.image} temperament={el.temperament} id={el.id} />   
            </div>
        )
    })
    } 
        </div> 
            <div className={`${styles.pagination}`}>
                <Paginado
              dogsPerPage={dogsPerPage}
              allDogs={allDogs.length}
              paginado= {paginado}
            />
            </div>
            </div>
        </div>
    )
}