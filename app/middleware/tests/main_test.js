import { connection_test } from "./mongo_test.js"
import { mysqlConnTest } from "./mysql_test.js";

async function main() {
    const mongoTest = await connection_test();
    const mysqlTest = await mysqlConnTest();

    console.log(mongoTest)
    console.log(mysqlTest)

    process.exit(1)
}

main()