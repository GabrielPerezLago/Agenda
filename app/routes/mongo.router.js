import { getContactos, createContactos, deleteContato } from '../middleware/controllers/MongoControllers.js'
import { Router } from 'express'
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

        res.status(200).json(contactos)
    } catch(ex) {
        res.status(404).json({error: `Error al crear el contacto en Mongo`})
        console.log(`Error en la creacion del contacto en mongo, Error: ${ex}`)
    }
})

MongoRouter.delete('/contactos/delete', async (req, res) => {
    try {
        const params = req.params.telefono || req.params.nombre
        const contactos = await deleteContato(params);
        if (!Object.keys(contactos).includes('contactos')) {
            res.status(400).json(contactos)
            return
        }

        res.status(200).json(contactos)
    } catch(ex) {
        res.status.apply(404).json({error: `Error al eliminar el contacto`})
        console.log(`Error al eliminar el contacto en la base de datos mongo Error: ${ex}`)
    }
})

export default MongoRouter