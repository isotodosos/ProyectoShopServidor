const express = require ('express');
const router = express.Router();

const productoController = require('../controllers/productoController');
const { check } = require('express-validator');

const authPS = require ('../middelware/authPS');
const multipart = require ('connect-multiparty');
const md_upload = multipart({uploadDir: './upload/productos'});// el conectmultiparty nos da un midelware que es una funcionalidad que se ejecuta antes del metodo de nuestro controlador 



//Su endpoint va a ser: api/producto

//Guardar un producto
router.post('/crear-producto',[
    check('nombre', 'Escribe el nombre del producto').not().isEmpty(),
    check('descripcion', 'Escribe la descripcion del producto').not().isEmpty(),
    check('precio', 'Escribe el precio del producto').not().isEmpty(),
    check('stock', 'Contabiliza el stock del producto').not().isEmpty()
    ],
authPS,
productoController.crearProducto);

//Guardar la imagen de un producto
router.post('/guardar-imagen-producto/:id',
md_upload,
productoController.guardarImagenProducto);

//Obtener todos los productos
router.get('/catalogo',
productoController.mostrarProductos)

// Obtener imagen
router.get('/get-imagen/:imagen',
productoController.getImagen)

//Obtener un producto
router.get('/:id',
productoController.mostrarProducto)

// Actualizar Producto
router.put('/actualizar/:id',
authPS,
productoController.actualizaProducto);


module.exports = router;