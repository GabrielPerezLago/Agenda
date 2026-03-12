import connection from "../../mysql/mysql_conn.js";

export async function mysqlConnTest() {
    try {
        const data = await connection()
        if (typeof data === 'object' && data != null && Object.entries(data).length > 0) {
            return `Conexion con la base de datos mysql realizada con exito` 
        } else {
            return `No se ha podido realuzar la conexion con la base de datos mysql` 
        }
    } catch(ex) {
        console.error(ex)
    }
}