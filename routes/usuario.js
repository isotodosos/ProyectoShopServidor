const express = require ('express');
const router = express.Router();

const usuarioController = require('../controllers/usuarioController');
const { check } = require('express-validator');



//Su endpoint va a ser: api/usuario
router.post('/',[
    check('alias', 'El alias es obligatorio').not().isEmpty(),
    check('email', 'Agrega un email valido').isEmail(),
    check('direccion', 'La direccion es obligatoria').not().isEmpty(),
    check('password', 'El password debe de tener minimo 6 caracteres').isLength({ min : 6})
], usuarioController.crearUsuario);

module.exports = router;