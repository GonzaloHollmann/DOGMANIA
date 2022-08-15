import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getName } from "../../actions";
import style from "./SearchBar.module.css"
import { FaSearch } from 'react-icons/fa';

export default function SearchBar(){
    const dispatch = useDispatch();
    const [name, setName] = useState("");

    function handleInputChange(e){
        e.preventDefault();
        setName(e.target.value)
        
    }

    function handleSubmit(e){
        e.preventDefault();
        dispatch(getName(name))

    }
    return(
        <div className={style.searchbar_container}>
            <input className={`${style.searchbar}`}
            type="text"
            placeholder="Buscar..."
            value={name}
            onChange={(e)=> handleInputChange(e)}
            />
            <button className={`${style.searchbar_button}`}
            type="submit" onClick={(e)=> handleSubmit(e)}> <FaSearch />
            </button>
        </div>
    )
}