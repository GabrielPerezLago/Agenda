<div align="center">

# Agenda

</div>



## Resumen

Este es un proyecto de una api conectada a dos bases de datos una MySql y otra MongoDB.

Esta esta enfocada trabajar con contactos de una agenda de contactos. Donde la api gracias a los endpoints **Lista** , **Crea**, **Elimina** y **Busca** los contactos de ambas bases de datos segun sean solicitadas.

### Tecnologias
Las tecnologias utilizas son :

- **Express.js** -> Esta libreria se encarga de facilitar la contruccion de la api
- **Mongodb** -> Esta es la libreria que conecta el proyecto con la base de datos monogo , y falita el uso de querys.
- **Mysql2** -> Esta libreria es la que se encarga de conectar el proyecto con la base de datos MySql.
- **Docker Compose** -> Este es el que se encargara de levantar la base de datos mysql ya que la de mongo esta albergada en atlas (El contenedor de mysql se levantara y se ejecutara automaticamente al iniciar el proyecto)

---

## Primeros Pasos
Antes de empezar es necesario saber que para levantar la base de datos de docker es necesario tener en la raiz el un .env pues necesario para levantar la base de datos en mysql

### Requisitos

1. Node.js
2. Docker

### .ENV 

```
MYSQL_HOST=localhost
MYSQL_PORT=3306
MYSQL_ROOT_PASSWORD=
MYSQL_DATABASE=Agenda
MYSQL_USER=
MYSQL_PASSWORD=
```

## Instalacion y Ejecucion del proyecto.

Para poder iniciar la api es necesario antes instalar las dependecias para eso hay que ejecutar:

```
npm install
```

Para iniciar la api solo es necesario ejecutar el comando:

```
npm run server
```

***Tines todo listo y funcionando***

---
---
---

## Docs

### Endpoints

#### Mongo
|Metodo|Endpoint| StatusCode |Info|
| --- | --- | ---| ---|  
|***GET***|`/mongo/contactos`| ***200*** | Este endpoit debuelve todos los contactos de la base de datos mongo
|***POST***|`/mongo/contactos/create`| ***201*** | Este endpoint sirve para crear un nuevo contacto en mongo
|***DELETE***|`/mongo/contactos/delete`| ***204***| Este endopint sirve para eliminar un contacto en mongo solo por su nombre o su telefono
|***POST***|`/mongo/contactos/find`| ***200*** | Este endpoint sirve para buscar contactos en mongo o por nombre, email o telefono 

#### MySql
|Metodo|Endpoint| StatusCode | Info|
| --- | --- | ---| ---|
|***GET***|`/mysql/contactos`| ***200*** |Este endpoit devuelve todos los contactos de la base de datos mysql
|***POST***|`/mysql/contactos/create`| ***201*** | Este endpint crea un nuevo contacto en la base de datos mysql
|***DELETE***|`/mysql/contactos/delete`| ***204*** | Este endpoitn elimina un contacto de la base de datos mysql mediante su nombre o su telefono
|***POST***|`/mysql/contactos/find`| ***200***| Este endpoint busca contactos de la base de datos mysql por nombre , email o telefono


### Parametros

Los endpoints que **Crean**, **Eliminan** o **Buscan** contactos reciben los mismos parametros independientemente de la base de datos a la que se este accediendo esto se hizo para facilitar y simplificar el uso de la *Api* . 

Todos los endpoits ( Excepto los ***GET*** ) reciben datos de tipo ***BODY***.

#### *Create*
Los create recive los parametros como esta plantilla:

```
{
    "nombre":"test",
    "apellidos": "test test",
    "email": "test@example.com",
    "telefono": "+34000000000",
    "direccion": "test, test, test, test"
}
```

#### *Delete*
Los endpoint para eliminar contactos reciven los datos como estas plantillas dependiendo si se eliminaran por nombre o por telefono:

```
{
    "nombre": "test"
}
```

```
{
    "telefono": "+34000000000"
}
```

#### *Find*

Los endpoints para buscar contactos reciben los parametros como esta plantilla:
```
{
    "nombre": "test",
    "email": "test@example.com",
    "telefono": "+3400000000"
}
```

---
---

## Notas

  - Los datos que sean de tipo telefono deben ir ***siempre*** con prefijo.
  - Cuando haya un error la api devovlera un statuscode **400** o **404** dependiendo del error
  

___
___
___

### Autor : &copy; GabrielPerezLago
