// routes/pacientesRoutes.js

const express = require('express');
const pacientesRouter = express.Router();
const pacientesController = require('../controllers/pacientesController');

// Rutas para pacientes
pacientesRouter.get('/', pacientesController.listarPacientes);
pacientesRouter.get('/:id', pacientesController.obtenerPaciente);
pacientesRouter.post('/', pacientesController.registrarPaciente);
pacientesRouter.put('/:id', pacientesController.actualizarPaciente);
pacientesRouter.delete('/:id', pacientesController.eliminarPaciente);

module.exports = pacientesRouter;
