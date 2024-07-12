// routes/ingresosRoutes.js

const express = require('express');
const ingresosRouter = express.Router();
const ingresosController = require('../controllers/ingresosController');

// Rutas para ingresos
ingresosRouter.get('/', ingresosController.listarIngresos);
ingresosRouter.get('/:id', ingresosController.obtenerIngreso);
ingresosRouter.post('/', ingresosController.registrarIngreso);
ingresosRouter.put('/:id', ingresosController.actualizarIngreso);
ingresosRouter.delete('/:id', ingresosController.eliminarIngreso);

module.exports = ingresosRouter;
