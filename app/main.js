import prompt from 'prompt-sync'
import { createContactos, getContactos } from './middleware/controllers/MongoControllers.js'


async function main() {
    const input = prompt()

    console.log('************************')
    console.log('******** Agenda ********')
    console.log('************************')

    console.log('Bienvendo a tu Ajenda')
    console.log()
    console.log()
    const db = input('Antes con que base de datos deseas trabajar ? (m: Mongo, s: Mysql) ').trim()
    
    console.log()
    console.log()
    db == 'm' ? console.log('Has elejido mongo') : console.log('Has elegido Mysql') 

    while(true) {
        console.log(' ** Tu Agenda de Contactos **')
        console.log(' * Funciones *')
        console.log('Lista de contactos: L')
        console.log('Añadir contacto: + ')
        console.log('Eliminar contacto: - ')
        console.log('Buscar: B')
        console.log('Salir: S')
        const doing = input('Dime que quieres hacer ?: ')

        if (doing.toString().toLowerCase() == 'l') {
            console.log(await getContactos())   
        } else if (doing == '+') {
            let ex = true 

            while(ex) {
                const tlf = input('Inserta el numero de télefono (Debe llevar prefijo):  ')
                const email = input('Inserta email (No puede existir):  ')
                const nombre = input('Inserta el nombre:  ')
                const apellidos = input('Inserta los apellidos:  ')

                //direccion
                const numero = input('Piso o Numero: ')
                const calle = input('Calle: ')
                const local = input('Localidad: ')
                const prov = input('Provincia: ')
                const pais = input ('País: ')

                const direccion = [numero, calle, local, prov, pais].join(', ')

                const contacto = db == 'm' ? await createContactos(nombre, apellidos, email, tlf, direccion): false  

                if (typeof contacto === 'object' && Object.keys(contacto).includes('error')) {
                    var data = Object.values(contacto).map( (value) =>  [value])
                    data.shift()
                    data = data.join(', ')

                    console.log()
                    console.log(data)
                    console.log()
                } else {
                    console.log()
                    console.log(contacto)
                    console.log()
                }

                const exitt = input('Deseas añadir otro contacto ? (Si : s, No: n): ')

                if(exitt == 'n') ex = false 
            }
        } else if (doing == '-') {

        } else if (doing.toLocaleLowerCase() == 's') {
            process.exit(1)
        }

    } 
}


main()