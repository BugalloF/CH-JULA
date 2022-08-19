const { Router } = require('express');
const router = Router();
const {Users,Lessons} = require("../db");

router.get('/',async (req,res,next)=>{
    try {
        let users= await Users.findAll()
        let names= users.map(el=>el.name)
        res.status(200).json(names)
    } catch (error) {
        next(error)
    }
})

// esta ruta ppodría haberla puesto en Lessons, también podría haber modularizado por get o post, pero creo que igual se entiende.


// entonces le pasamos el id de la persona y nos retorna las clases.
router.get('/:id/lessons',async(req,res,next)=>{
    const {id}=req.params
    // console.log(id) 
    try {
        let userLessons= await Lessons.findAll({
            where:{
                personId:id
            },
            attributes:['name']
        })
        // console.log(userLessons);
        if(userLessons.length===0)return res.status(200).send('Este usuario no fue a clases')
        let lessonName= userLessons.map(el=>el.name)
        let orderLessons = {};

        lessonName.forEach(function(lesson){
        orderLessons[lesson] = (orderLessons[lesson] || 0) + 1;
}); 
// console.log(orderLessons);
        res.status(200).json(orderLessons)
    } catch (error) {
        
    }
})
router.post('/',async(req,res,next)=>{
    try {
        const {name}= req.body
        let newUser= await Users.create({
            name
        })
        res.status(200).json(newUser)
    } catch (error) {
        next(error)
    }
})

module.exports = router;
