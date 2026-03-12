import dotenv from 'dotenv'

export default function getDataToEnv(param) {
    dotenv.config()
    return process.env[param]
}