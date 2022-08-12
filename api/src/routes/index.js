const { Router } = require('express');
const axios = require ("axios");
const express = require('express');
const { Race, Temperament } = require("../db")
const { MY_API_KEY } = process.env
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
// router.get("/", (req, res)=>{
//     res.send("bienvenido, todo ok")
// })

const getApiInfo = async ()=>{
    const api= await axios(`https://api.thedogapi.com/v1/breeds?api_key=${MY_API_KEY}`);
    const datos= await api.data.map(e=> {
    
        let temperamentArray = [];
        if (e.temperament) {//pregunto que exista el temperamento y lo devuelvo en un arreglo
        temperamentArray = e.temperament.split(", ");
        }
        let heightArray = [];
        if (e.height.metric) {
            heightArray = e.height.metric.split(" - ");
        }
        let weightArray = [];
        if (e.weight.metric) {
            weightArray = e.weight.metric.split(" - ");
        }
        return{
        name: e.name,
        height:heightArray,
        weight: weightArray,
        life_span: e.life_span,
        temperament: temperamentArray,
        image: e.image.url,
        id:e.id,
    };
});
    return datos;
}
// Busco toda la info de la db y el include sirve para traer la tabla intermedia.
const getDbInfo = async ()=>{
    return await Race.findAll({ include:[{ model: Temperament }]});
}

const getAllDogs = async ()=>{
    const apiInfo = await getApiInfo();
    const dbInfo = await getDbInfo();
    const total = apiInfo.concat(dbInfo);
    return total;
}
// Consultas a la db y api si o si deben esperar
//
router.get("/dogs", async (req, res)=>{
    const { name } = req.query;
    // console.log("estoy en la ruta" , name)
try {
  const perritos = await getAllDogs();
  if (!name) {
    res.status(200).send(perritos);
  }
  let perro = perritos.filter(el=>el.name.toLowerCase().includes(name.toLowerCase())); //filter devuelve nuevo []
//   console.log(perro, "soy el resultado del find")
  perro.length >= 1
    ? res.status(200).send(perro)
    : res.status(401).send({ error: "No se encontro perro" });
} catch (error) {
  console.log(error);
}
})

router.get("/dogs/:id", async (req, res)=>{
    const { id } = req.params;
    const allDogs = await getAllDogs();
    console.log(id)
    try {
        if(!id){
            res.status(401).send({ error: "El id no es válido" });  
        }
        let dog= allDogs.find((el)=>el.id==id
            // {
            //     // console.log(el)
            //     console.log(el.id, '==', id)
            // }
        ) 
        console.log(dog)
        if (dog) res.status(200).send(dog)
        else res.status(401).send({ error: "No se encontro perro" });
    } catch (error) {
        console.log(error)
    }
})

router.post("/dogs", async (req, res)=>{
    let {
        name,
        min_height,
        max_height,
        min_weight,
        max_weight,
        life_span,
        temperament,
        image
       } = req.body

       
       const fixedHeight = []
       const minHeight = min_height;
       const maxHeight = max_height;
       fixedHeight.push(minHeight, maxHeight)
       
       const fixedWeight = []
       const minWeight = min_weight;
       const maxWeight = max_weight;
       fixedWeight.push(minWeight, maxWeight)
       
       try {
           const obj = { 
               name, 
               height: fixedHeight, 
               weight: fixedWeight, 
               life_span, 
               temperament, 
               image: image ? image : "https://www.publicdomainpictures.net/pictures/260000/velka/dog-face-cartoon-illustration.jpg", };
               const newDog = await Race.create(obj);
               res.send(newDog);  
            } catch (error) {
                console.log(error)
            }
        })
        
router.get("/temperaments", async (req,res)=>{
    const api= await axios(`https://api.thedogapi.com/v1/breeds?api_key=${MY_API_KEY}`);
    const temp= api.data.map(e=>e.temperament);
    const temps= temp.toString().split(",");
    let tempUnicos= new Set (temps)
    let resFinal = Array.from(tempUnicos)
    resFinal.forEach((el, index) => {
        Temperament.findOrCreate({
             where: { name: el, id: index }
        })
    })
    const allTemp = await Temperament.findAll();    
    res.send(allTemp);
});

module.exports = router;
        