import MongoContactosCli from "../models/MongoModels";

export async function getContactos() {
    const contactos = (await MongoContactosCli()).getContactos()
    if (contactos == 100) {
        return `A ocurrido un error no se an encontrado contactos`
    } else {
        return contactos
    }
}







