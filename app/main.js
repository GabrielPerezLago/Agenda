import prompt from 'prompt-sync'
import { createContactos, deleteContato, findByCriteria, getContactos } from './middleware/controllers/MongoControllers.js'
import { delContatoSQL, findByCriteriaSQL, getContactosSql, insertContacto } from './middleware/controllers/MySqlController.js'
import { exec } from 'child_process'
import { error } from 'console'


async function main() {
    const input = prompt()


    exec('docker compose up -d || docker compose start', (error,stdout, stderr) => {
        if (error) {
            console.error(`Error: ${error.message}`)
            return
        }
        
        
    })

    console.log('************************')
    console.log('******** Agenda ********')
    console.log('************************')

    console.log('Bienvendo a tu Ajenda')
    console.log()
    console.log()
    let db

    do {
        db = input('Antes con que base de datos deseas trabajar ? (m: Mongo, s: Mysql) ').trim().toLowerCase()

        if(db != 'm' && db != 's') {
            console.log()
            console.log('El caracter insertado no es valido , por favor inserte alguno de los dstos requeridos')
            console.log()
        }
    } while(db != 'm' && db != 's')
    
    console.log()
    console.log()
    db == 'm' ? console.log('Has elejido mongo') : console.log('Has elegido Mysql') 
    console.log()
    console.log()

    while(true) {
        console.log(' ** Tu Agenda de Contactos **')
        console.log(' * Funciones *')
        console.log('Lista de contactos: L')
        console.log('Añadir contacto: + ')
        console.log('Eliminar contacto: - ')
        console.log('Buscar: B')
        console.log('Salir: S')
        const doing = input('Dime que quieres hacer ?: ')

        if (doing.toLowerCase() == 'l') {
            
            db == 'm' ? console.log(await getContactos()) : console.log(await getContactosSql())
            
        } else if (doing == '+') {
            let ex = true 

            while(ex) {
                console.log('Los capos que contengan un * son oblgatorios.')
                const tlf = input('Inserta el numero de télefono (Debe llevar prefijo) *:  ')
                const email = input('Inserta email (No puede existir)*:  ')
                const nombre = input('Inserta el nombre*:  ')
                const apellidos = input('Inserta los apellidos:  ')

                //direccion
                const numero = input('Piso o Numero: ')
                const calle = input('Calle: ')
                const local = input('Localidad: ')
                const prov = input('Provincia: ')
                const pais = input ('País: ')

                if (nombre == "" || email == "" || tlf == "") {
                    console.log()
                    console.log('Debes rellenar los campos obligatorios ')
                    console.log()
                } else {

                    const direccion = [numero, calle, local, prov, pais].join(', ')

                    const contacto = db == 'm' ? await createContactos(nombre, apellidos, email, tlf, direccion): await insertContacto(nombre, apellidos, email, tlf, direccion) 

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
                }
                const exitt = input('Deseas añadir otro contacto ? (Si : s, No: n): ')

                if(exitt == 'n') ex = false 
            }
        } else if (doing == '-') {
            console.log()
            const del = input('Inserte el nombre o el numero de telefono con prefijo (Aviso si elimina por nombre puede eliminar otro contacto de la lista) : ')
            console.log()

            let contDel

            if (del == "") {
               contDel = "El campo no puede estar vacío"
            } else {
                contDel = db == 'm' ? await deleteContato(del): await delContatoSQL(del)
            }
            console.log()
            console.log(contDel)
            console.log()
        } else if (doing.toLowerCase() === 'b') {
            

            let criteria = {}
            let exit = true
            while (exit) {
                
                const by = input('Que deseas buscar? (Nombre : n, Email: e, Telefono: t, Buscar: b) ')

                var find;
                
                switch (by) {
                    case 'n' : ( () => {
                        find = input('Inserte el nombre que desea buscar: ')
                        criteria['nombre'] = find
                    })()
                    break
                    case 'e' : (() => {
                        find = input('Inserte el email que desea buscar: ')
                        criteria['email'] = find
                    })()
                    break
                    case 't': (() => {
                        find = input('Inserte el telefono que desea busrcar(con prefijo): ')
                        criteria['telefono'] = find
                    })()
                    break
                    case 'b' : exit = false
                    break
                    default: console.log('Debes insertar unos de los paramatros requeridos gracias')
                }

                if (criteria.length > 0)  console.log(criteria)
            }

            const contactos = db == 'm' ? await findByCriteria(criteria) : await findByCriteriaSQL(criteria)
            console.log()
            console.log(contactos)
            console.log()

        } else if (doing.toLocaleLowerCase() == 's') {
            process.exit(1)
        } else {
            console.log()
            console.log('El parametro insertado no es valido , por favor inserte uno de los parametros que se indican.')
            console.log()
        }

    } 
}


main()