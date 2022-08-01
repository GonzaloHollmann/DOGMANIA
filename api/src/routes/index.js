const { Router } = require('express');
const axios = require ("axios");
const express = require('express');
const { Race, Temperament } = require("../db")
// const { MY_API_KEY } = process.env
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();
router.use(express.json());
// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
// router.get("/", (req, res)=>{
//     res.send("bienvenido, todo ok")
// })

router.get("/dogs", async(req, res)=>{
    
    try {
        const api= await axios("https://api.thedogapi.com/v1/breeds");
        const datos= await api.data.map((e)=>{
        const obj={
            name: e.name,
            height:e.height.metric,
            weight: e.weight.metric,
            life_span: e.life_span,
            temperament:e.temperament,
            image: e.image.url,
        };
        return obj;
    });
        const db= await Race.findAll({ include:[{ model: Temperament }]});
        const total = [ ... datos, ...db]
        res.send(total)
   
    } catch (error) {
        console.log(error)
    }
});

router.get("/dogs", async(req, res)=>{
    const { name } = req.query
    if (name) {
        let api= await axios ("https://api.thedogapi.com/v1/breeds");
        let perrito = await api.data.filter(el=>el.name.toLowerCase().includes(name.toLowerCase()));
        perrito.lenght ?
        res.send(perrito) :
        res.send("No se encontró");
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
        
        module.exports = router;
        