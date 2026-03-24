use Agenda;
CREATE TABLE CONTACTO (
    ID INT AUTO_INCREMENT PRIMARY KEY,
    NOMBRE VARCHAR(100) NOT NULL,
    APELLIDOS VARCHAR(100),
    EMAIL VARCHAR(100) NOT NULL,
    TELEFONO VARCHAR(100),
    DIRECCION VARCHAR(100)
);

INSERT INTO CONTACTO (NOMBRE, APELLIDOS, EMAIL, TELEFONO, DIRECCION)
VALUES 
('gabriel', 'gomez gomez','gabriel@example.com', '+34 666 000 999', 'Almas 34B , Vigo, Pontevedra, Galicia, Spain'), 
('marcos', 'perez lopez','marcos@example.com', '+34 699 230 999', 'Elpa 34B , O Porriño , Pontevedra, Galicia, Spain');


