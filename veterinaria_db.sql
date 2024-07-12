-- Tabla Paciente:
CREATE TABLE Paciente (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(255) NOT NULL,
    especie VARCHAR(100) NOT NULL,
    edad INT NOT NULL,
    propietario VARCHAR(255) NOT NULL
);

INSERT INTO Paciente (nombre, especie, edad, propietario) VALUES
('Luna', 'Gato', 3, 'Diana'),
('Pepe', 'Loro', 2, 'Marcela'),
('Firulais', 'Perro', 5, 'Felipe'),
('Loki', 'Gato', 5, 'Laura');

-- Tabla Doctor:
CREATE TABLE Doctor (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(255) NOT NULL,
    usuario VARCHAR(100) NOT NULL,
    password VARCHAR(255) NOT NULL
);

INSERT INTO Doctor (nombre, usuario, password) VALUES
('Dr. Castillo', 'drcastillo', '$2b$10$zyouKkZiHwCSx6DZNTTeguITejbBoIpe82G.2eKX2D/pugHRrDqQi');

-- Tabla Ingreso (relación uno a muchos con Paciente):
CREATE TABLE Ingreso (
    id INT AUTO_INCREMENT PRIMARY KEY,
    fecha DATE NOT NULL,
    motivo VARCHAR(255) NOT NULL,
    paciente_id INT,	
    FOREIGN KEY (paciente_id) REFERENCES Paciente(id)
);

INSERT INTO Ingreso (fecha, motivo, paciente_id) VALUES
('2024-02-15', 'Vacunación anual', 1),
('2024-03-01', 'Chequeo general', 2),
('2024-05-12', 'Cirugía de esterilización', 3),
('2024-06-20', 'Vacunación anual y desparasitación', 4),
('2024-06-27', 'Consulta por dificultades respiratorias', 2);

-- consultas de prueba
SHOW TABLES;
SELECT * FROM Paciente;
SELECT * FROM Doctor;
SELECT * FROM Ingreso;

-- DROP TABLE Doctor;

SELECT * FROM Paciente where id = 4;
SELECT * FROM Paciente where especie = "Gato";
SELECT * FROM Ingreso WHERE paciente_id = 2;

SELECT Ingreso.id, Ingreso.fecha, Ingreso.motivo, Paciente.nombre AS nombre_paciente
FROM Ingreso
JOIN Paciente ON Ingreso.paciente_id = Paciente.id;