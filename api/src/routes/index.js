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
    return{
        name: e.name,
        height:e.height.metric,
        weight: e.weight.metric,
        life_span: e.life_span,
        temperament:e.temperament,
        image: e.image.url,
    };
});
    return datos;
}

const getDbInfo = async ()=>{
    return await Race.findAll({ include:[{ model: Temperament }]});
}

const getAllDogs = async ()=>{
    const apiInfo = await getApiInfo();
    const dbInfo = await getDbInfo();
    const total = apiInfo.concat(dbInfo);
    return total;
}

router.get("/dogs", async (req, res)=>{
    const { name } = req.query;
    const perritos = await getAllDogs()
        if (name) {
            let perro= await perritos.filter(el=>el.name.toLowerCase().includes(name.toLowerCase()));
            perro.lenght ? res.send(perro) : res.send("No se encontró la raza")
        }else{
            res.send(perritos);
        }
})

router.get("/dogs/:id", async (req, res)=>{
    const { id } = req.params;
    const allDogs = await getAllDogs();
    if (id){
        let dog = allDogs.filter(el => el.id == id);
        dog.lenght ?
        res.send(dog):
        res.send("Perro no encontrado");
    }
});
// router.get("/dogs/:id", async(req, res) => {
//     const { id } = req.params;
//     const allDogs = await getAllDogs();
//     const dog = allDogs.filter(el => el.id == id);
//     if (dog.length) {
//         res.send(dog);
//     }else{
//         res.send("Perro no encontrado");
//     }
// });

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
    temps.forEach(el => {
        Temperament.findOrCreate({
             where: { name: el }
        })
    })
    const allTemp = await Temperament.findAll();    
    res.send(allTemp);
});

module.exports = router;
        