import { getContactosMongoTest, mongoConnTest } from "./mongo_test.js"
import { mysqlConnTest } from "./mysql_test.js";

async function main() {
    const mongoTest = await mongoConnTest()
    const mysqlTest = await mysqlConnTest()
    const contactosMongo = await getContactosMongoTest()

    console.log(mongoTest)
    console.log(mysqlTest)
    console.log(contactosMongo)

    process.exit(1)
}

main()