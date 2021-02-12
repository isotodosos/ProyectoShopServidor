const mongoose = require("mongoose");

const UsuarioSchema = mongoose.Schema({

    alias : {
        type : String,
        required: true,
        trim : true
    },
    email : {
        type : String,
        required: true,
        trim : true,
        unique : true
    },
    direccion : {
        type : String,
        required : true,
        trim : true
    },
    password : {
        type : String,
        required: true,
        trim : true
    },
    registro : {
        type : Date,
        default : Date.now()
    }
})

// asi le decimos a mongose que se cree una coleccion (Usuario) con el modelo de esquema creado (UsuarioSchema)
module.exports = mongoose.model('Usuario', UsuarioSchema);