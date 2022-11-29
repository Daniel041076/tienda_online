//lamo a la libreria
const mongoose = require('mongoose');
//entre '' la url de conexion/despues el puerto de mdb:27017/despues el nombre de la base  
mongoose.connect(process.env.MONGO_URL);

