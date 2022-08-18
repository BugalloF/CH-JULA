const { Router } = require('express');
const router = Router();
const {Friendships,Users} = require("../db");

router.get('/',async (req,res,next)=>{
    try {
        let friendships= await Friendships.findAll()
        // esto lo hago para no perderme en los datos.
        let idfriendships= friendships.map(el=>{
            return {
                person1id:el.person1Id,
                person2id:el.person2Id
            }
        })
        // console.log('idss',idfriendships)
        let person1= await Promise.all(
            idfriendships.map(async el=>{
                console.log(el.person1id,'elemento')
                return await Users.findByPk(el.person1id)
            })
        )
        
        let person2= await Promise.all(
            idfriendships.map(async el=>{
                return await Users.findByPk(el.person2id)
            })
        )

        let friends= person1.map((el,index)=>{
            return `${person1[index].name} es amigo de ${person2[index].name}`
        })
        res.status(200).json(friends)
    } catch (error) {
        next(error)
    }
})

router.get('/:id',async(req,res,next)=>{
    const {id}=req.params
    // console.log(id) 
    // 
    try {
        let column1= await Friendships.findAll({
            where:{
                person1Id:id
            },
            attributes:['person2Id']
        })
        let column2= await Friendships.findAll({
            where:{
                person2Id:id
            },
            attributes:['person1Id']
        })
        let idColumn1= column1.map(el=>el.person2Id)
        let idColumn2= column2.map(el=>el.person1Id)
        let allIds= idColumn1.concat(idColumn2)
        // console.log(allIds);
        let users= await Promise.all(
            allIds.map(async el=>{
                return  await Users.findByPk(el)
            })
        )
        let friends= users.map(el=>el.name  )
        console.log(friends,'friends');
        // console.log(allFriendsIds.dataValues)
    
        res.status(200).json(friends)
    } catch (error) {
        
    }
})
// Creo los post para usar Postman e ir probando mi código.
router.post('/',async(req,res,next)=>{
    try {
        const {person1Id,person2Id}= req.body
        let newfriendship= await Friendships.create({
            person1Id,
            person2Id
        })
        res.status(200).json(newfriendship)
    } catch (error) {
        next(error)
    }
})
module.exports = router;