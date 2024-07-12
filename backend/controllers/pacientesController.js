const db = require('../config/db');

// Función para obtener todos los pacientes (GET)
const listarPacientes = (req, res) => {
    const sql = "SELECT * FROM Paciente";
    db.query(sql, (err, results) => {
        if (err) throw err;
        res.json(results);
    });
};

// Función para obtener un paciente por su ID (GET)
const obtenerPaciente = (req, res) => {
    const { id } = req.params;
    const sql = "SELECT * FROM Paciente WHERE id = ?";

    db.query(sql, [id], (err, results) => {
        if (err) throw err;
        // Si el paciente no existe
        if (results.length === 0) {
            return res.status(404).json({
                error: 'El paciente solicitado no existe.',
            });
        }
        // si el paciente existe
        res.json(results);
    });
};

// Función para crear un paciente (POST)
const registrarPaciente = (req, res) => {
    const { nombre, especie, edad, propietario } = req.body;
    const sql =
        "INSERT INTO Paciente (nombre, especie, edad, propietario) VALUES (?,?,?,?)";

    db.query(sql, [nombre, especie, edad, propietario], (err, result) => {
        if (err) throw err;
        res.json({
            mensaje: 'Paciente registrado con éxito',
            idPaciente: result.insertId,
        });
    });
};

// Función para editar un paciente por su ID (PUT)
const actualizarPaciente = (req, res) => {
    const { id } = req.params;
    const { nombre, especie, edad, propietario } = req.body;
    const sql =
        "UPDATE Paciente SET nombre = ?, especie = ?, edad = ?, propietario = ? WHERE id = ?";

    // Verificar que todos los campos necesarios estén presentes y no sean null
    if (!nombre || !especie || !edad || !propietario) {
        return res.status(400).json({ mensaje: 'Todos los campos son requeridos' });
    }

    db.query(sql, [nombre, especie, edad, propietario, id], (err, result) => {
        if (err) throw err;
        res.json({
            mensaje: 'Paciente editado con éxito',
        });
    });
};

// Función para borrar un paciente por su ID (DELETE)
const eliminarPaciente = (req, res) => {
    const { id } = req.params;
    const sql = "DELETE FROM Paciente WHERE id = ?";

    db.query(sql, [id], (err, result) => {
        if (err) throw err;
        res.json({
            mensaje: 'Registro del paciente borrado con éxito',
        });
    });
};

module.exports = {
    listarPacientes,
    obtenerPaciente,
    registrarPaciente,
    actualizarPaciente,
    eliminarPaciente,
};
