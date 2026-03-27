import MongoContactosCli from "../models/MongoModels.js";
import { checkAndSanitizeContactos, sanitizeTelefono } from "../utils/contactosUtils.js";

export async function getContactos() {
    const contactos = (await MongoContactosCli()).getContactos()
    if (contactos == 100) { 
        return `A ocurrido un error, no se an encontrado contactos`
    } else {
        return contactos
    }
}

/**
 * 
 * @param {*} nombre 
 * @param {*} apellidos 
 * @param {*} email 
 * @param {*} telef 
 * @param {*} direcc 
 * 
 * Esta funcion crea en una base de datos mongo en la que se creara un contacto en una base de datos mongo
 * 
 * 
 * 
 * @returns 
 * Retorna o los contactos o dos tipos de errores , los errores de los params o la existencia de los mismos
 */
export async function createContactos(nombre, apellidos, email, telef, direcc) {
    let contacto = {
        nombre: nombre,
        apellidos: apellidos,
        email: email,
        telefono: telef,
        direccion: direcc
    }

    const filtered = checkAndSanitizeContactos(contacto);

    if (Object.keys(filtered).includes('error')){
        return filtered
    } 
        
    const exist = await (await MongoContactosCli()).findByCriteria({telefono: filtered.telefono})


    if (exist.length > 0) {
        return { error: 'error', telefono: 'El telefono ya ha sido registrado como contacto'}
    }

    
    const create = await (await MongoContactosCli()).createContacto(filtered)
    return create
    

}

export async function deleteContato(params) {
    const isDel = `Se ha eliminado el contacto correctamente`
    const notDel = `No se ha podido eliminar el contacto, los datos insertados no estan bien o el contacto no existe`

    if (params.includes('+')) {
        sanitizeTelefono(params)

        const exist = await (await MongoContactosCli()).findByCriteria({telefono: params})

        if (exist.length <= 0) return `El telefono insertado no existe. `

        const del = await (await MongoContactosCli()).deleteContactos({telefono: params}) 
        return del ? isDel : notDel 
    } else {
        const exist = await (await MongoContactosCli()).findByCriteria({nombre: params})

        if (exist.length <= 0) return `El nombre insertado no existe`

        const del = await (await MongoContactosCli()).deleteContactos({nombre: params})
        return del ? isDel : notDel 
    }
}

export async function findByCriteria(params) {
    const filtered = checkAndSanitizeContactos(params)
    const contactos = await (await MongoContactosCli()).findByCriteria(filtered)
    if (contactos.length <= 0) return `No se han encontrado contactos con esas credeciales :(`
    return contactos
}







