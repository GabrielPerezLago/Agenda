import { createContactoMongoTest, deleteContactoMongoTest, getContactosMongoTest, mongoConnTest } from "./mongo_test.js"


async function main() {
    const mongoTest = await mongoConnTest()
    
    const createdMongo = await createContactoMongoTest('test', 'test test', 'test@example.com', '+34999000777', 'test, test, test')
    const contactosMongo = await getContactosMongoTest()


    // const mysqlTest = await mysqlConnTest()
    
    console.log(mongoTest)
    console.log(createdMongo)
    // console.log(mysqlTest)
    console.log(contactosMongo)
    
    const delMongoTest = await deleteContactoMongoTest('+34999000777')
    console.log(delMongoTest)
    process.exit(1)
}

main()