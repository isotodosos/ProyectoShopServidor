const express = require ('express');
const authController = require('../controllers/authController');
const router = express.Router();
const authPS = require ('../middelware/authPS');


//Su endpoint va a ser: api/auth

//iniciar Sesion
router.post('/',
authController.autenticarUsuario);

//obtener usuario autenticado
router.get('/',
authPS,
authController.usuarioAutenticado
);

module.exports = router;