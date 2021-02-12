const express = require('express');
const conectarDB = require('./config/db');


const cors = require('cors');

//creamos el servidor al que llamamos app
const app = express();

conectarDB();

//habilitar cors
app.use(cors()); 

const PORT = process.env.PORT || 4000;


// Habilitar express.json que sustituye a bodyparser para trabajar con json
app.use( express.json({extended: true})) // cuando pones express.json tienes que enviar en postman el header como content-type y de valor aplication/json
// Importar rutas.En express a cada uno de estos se les llama middleware 
app.use('/api/usuarios', require('./routes/usuario') );
//app.use('/api/auth', require('./routes/auth') );


//arranca la app...

app.listen(PORT, () => {
    console.log(`El servidor esta corriendo en por el puerto ${PORT}`);
});
