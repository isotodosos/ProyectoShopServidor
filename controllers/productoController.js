const Producto = require('../models/Producto');
const { validationResult } = require('express-validator');


exports.crearProducto = async (req,res) => {
    
    const { nombre, descripcion, precio, stock } = req.body;

    try {

        // revisar si hay errores
        const errores = validationResult(req)//si validationResult() encuentra errores en la req, llenará un array en const errores
        if(!errores.isEmpty()){
            return res.status(400).json({ errores: errores.array() });
        }

        // creamos el producto, lo guardamos y lo devolvemos como respuesta (de momento)
        let producto = new Producto(req.body);
        producto.imagen = null;             
        await producto.save();
        return res.status(200).json({producto});
        
    } catch (error) {
        return res.status(400).send('Algo no ha funcionado');
    }
    
}

//exports.guardarImagenProducto = async (req,res) => {}