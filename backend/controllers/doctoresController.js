const db = require("../config/db");
// const hashPassword = require("../config/bcryptSetup");

// Función para obtener todos los doctores (GET)
const listarDoctores = (req, res) => {
    const sql = "SELECT * from Doctor";

    db.query(sql, (err, results) => {
        if (err) throw err;
        res.json(results);
    });
};

// Función para obtener un doctor por su ID (GET)
const obtenerDoctor = (req, res) => {
    const { id } = req.params;
    const sql = "SELECT * FROM Doctor WHERE id = ?";

    db.query(sql, [id], (err, results) => {
        if (err) throw err;
        // si el doctor no existe
        if (results.length === 0) {
            return res.status(404).json({
                error: "El doctor solicitado no existe.",
            });
        }
        // si el doctor existe
        res.json(results);
    });
};

// Función para crear un doctor (POST)
const registrarDoctor = (req, res) => {
    const { nombre, usuario, password } = req.body;
    const sql =
        "INSERT INTO Doctor (nombre, usuario, password) VALUES (?,?,?)";

    db.query(sql, [nombre, usuario, password], (err, result) => {
        if (err) throw err;
        res.json({
            mensaje: 'Doctor registrado con éxito',
            idDoctor: result.insertId,
        });
    });
};

// Función para registrar un nuevo doctor
// async function registrarDoctor(req, res) {
//     try {
//         const { nombre, usuario, password } = req.body;

//         // Encriptar la contraseña antes de guardarla en la base de datos
//         const hashedPassword = await hashPassword(password);

//         // Aquí lógica para guardar el doctor en la base de datos

//         // Ejemplo:
//         const nuevoDoctor = await Doctor.create({
//             nombre,
//             usuario,
//             password: hashedPassword,
//         });

//         res.status(201).json({
//             message: "Doctor registrado correctamente",
//             id: nuevoDoctor.insertId,
//         });
//     } catch (error) {
//         console.error("Error al registrar doctor:", error);

//         res.status(500).json({ message: "Error interno del servidor" });
//     }
// }

// Función para editar un doctor por su ID (PUT)
const actualizarDoctor = (req, res) => {
    const { id } = req.params;
    const { nombre, usuario, password } = req.body;
    const sql =
        "UPDATE Doctor SET nombre = ?, usuario = ?, password = ? WHERE id = ?";

    db.query(sql, [nombre, usuario, password, id], (err, result) => {
        if (err) throw err;
        res.json({
            mensaje: "Doctor editado con éxito.",
        });
    });
};

// Función para borrar un doctor por su ID (DELETE)
const eliminarDoctor = (req, res) => {
    const { id } = req.params;
    const sql = "DELETE FROM Doctor WHERE id = ?";

    db.query(sql, [id], (err, result) => {
        if (err) throw err;
        res.json({
            mensaje: "Registro del doctor borrado con éxito",
        });
    });
};

module.exports = {
    listarDoctores,
    obtenerDoctor,
    registrarDoctor,
    actualizarDoctor,
    eliminarDoctor,
};
