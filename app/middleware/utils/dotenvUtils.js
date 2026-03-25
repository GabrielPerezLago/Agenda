import dotenv from 'dotenv'

export default function getDataToEnv(param) {
    dotenv.config({quiet: true})
    return process.env[param]
}