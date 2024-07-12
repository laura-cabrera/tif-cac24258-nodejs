const db = require("../config/db");

// Función para obtener todos los ingresos (GET)
const listarIngresos = (req, res) => {
    const sql = `
        SELECT Ingreso.*, Paciente.nombre AS nombre_paciente
        FROM Ingreso
        JOIN Paciente ON Ingreso.paciente_id = Paciente.id
    `;

    db.query(sql, (err, results) => {
        if (err) throw err;
        res.json(results);
    });
};

// Función para obtener un ingreso por su ID (GET)
const obtenerIngreso = (req, res) => {
    const { id } = req.params;
    const sql =  `
    SELECT Ingreso.id, Ingreso.fecha, Ingreso.motivo, Paciente.nombre AS nombre_paciente
    FROM Ingreso
    JOIN Paciente ON Ingreso.paciente_id = Paciente.id
    WHERE Ingreso.id = ?
    `;

    db.query(sql, [id], (err, results) => {
        if (err) throw err;
        // Si el ingreso no existe
        if (results.length === 0) {
            return res.status(404).json({
                error: "El ingreso solicitado no existe.",
            });
        }
        // si el ingreso existe
        res.json(results);
    });
};

// Función para crear un ingreso (POST)
const registrarIngreso = (req, res) => {
    const { fecha, motivo, paciente_id } = req.body;
    const sql = "INSERT INTO Ingreso (fecha, motivo, paciente_id) VALUES (?,?,?)";

    db.query(sql, [fecha, motivo, paciente_id], (err, result) => {
        if (err) throw err;
        res.json({
            mensaje: "Ingreso registrado con éxito",
            idIngreso: result.insertId,
        });
    });
};

// Función para editar un Ingreso por su ID (PUT)
const actualizarIngreso = (req, res) => {
    const { id } = req.params;
    const { fecha, motivo, paciente_id } = req.body;
    const sql =
        "UPDATE Ingreso SET fecha = ?, motivo =?, paciente_id = ? WHERE id = ?";

    db.query(sql, [fecha, motivo, paciente_id, id], (err, result) => {
        if (err) throw err;
        res.json({
            mensaje: "Ingreso editado con éxito",
        });
    });
};

// Función para borrar un Ingreso por su ID (DELETE)
const eliminarIngreso = (req, res) => {
    const { id } = req.params;
    const sql = "DELETE FROM Ingreso WHERE id = ?";

    db.query(sql, [id], (err, result) => {
        if (err) throw err;
        res.json({
            mensaje: "Registro del Ingreso borrado con éxito",
        });
    });
};

module.exports = {
    listarIngresos,
    obtenerIngreso,
    registrarIngreso,
    actualizarIngreso,
    eliminarIngreso,
};
