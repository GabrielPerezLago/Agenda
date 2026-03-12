use Agenda;
CREATE TABLE CONTACTO (
    ID INT AUTO_INCREMENT PRIMARY KEY,
    NOMBRE VARCHAR(100) NOT NULL,
    EMAIL VARCHAR(100) NOT NULL,
    TELEFONO VARCHAR(100),
    DIRECCION VARCHAR(100)
);

INSERT INTO CONTACTO (NOMBRE, EMAIL, TELEFONO, DIRECCION)
VALUES 
('gabriel', 'gabriel@example.com', '+34 666 000 999', 'Almas 34B , Vigo, Pontevedra, Galicia, Spain'), 
('marcos', 'marcos@example.com', '+34 699 230 999', 'Elpa 34B , O Porriño , Pontevedra, Galicia, Spain');


