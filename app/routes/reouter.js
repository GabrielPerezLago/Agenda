import { getContactos } from '../middleware/controllers/MongoControllers.js'
import { getContactosSql } from '../middleware/controllers/MySqlController.js'
import { Router } from "express";
const router = Router();

// *** MONGO *** 
router.get('/mongo', async (req, res) => {
    try { 

        const contactos = await getContactos()
        console.log(`Contactos de Mongo: ${contactos}`)
        res.status(200).json(contactos)
    
    } catch(ex) { 
        res.status(404).json({ message: `Error al obtener los contactos de Mongo : ${ex}` })
    }
})


// *** MYSQL ***
router.get('/mysql', async (req, res) => {
    try { 
        const contactos = await getContactosSql()
        console.log(`Contacos de MySql: ${contactos} `)
        res.status(200).json(contactos)
    } catch(ex) { 
        res.status(404).json({ message: `Error al obtener los contacos de Mysql : ${ex}` })
    } 
})




export default router;