import MySqlConnection from "../../mysql/mysql_conn.js"
const SELECT_ID_CONTACTO = `SELECT ID FROM CONTACTO`
const SELECT_CONTACTOS = `SELECT NOMBRE, APELLIDOS, EMAIL, TELEFONO, DIRECCION FROM CONTACTO`
const INSERT_CONTACTO = 'INSERT INTO CONTACTO ( NOMBRE, APELLIDOS, EMAIL, TELEFONO, DIRECCION) VALUES (?, ?, ?, ?, ?)'
const DELETE_CONTACTO = `DELETE FROM CONTACTO WHERE`

export default async function MySqlCliContactos() {
    return {
        async getContactos() {
           try {
            const [contactos] = await (await MySqlConnection()).query(SELECT_CONTACTOS)
            return contactos
           } catch(ex) {
            console.error(ex)
           } 
        },

        async createContactoSql(arrParams) {
            try {

                const [contacto] = await (await MySqlConnection()).execute(
                    INSERT_CONTACTO,
                    arrParams
                )
                return contacto.affectedRows == 1 ? 'Se ha gaurdado el contacto en tu agenda' : 'No ha sido posible guardar el contacto en tu agenda'
            } catch (ex) {
                console.error(ex)
            }
        },
        async deleteContacto(objParams) {
            try {
                let query = DELETE_CONTACTO + " ID = ? "
                let id;
                if (Object.keys(objParams).includes('nombre')){
                    id = await findByName(objParams.nombre)
                } else if (Object.keys(objParams).includes('telefono')) {
                    id = await findByNumero(objParams.telefono)
                }
                
                const [contacto] = await (await MySqlConnection()).query(
                    query,
                    [id.ID]
                )

                return contacto.affectedRows != 0 ? true: false
            } catch(ex) {
                console.error(ex)
            }
        },
        async findByCriteria(objParams){
            let query = SELECT_CONTACTOS
            let arrParams = []
            Object.entries(objParams).forEach(([key, value]) => {
                if (key == 'nombre') {
                    arrParams.push(' NOMBRE = ? ')
                } else if (key == 'email') {
                    arrParams.push(' EMAIL = ? ')
                } else if (key == 'telefono') {
                    arrParams.push(' TELEFONO = ? ')
                }
            })

            const values = arrParams.join(' AND ')

            query += ' WHERE ' + values

            const [contacto] = await (await MySqlConnection()).execute(query , Object.values(objParams))
            return contacto

        },
        async isExistEmail(email) {
            try {
                let query = SELECT_ID_CONTACTO + ' WHERE EMAIL = ? '
                const [contacto] = await (await MySqlConnection()).execute(query, [email])
                return contacto.length > 0 ? true : false
            } catch(ex) {
                console.error(ex)
            }    
        },
        async isExistTelefono(tlf) {
            try {
                const [contacto] = await findByNumero(tlf)
                return contacto ? true : false
            } catch (ex) {
            }
        },
        async isExistNombre(nombre) {
            let query = SELECT_CONTACTOS + ' WHERE NOMBRE = ?'
            const [contacto] = await (await MySqlConnection()).execute(query, [nombre])
            return contacto.length ? true : false
        }
    }
}

async function findByNumero(params) {
    try {
        const query = SELECT_ID_CONTACTO + " WHERE TELEFONO = ? "
        const [contacto] = await (await MySqlConnection()).execute(query, [params])
        return contacto[0]
    } catch(ex) {
        console.error(ex)
    }
}
async function findByName(params) {
    try {
        const query = SELECT_ID_CONTACTO + " WHERE NOMBRE = ? "
        const [contacto] = await (await MySqlConnection()).execute(query, [params] )
        return contacto[0]
    } catch (ex) {
        console.error(ex)
    }
}



