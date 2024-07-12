const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());


// Rutas
const pacientesRoutes = require('./backend/routes/pacientesRoutes');
const doctoresRoutes = require('./backend/routes/doctoresRoutes');
const ingresosRoutes = require('./backend/routes/ingresosRoutes');
// const authRoutes = require('./backend/routes/authRoutes');

app.use('/pacientes', pacientesRoutes);
app.use('/doctores', doctoresRoutes);
app.use('/ingresos', ingresosRoutes);
// app.use('/auth', authRoutes);


// Configuración para servir archivos estáticos desde el dir 'public'
app.use(express.static(path.join(__dirname, 'backend/public')));


// Respuesta ruta raíz
app.get('/', (req, res) => { res.send('HOLA DESDE EL PUERTO LOCALHOST:3000'); });

// Respuesta 404
app.use((req, res) => {
    console.log(`Página no encontrada: ${req.url}`);
    res.status(404).sendFile(path.join(__dirname, 'backend/public', 'notfound.html'));
});


// Llamada al servidor
// console.log(process.env.PORT);
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en puerto ${PORT}`);
});

