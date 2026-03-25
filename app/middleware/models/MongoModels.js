import MongoConnection from "../../mongo/mongo_conn.js";

export default async function MongoContactosCli() {
    return { 
        async getContactos() {
            try {
                const collection = await MongoConnection()
                const contactos = await collection.find({}).toArray()
                return contactos
            } catch(ex) {
                return 100;
            }
        },

        async findByCriteria(params){
            try {
                const collection = await MongoConnection()
                const contactos = await collection.find(params).toArray()
                return contactos
            } catch (ex) {
                return 101;
            }
        },
        
        async createContacto(params) {
            try {
                if (typeof params !== "object") {
                    return
                }

                const collection = await MongoConnection()
                const create = await collection.insertOne(params)

                const contacto = await collection.findOne({_id: create.insertedId})
                return contacto
            } catch(ex) {
                console.log(ex)
            }
        },

        async deleteContactos(contactoParams) {
            try {
                const collection = await  MongoConnection()
                const del = await collection.deleteOne(contactoParams)

                if (del.deletedCount < 1) {
                    return false
                } else  {
                    return true 
                }
            } catch (ex) {
                console.error(ex)
            }
        }
    }
}



