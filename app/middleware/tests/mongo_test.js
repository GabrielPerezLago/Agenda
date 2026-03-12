import connect from "../../mongo/mongo_conn.js"

export async function connection_test() {
    try {
    const data = await connect()

        if (typeof data === 'object' && data != null && Object.entries(data).length > 0 ) {
            return `Conexion a mongo realizada con exito`
        } else {
            return `A ocurrido un error en la conexion a mongo` 
        }

    } catch(ex) {
        console.error(ex)
    }
}