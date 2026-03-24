import MySqlCliContactos from "../models/MysqlModel.js";
import { checkAndSanitizeContactos, sanitizeTelefono } from "../utils/contactosUtils.js";


export async function getContactosSql() {
    const contactos = (await MySqlCliContactos()).getContactos()
    return contactos
}

export async function insertContacto(nombre, apellidos, email, telefono, direccion) {


    const filtered = checkAndSanitizeContactos({nombre: nombre, apellidos: apellidos, email: email, telefono: telefono, direccion: direccion})
    

    if (await isExistEmail(filtered.email) || await isExistTelefono(filtered.telefono)) return {error: 'error', email: 'No se pueden introducir ni un email ni un telefono existentes'}

    if (Object.keys(filtered).includes('error')){
        return filtered
    } 

    const data = Object.values(filtered)
    const contacto = await (await MySqlCliContactos()).createContactoSql(data)

    return contacto

}

export async function delContatoSQL(params) {

    const isDel = `Se ha eliminado el contacto correctamente`
    const notDel = `No se ha podido eliminar el contacto, los datos insertados no estan bien o el contacto no existe`
    
    if (params.includes('+')) {
        sanitizeTelefono(params)
        if (!await isExistTelefono(params)) return `El telefono no existe`
        const del = await (await MySqlCliContactos()).deleteContacto({telefono: params}) 
        return del ? isDel : notDel 
    } else {
        if (!await isExistNombre(params)) return `El nombre no existe`
        const del = await (await MySqlCliContactos()).deleteContacto({nombre: params})
        return del ? isDel : notDel 
    }
}

export async function findByCriteriaSQL(params) {
    const filtered = checkAndSanitizeContactos(params)

    if (Object.keys(filtered).includes('error')){
        return filtered
    }

    const contactos = await (await MySqlCliContactos()).findByCriteria(filtered)
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