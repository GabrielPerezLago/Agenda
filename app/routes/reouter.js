import { getContactos, createContactos } from '../middleware/controllers/MongoControllers.js'
import { getContactosSql, insertContacto } from '../middleware/controllers/MySqlController.js'
import e, { Router } from "express";
const router = Router();

// *** MONGO *** 
router.get('/mongo', async (req, res) => {
    try { 

        const contactos = await getContactos()
        console.log(`Contactos de Mongo: ${contactos}`)
        res.status(200).json(contactos)
    
    } catch(ex) { 
        res.status(400).json({error: `Error al obtener los contactos de Mongo`})
        console.log(`Error al obtener los contacos de mongo, Error : ${ex}`);
    }
})

router.post('/mongo/create', async (req, res) => {
    try {
        const { nombre, apellidos, email, telefono, direccion } = req.body
        const contactos = await createContactos(nombre, apellidos, email, telefono, direccion)

        if (Object.keys(contactos).includes('error')) {
            delete contactos.error
            res.status(400).json(contactos)
            return
        } 

        res.status(200).json(contactos)
    } catch(ex) {
        res.status(404).json({error: `Error al crear el contacto en Mongo`})
        console.log(`Error en la creacion del contacto en mongo, Error: ${ex}`)
    }
})

// *** MYSQL ***
router.get('/mysql', async (req, res) => {
    try { 
        const contactos = await getContactosSql()
        console.log(`Contacos de MySql: ${contactos} `)
        res.status(200).json(contactos)
    } catch(ex) { 
        res.status(400).json({ message: `Error al obtener los contacos de Mysql` })
        console.log(`Error al obtener los datos de sql: Error: ${ex}`)
    } 
})

router.post('/mysql/create', async (req, res) => {
    try {
        const {nombre, apellidos, email, telefono, direccion} = req.body
        const contactos = await insertContacto(nombre, apellidos, email, telefono, direccion)
        
        if (Object.keys(contactos).includes('error')) {
            delete contactos.error
            res.status(400).json(contactos)
            return
        }

        res.status(200).json(contactos)

    } catch(ex) {
        res.status(404).json({error: 'Error al crear el usuario'})
        console.log(`Error al crear el contacto en MySqk , ERROR: ${ex}`)
    }
})


   



export default router;