const Usuario = require('../models/Usuario');
const { validationResult } = require('express-validator')
const bcryptjs = require("bcryptjs");


exports.crearUsuario = async (req,res) => {
    
    const { email, password } = req.body;

    try {

        // revisar si hay errores
        const errores = validationResult(req)//si validationResult() encuentra errores en la req, llenará un array en const errores
        if(!errores.isEmpty()){
            return res.status(400).json({ errores: errores.array() });
        }

        // revisar que el usuario registrado sea unico
        let usuario = await Usuario.findOne({email});
        if (usuario) {
            return res.status(400).json({msg : 'El usuario ya existe'})
        }

        // creamos el usuario
        usuario = new Usuario(req.body);
        //hasheamos el password para codificarlo. salt te permite tener varias passwords haseadas iguales.
        const salt = await bcryptjs.genSalt(10);
        usuario.password = await bcryptjs.hash(password, salt);

        // guardamos el usuario y lo devolvemos como respuesta (de momento)
        await usuario.save();
        return res.status(200).json({usuario});

        
    } catch (error) {
        
    }
}