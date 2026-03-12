import prompt from 'prompt-sync'



function main() {
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
        console.log('Perfecto ya estas en tu Agenda de contactos, dime que deseas hacer?')
        
    } 
}


main()