const Producto = require('../models/Producto');
const { validationResult } = require('express-validator');
const fs = require('fs').promises;
//var fs = require('fs'); //esta libreria nos permite eliminar archivos de nuestro sistema de ficheros
var path = require('path');// otra libreria de node para sacar la ruta del archivo


exports.crearProducto = async (req,res) => {
    
    const { nombre, descripcion, precio, stock, imagen } = req.body;

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



exports.guardarImagenProducto = async (req,res) => {

    const productoId = req.params.id;
    const file_path = req.files.imagen.path;//.path   req.files.file0.path
    
    

    try {

        //manipulo la direccion del archivo para ver para quedarme con la extension y ver si cumple con lo que quiero
        const file_split = file_path.split('\\');
        const file_nombre = file_split[2];
        const extension_split = file_nombre.split('\.');
        const file_ext = extension_split[1]; 
    
        if (file_ext != 'png' && file_ext != 'jpg' && file_ext != 'jpeg' && file_ext != 'gif') {
            //borrar el archivo ya que cada vez que le has dado te lo ha guardado en upload/archives
            fs.unlink(file_path, (err) => {

                return res.status(400).json({msg: 'La extension de la imagen no es correcta', err})
                        
            })
            return;
        }


        //adjunto el archivo en imagen del producto
        await Producto.findOneAndUpdate({_id : productoId}, {imagen: file_nombre}, {new : true}, (err, uploadImagenProducto) => {

            if(err || !uploadImagenProducto){
                return res.status(404).json({msg: 'La imagen no se ha guardado'}) 
                           
            }

            return res.status(200).json({uploadImagenProducto})
               
            
        })
    
        
    } catch (error) {
        return res.status(404).json({msg: error})  
        
    }
        
    

        
}



exports.mostrarProductos = async (req,res) => {

    try {
        const productos = await Producto.find();
        return res.status(200).json({productos});

    } catch (error) {
        return res.status(500).json({msg : error});
    }
}