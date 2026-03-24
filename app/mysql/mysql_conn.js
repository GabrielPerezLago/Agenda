import mysql from 'mysql2/promise'
import getDataToEnv from '../middleware/utils/dotenvUtils.js';


export default async function MySqlConnection() {
    try {
        const HOST = getDataToEnv('MYSQL_HOST')
        const USUARIO = getDataToEnv('MYSQL_USER')
        const PASS = getDataToEnv('MYSQL_PASSWORD')
        const DATA = `Agenda`
        const PORT = getDataToEnv('MYSQL_PORT')


        const data = await mysql.createConnection({
            host: HOST,
            user: USUARIO,
            password: PASS,
            database: DATA,
            port: PORT
        })
        return data
    } catch(ex) {
        throw new Error(`Error al conectarse a la base de datos mysql , Errror MYSQL0 : ${ex}`)
    }
}