const { Router } = require('express');
const router = Router();
const {Lessons,Users} = require("../db");

router.get('/',async (req,res,next)=>{
    try {
        let lessons= await Lessons.findAll()
        res.status(200).json(lessons)
    } catch (error) {
        next(error)
    }
})

router.post('/',async(req,res,next)=>{
    try {
        const {name,personId}= req.body
        let newLesson= await Lessons.create({
            name,
            personId
        })
        res.status(200).json(newLesson)
    } catch (error) {
        next(error)
    }
})

module.exports = router;