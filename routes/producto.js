const express = require ('express');
const router = express.Router();

const productoController = require('../controllers/productoController');
const { check } = require('express-validator');

const authPS = require ('../middelware/authPS');
const multipart = require ('connect-multiparty');
const md_upload = multipart({uploadDir: './upload/productos'});// el conectmultiparty nos da un midelware que es una funcionalidad que se ejecuta antes del metodo de nuestro controlador 



//Su endpoint va a ser: api/producto
router.post('/crear-producto',[
    check('nombre', 'Escribe el nombre del producto').not().isEmpty(),
    check('descripcion', 'Escribe la descripcion del producto').isEmail(),
    check('precio', 'Escribe el precio del producto').not().isEmpty(),
    check('stock', 'Numera el stock del producto').not().isEmpty()
    ],
authPS,
productoController.crearProducto);

/*
router.post('/guardar-imagen-producto/:id',
authPS,
md_upload,
productoController.guardarImagenProducto);
*/

module.exports = router;