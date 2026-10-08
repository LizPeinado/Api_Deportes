const express = require('express');
const fs = require('fs');

const app = express();

app.use(express.json());


// GET - Página principal
app.get('/', (req, res) => {
    res.send('API de Natación funcionando');
});


// GET - Mostrar todos los registros
app.get('/natacion', (req, res) => {
    const datos = fs.readFileSync('db.json', 'utf-8');
    const natacion = JSON.parse(datos);

    res.json(natacion);
});


// GET - Mostrar un registro por ID
app.get('/natacion/:id', (req, res) => {
    const datos = fs.readFileSync('db.json', 'utf-8');
    const natacion = JSON.parse(datos);

    const id = parseInt(req.params.id);

    const registro = natacion.find(n => n.id === id);

    if (!registro) {
        return res.status(404).json({
            mensaje: 'Registro no encontrado'
        });
    }

    res.json(registro);
});


// POST - Agregar un nuevo registro
app.post('/natacion', (req, res) => {
    const datos = fs.readFileSync('db.json', 'utf-8');
    const natacion = JSON.parse(datos);

    const nuevoRegistro = req.body;

    nuevoRegistro.id = natacion.length + 1;

    natacion.push(nuevoRegistro);

    fs.writeFileSync('db.json', JSON.stringify(natacion, null, 4));

    res.status(201).json(nuevoRegistro);
});


// PUT - Modificar un registro
app.put('/natacion/:id', (req, res) => {
    const datos = fs.readFileSync('db.json', 'utf-8');
    const natacion = JSON.parse(datos);

    const id = parseInt(req.params.id);

    const posicion = natacion.findIndex(n => n.id === id);

    if (posicion === -1) {
        return res.status(404).json({
            mensaje: 'Registro no encontrado'
        });
    }

    natacion[posicion] = {
        id: id,
        ...req.body
    };

    fs.writeFileSync('db.json', JSON.stringify(natacion, null, 4));

    res.json(natacion[posicion]);
});


// DELETE - Eliminar un registro
app.delete('/natacion/:id', (req, res) => {
    const datos = fs.readFileSync('db.json', 'utf-8');
    const natacion = JSON.parse(datos);

    const id = parseInt(req.params.id);

    const posicion = natacion.findIndex(n => n.id === id);

    if (posicion === -1) {
        return res.status(404).json({
            mensaje: 'Registro no encontrado'
        });
    }

    const eliminado = natacion.splice(posicion, 1);

    fs.writeFileSync('db.json', JSON.stringify(natacion, null, 4));

    res.json({
        mensaje: 'Registro eliminado',
        registro: eliminado[0]
    });
});


app.listen(3000, () => {
    console.log('Servidor funcionando en http://localhost:3000');
});