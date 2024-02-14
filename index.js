import express from 'express';
import cors from 'cors';
import rotaDepartamento from './Rotas/rotaDepartamento.js';

const host='0.0.0.0';
const porta='3000';

const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


app.use('/departamento',rotaDepartamento);

app.listen(porta, host, ()=>{
    console.log(`Servidor escutando na porta ${host}:${porta}.`);
})
