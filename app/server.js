import express from 'express'
import cors from 'cors'
import { exec } from 'child_process'
import MongoRouter from './routes/mongo.router.js'
import MySqlRouter from './routes/mysql.router.js'

exec('docker compose up -d || docker compose start', (error,stdout, stderr) => {
        if (error) {
            console.error(`Error: ${error.message}`)
            return
        }
})

const PORT = 3000
const app = express()
app.use(cors())
app.use(express.json())

app.use('/mongo', MongoRouter)
app.use('/mysql', MySqlRouter)

app.listen(PORT, () => {
    console.log(`Servidor corrienmdo en http://localhost:${PORT}`);
})