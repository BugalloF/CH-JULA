const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const usersRouter= require('./users.js')
const friendshipsRouter= require('./friendships.js')
const lessonsRouter=require('./lessons')
const router = Router();
// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use('/users',usersRouter)
router.use('/friendships',friendshipsRouter)
router.use('/lessons',lessonsRouter)

module.exports = router;
