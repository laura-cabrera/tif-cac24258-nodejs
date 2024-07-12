const express = require('express');
const doctoresRouter = express.Router();
const doctoresController = require('../controllers/doctoresController');
// const authController = require('../controllers/authController');

// Rutas para doctores
doctoresRouter.get('/', doctoresController.listarDoctores);
doctoresRouter.get('/:id', doctoresController.obtenerDoctor);
doctoresRouter.post('/', doctoresController.registrarDoctor);
doctoresRouter.put('/:id', doctoresController.actualizarDoctor);
doctoresRouter.delete('/:id', doctoresController.eliminarDoctor);

// doctoresRouter.post('/registro', doctoresController.registrarDoctor);
// doctoresRouter.post('/login', doctoresController.loginDoctor);

// doctoresRouter.post('/registro', authController.register);
// doctoresRouter.post('/login', authController.login);


module.exports = doctoresRouter;
