require('dotenv').config();

const mySql = require("mysql2");

const connection = mySql.createConnection({
    // host: "localhost",
    // user: "root",
    // password: "",
    // database: "veterinaria_db",
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
});

connection.connect((err) => {
    if (err) {
        console.error("Error conectando a la base de datos");
        return;
    }
    console.log("Conexión a la base de datos establecida correctamente.");

    // Crea la base de datos si no existe
    // connection.query(
    //     "CREATE DATABASE IF NOT EXISTS veterinaria_db",
    //     (err, results) => {
    //         if (err) {
    //             console.error("Error creando la base de datos", err);
    //             return;
    //         }
    //         console.log("Base de datos creada correctamente.");

    //         // Selección de la base de datos veterinaria_db
    //         connection.changeUser({ database: "veterinaria_db" }, (err) => {
    //             if (err) {
    //                 console.error("Error cambiando a la nueva base de datos", err);
    //                 return;
    //             }
    //             console.log("Usando la base de datos veterinaria_db.");

    //             // Creación de la tabla Paciente si no existe
    //             connection.query(
    //                 `
    //                 CREATE TABLE IF NOT EXISTS Paciente (
    //                     id INT AUTO_INCREMENT PRIMARY KEY,
    //                     nombre VARCHAR(255) NOT NULL,
    //                     especie VARCHAR(100) NOT NULL,
    //                     edad INT NOT NULL,
    //                     propietario VARCHAR(255) NOT NULL
    //                 )
    //             `,
    //                 (err) => {
    //                     if (err) {
    //                         console.error("Error creando la tabla Paciente:", err.stack);
    //                         return;
    //                     }
    //                     console.log("Tabla Paciente creada correctamente.");

    //                     // Creación de la tabla Doctor si no existe
    //                     connection.query(
    //                         `
    //                     CREATE TABLE IF NOT EXISTS Doctor (
    //                         id INT AUTO_INCREMENT PRIMARY KEY,
    //                         nombre VARCHAR(255) NOT NULL,
    //                         usuario VARCHAR(100) NOT NULL,
    //                         password VARCHAR(255) NOT NULL
    //                     )
    //                 `,
    //                         (err) => {
    //                             if (err) {
    //                                 console.error("Error creando la tabla Doctor:", err.stack);
    //                                 return;
    //                             }
    //                             console.log("Tabla Doctor creada correctamente.");

    //                             // Creación de la tabla Ingreso si no existe
    //                             connection.query(
    //                                 `
    //                         CREATE TABLE IF NOT EXISTS Ingreso (
    //                             id INT AUTO_INCREMENT PRIMARY KEY,
    //                             fecha DATE NOT NULL,
    //                             motivo VARCHAR(255) NOT NULL,
    //                             paciente_id INT,
    //                             FOREIGN KEY (paciente_id) REFERENCES Paciente(id)
    //                         )
    //                     `,
    //                                 (err) => {
    //                                     if (err) {
    //                                         console.error(
    //                                             "Error creando la tabla Ingreso:",
    //                                             err.stack
    //                                         );
    //                                         return;
    //                                     }
    //                                     console.log("Tabla Ingreso creada correctamente.");

    //                                     console.log("Base de datos y tablas creadas y asegurada.");
    //                                 }
    //                             );
    //                         }
    //                     );
    //                 }
    //             );
    //         });
    //     }
    // );
});


module.exports = connection;
