import dotenv from 'dotenv'
import mysql from 'mysql2/promise'

dotenv.config()


export default async function connection() {
    try {
        const HOST = process.env.MYSQL_HOST
        const USUARIO = process.env.MYSQL_USER
        const PASS = process.env.MYSQL_PASSWORD;
        const DATA = `Agenda`
        const PORT = process.env.MYSQL_PORT


        return await mysql.createConnection({
            host: HOST,
            user: USUARIO,
            password: PASS,
            database: DATA,
            port: PORT
        })
    } catch(ex) {
        throw new Error(`Error al conectarse a la base de datos mysql , Errror MYSQL0 : ${ex}`)
    }
}