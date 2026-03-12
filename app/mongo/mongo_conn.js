import { MongoClient } from 'mongodb'

const uri = "mongodb+srv://admin:Hodr%4022@cluster0.fs4o2qj.mongodb.net/?appName=Cluster0"

const config = {
    serverSelectionTimeoutMS: 3500
}


const cli = new MongoClient(uri, config)


export default async function MongoConnection() {
    try {
        await cli.connect()
        return cli.db(`Agenda`).collection(`contacto`)
    } catch (ex) {
        throw new Error(`Error al conectarse a base de datos mongo , Error MDB0 : ${ex}`)
    }
}
