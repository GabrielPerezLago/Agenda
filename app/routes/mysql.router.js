import { delContatoSQL, getContactosSql, insertContacto, findByCriteriaSQL } from '../middleware/controllers/MySqlController.js'
import { Router } from "express"
const MySqlRouter = Router()

MySqlRouter.get('/contactos', async (req, res) => {
    try { 
        const contactos = await getContactosSql()
        console.log(`Contacos de MySql: ${contactos} `)
        res.status(200).json(contactos)
    } catch(ex) { 
        res.status(404).json({ message: `Error al obtener los contacos de Mysql` })
        console.log(`Error al obtener los datos de sql: Error: ${ex}`)
    } 
})

MySqlRouter.post('/contactos/create', async (req, res) => {
    try {
        const {nombre, apellidos, email, telefono, direccion} = req.body
        const contactos = await insertContacto(nombre, apellidos, email, telefono, direccion)
        
        if (Object.keys(contactos).includes('error')) {
            delete contactos.error
            res.status(400).json(contactos)
            return
        }

        res.status(201).json(contactos)

    } catch(ex) {
        res.status(404).json({error: 'Error al crear el usuario'})
        console.log(`Error al crear el contacto en MySqk , ERROR: ${ex}`)
    }
})

MySqlRouter.delete('/contactos/delete', async (req, res) => {
    try {
        const params = req.body.telefono || req.body.nombre
        const del = await delContatoSQL(params)

        if(!Object.keys(del).includes('contacto')) {
            res.status(400).json(del)
            return
        }

        res.status(204).json(del)
    } catch(ex) {
         res.status(404).json({error: `Error al eliminar el contacto`})
        console.log(`Error al eliminar el contacto en la base de datos mongo Error: ${ex}`)
    }
})

MySqlRouter.post('/contactos/find', async (req, res) => {
    try {
        const params = req.body
        const filter = checkAndSanitizeContactos(params)
        
        if(Object.keys(filter).includes("error")) {
            delete filter.error
            res.status(404).json(filter)
            return
        }
        
        const find = await findByCriteriaSQL(params)

        if (Object.keys(find).includes('failed'))  {
            res.status(404).json(find)
            return
        }
        res.status(200).json(find)
    } catch (ex) {
        res.status(404).json({error: "Error al buscar el contacto"})
        console.error(`Error al buscar el contacto en mysql, Error : ${ex.message}`)
    }
})

export default MySqlRouter