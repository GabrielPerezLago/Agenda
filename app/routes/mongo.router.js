import { error } from 'console'
import { getContactos, createContactos, deleteContato, findByCriteria } from '../middleware/controllers/MongoControllers.js'
import { Router } from 'express'
import { checkAndSanitizeContactos } from '../middleware/utils/contactosUtils.js'
const MongoRouter = Router()

MongoRouter.get('/contactos', async (req, res) => {
    try { 

        const contactos = await getContactos()
        console.log(`Contactos de Mongo: ${contactos}`)
        res.status(200).json(contactos)
    
    } catch(ex) { 
        res.status(400).json({error: `Error al obtener los contactos de Mongo`})
        console.log(`Error al obtener los contacos de mongo, Error : ${ex}`);
    }
})

MongoRouter.post('/contactos/create', async (req, res) => {
    try {
        const { nombre, apellidos, email, telefono, direccion } = req.body
        const contactos = await createContactos(nombre, apellidos, email, telefono, direccion)

        if (Object.keys(contactos).includes('error')) {
            delete contactos.error
            res.status(400).json(contactos)
            return
        } 

        res.status(201).json(contactos)
    } catch(ex) {
        res.status(404).json({error: `Error al crear el contacto en Mongo`})
        console.log(`Error en la creacion del contacto en mongo, Error: ${ex}`)
    }
})

MongoRouter.delete('/contactos/delete', async (req, res) => {
    try {
        const params = req.body.telefono || req.body.nombre
        const contactos = await deleteContato(params)
        console.log(`Contactos: ${contactos}`)
        if (!Object.keys(contactos).includes('contacto')) {
            res.status(400).json(contactos)
            return
        }

        res.status(204).json(contactos)
    } catch(ex) {
        res.status(400).json({error: `Error al eliminar el contacto`})
        console.log(`Error al eliminar el contacto en la base de datos mongo Error: ${ex}`)
    }
})

MongoRouter.post("/contactos/find",async (req, res) => {
    try {
        const params = req.body
        const filter = checkAndSanitizeContactos(params)

        if(Object.keys(filter).includes("error")) {
            delete filter.error
            res.status(404).json(filter)
            return
        }

        const find = await findByCriteria(params)
        if (Object.keys(find).includes('failed'))  {
            res.status(404).json(find)
            return
        }
        res.status(200).json(find)        

    } catch (ex) {
        res.status(404).json({error: "Error al buscar el contacto"})
        console.error(`Error al buscar el contacto en mongo, Error : ${ex.message}`)
    }
})

export default MongoRouter