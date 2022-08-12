import React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { getTemps, createDog } from "../../actions";

export default function CreateDog(){
    const dispatch = useDispatch();
    const history = useHistory();
    const allTemperaments = useSelector(state=>state.temperaments)
    const [input, setInput] = useState({
        name: "",
        min_height: "",
        max_height:"",
        min_weight:"",
        max_weight:"",
        life_span:"",
        temperament: [],
        image: "",
    })

    function handleChange(e){
        setInput({
            ...input,
            [e.target.name] : e.target.value
        })
    }
    function handleSelect(e){
        setInput({
            ...input,
            temperaments: [...input.temperament, e.target.value]
        })
    }
    function handleSubmit(e){
        e.preventDefault();
        console.log(input);
        dispatch(createDog(input))
        alert("Dog created")
        setInput({
            name: "",
            min_height: "",
            max_height:"",
            min_weight:"",
            max_weight:"",
            life_span:"",
            temperament: [],
            image: "",
        })
        history.push('/home')
    }
    function handleDeleteTemperament(el) {
        setInput({
            ...input,
            temperaments: input.temperaments.filter(temp=> temp !== el)
        });
    }
    
    useEffect(()=>{
        dispatch(getTemps());
    },[]);

    return(
        <div>
            <Link to = "/home"><button>Home</button></Link>
            <h1>Create Dog!</h1>
            <form onSubmit={(e)=> handleSubmit(e)}>
                <div>
                    <label>Name:</label>
                    <input
                    type="text"
                    value={input.name}
                    name="name"
                    onChange={(e) => handleChange(e)}
                    />
                </div>
                <div>
                    <label>Min height:</label>
                    <input
                    type="text"
                    value={input.min_height}
                    name="min_height"
                    onChange={(e) => handleChange(e)}
                    />
                </div>
                <div>
                    <label>Max Height:</label>
                    <input
                    type="text"
                    value={input.max_height}
                    name="max_height"
                    onChange={(e) => handleChange(e)}
                    />
                </div>
                <div>
                    <label>Min Weight:</label>
                    <input
                    type="text"
                    value={input.min_weight}
                    name="min_weight"
                    onChange={(e) => handleChange(e)}
                    />
                </div>
                <div>
                    <label>Max Weight:</label>
                    <input
                    type="text"
                    value={input.max_weight}
                    name="max_weight"
                    onChange={(e) => handleChange(e)}
                    />
                </div>
                <div>
                    <label>Life Span:</label>
                    <input
                    type="text"
                    value={input.life_span}
                    name="life_span"
                    onChange={(e) => handleChange(e)}
                    />
                </div>
                <div>
                    <label>Image:</label>
                    <input
                    type="text"
                    value={input.image}
                    name="image"
                    onChange={(e) => handleChange(e)}
                    />
                </div>
                <div>
                    <select onChange={e => handleSelect(e)} >
                        <option value='selected' hidden >Temperamentos</option>
                        {allTemperaments?.sort(function (a, b) {
                            if (a.name < b.name) return -1;
                            if (a.name > b.name) return 1;
                            return 0;
                        }).map(temp => {
                            return (
                                <option value={temp.name} key={temp.id}>{temp.name}</option>
                            )
                        })}
                    </select>
                    {input.temperament.map(el => {
                        return (
                                <ul className='allTemps' key={el}>
                                    <li>
                                        <p><strong>{el}</strong></p>
                                        <button onClick={() => handleDeleteTemperament(el)} className='x' >Eliminar</button>
                                    </li>
                                </ul>                           
                        )
                    })}
                </div>
                <button type="submit">Create</button>
            </form>

        </div>
    )
}