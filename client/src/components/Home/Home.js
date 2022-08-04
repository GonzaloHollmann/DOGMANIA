import React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector} from "react-redux";
import { getDogs, orderByName, orderByWeight } from "../../actions";
import { Link } from "react-router-dom";
import Card from "../Card/Card";
import Paginado from "../Paginado/Paginado";
import "./Home.css";

export default function Home (){
    const dispatch = useDispatch();
    const allDogs = useSelector((state) => state.dogs)

    const [orden, setOrden] = useState(''); //?
    //Paginado
    const [currentPage, setCurrentPage] = useState(1);
    const [dogsPerPage, setDogsPerPage] = useState(6);
    const indexOfLastDog = currentPage * dogsPerPage;
    const indexOfFirstDog = indexOfLastDog - dogsPerPage;
    const currentDog = allDogs.slice(indexOfFirstDog, indexOfLastDog)

    const paginado = (pageNumber) =>{
        setCurrentPage(pageNumber)
    }
    
    useEffect(()=>{
        dispatch(getDogs())
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

    return(
        <div className="home">
    <Link to = "/dogs">Create dog</Link>
    <button onClick={e=>{handleClick(e)}}>Reload</button>
    <div>
        <select onChange={e=>{handleSortByName(e)}}>
            <option value="asc">A - Z</option>
            <option value="desc">Z - A</option>
        </select>
        <select onChange={e=>{handleSortByWeight(e)}}>
            <option value="max_weight">Max</option>
            <option value="min_weight">Min</option>
        </select>
        <select >
            <option value="all">All</option>
            <option value="created">Created</option>
            <option value="api">API</option>
        </select>
        <Paginado
              dogsPerPage={dogsPerPage}
              allDogs={allDogs.length}
              paginado= {paginado}
            />

    {
    currentDog?.map((el)=>{
        return(
            <div>
                <div className="cards">
               <Card name={el.name} image={el.image} temperament={el.temperament} />
                </div>
               <Link to ={"/home" + el.id}></Link>
            </div>
        )
    })
    }

    </div>
        </div>
    )
}