import MySqlCliContactos from "../models/MysqlModel.js";
import { checkAndSanitizeContactos, sanitizeTelefono } from "../utils/contactosUtils.js";


export async function getContactosSql() {
    const contactos = await (await MySqlCliContactos()).getContactos()
    return contactos
}

export async function insertContacto(nombre, apellidos, email, telefono, direccion) {


    const filtered = checkAndSanitizeContactos({nombre: nombre, apellidos: apellidos, email: email, telefono: telefono, direccion: direccion})
    
    if (Object.keys(filtered).includes('error')){
        return filtered
    }

    if (await isExistEmail(filtered.email) || await isExistTelefono(filtered.telefono)) return {error: 'error', email: 'No se pueden introducir ni un email ni un telefono existentes'}


    const data = Object.values(filtered)
    const contacto = await (await MySqlCliContactos()).createContactoSql(data)

    return contacto

}

export async function delContatoSQL(params) {

    const isDel = {contacto: `Se ha eliminado el contacto correctamente`}
    const notDel = { error: `No se ha podido eliminar el contacto, los datos insertados no estan bien o el contacto no existe`}
    
    if (params.includes('+')) {
        const telf = checkAndSanitizeContactos({telefono: params})
        console.log(telf.telefono)
        if (!await isExistTelefono(telf.telefono)) return {telefono: `El telefono no existe`}
        const del = await (await MySqlCliContactos()).deleteContacto(telf) 
        return del ? isDel : notDel 
    } else {
        const name = checkAndSanitizeContactos({nombre: params})
        const exist = await isExistNombre(name)
        console.info(exist)
        if (exist) return {nombre: `El nombre no existe`}
        const del = await (await MySqlCliContactos()).deleteContacto(name)
        return del ? isDel : notDel 
    }
}

/**
 * 
 * @param {*} params 
 * @returns 
 * 
 * FIND BY CRITERIA
 */

export async function findByCriteriaSQL(params) {

    if (Object.keys(params).length === 0) return await getContactosSql()

    const filtered = checkAndSanitizeContactos(params)

    if (Object.keys(filtered).includes('error')){
        return filtered
    }

    const contactos = await (await MySqlCliContactos()).findByCriteria(filtered)
    if (contactos.length <= 0) return `No se ha encontrado ningun contacto con esas credenciales`
    return contactos
}


async function isExistTelefono(tlf) {
    const exist = await (await MySqlCliContactos()).isExistTelefono(tlf)
    return exist
}

async function isExistEmail(email) {
    const exist = await (await MySqlCliContactos()).isExistEmail(email)
    return exist
}
async function isExistNombre(nombre) {
    const exist = await (await MySqlCliContactos()).isExistNombre(nombre)
    return exist
}