import express from 'express';
import config from './config';
import cuentasClienteRoutes from './routes/consulta-cobranza.routes';
const cors = require('cors');
const morgan =require('morgan');

const app = express();

//settings
app.set('port', config.port || 4000)
//middlewares
app.use(cors());
app.use(morgan("dev"));
app.use(express.json()); //permite a express recibir json
app.use(express.urlencoded({extended:false})); //permite a express recibir formulario html

//para usar las rutas
app.use("/api",cuentasClienteRoutes);


export default app;