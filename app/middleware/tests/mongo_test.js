import MongoConnection from "../../mongo/mongo_conn.js"
import { createContactos, deleteContato, getContactos } from "../controllers/MongoControllers.js"

export async function mongoConnTest() {
    try {
        const data = await MongoConnection()

        if (typeof data === 'object' && data != null && Object.entries(data).length > 0 ) {
            return `Conexion a mongo realizada con exito`
        } else {
            return `A ocurrido un error en la conexion a mongo` 
        }

    } catch(ex) {
        console.error(ex)
    }
}

export async function getContactosMongoTest() {
    try {
        return await getContactos()
    } catch (ex) {
        console.error(ex)
    }
}

export async function createContactoMongoTest(n, ap, email, tlf, drcc) {
    try {
        return await createContactos(n, ap, email, tlf, drcc)
    } catch(ex) {
        console.error(ex)
    }
}

export async function deleteContactoMongoTest(contacto) {
    try {
        return await deleteContato(contacto)
    } catch (ex) {
        console.error(ex)
    }
}