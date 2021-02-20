const mongoose = require("mongoose");

const ProductoSchema = mongoose.Schema({

    nombre : {
        type : String,
        required: true,
        trim : true
    },
    descripcion : {
        type : String,
        required: true,
        trim : true
    },
    precio : {
        type : Number,
        required: true,
        trim : true
    },
    stock : {
        type : Number,
        required: true,
        trim : true
    },
    imagen : {
        type : String,
        required: true,
        trim : true
    }

})

// asi le decimos a mongose que se cree una coleccion (Producto) con el modelo de esquema creado (ProductoSchema)
module.exports = mongoose.model('Producto', ProductoSchema);