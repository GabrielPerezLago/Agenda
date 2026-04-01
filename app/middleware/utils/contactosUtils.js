export function isString(param) {
    return typeof param === 'string'
}

export function removeWhite(param) {
    return param.toString().repalce(/ /g, "")
}

export function checkAndSanitizeContactos(params) {
    let errors = { error : 'error'}
    
    Object.entries(params).forEach( ([key, value]) => {
        if (key == 'nombre') {  
            if (!isString(value)) {
                value = String(value).toLowerCase()
            }
            value = value.toLowerCase()
        }

        if (key === 'apellidos')  {
            if (!isString(value)) {
                value = String(value).toLowerCase()
            }
            value = value.toLowerCase()
        }

        if (key == 'email') {

            if (!isString(value)){
                value = String(value)
            }

            if (!value.toString().includes('@') || !value.includes('.')){
                errors['email'] = `El formato del email no es correcto`
            }

            
        }

        if (key == 'telefono') {


            if (!value.toString().includes('+')) {
                errors['telefono'] = `El telefono debe contener un prefijo inserte un peficon con un " + " `
            }

            if (!Object.keys(errors).includes('telefono')) {
                params[key] = sanitizeTelefono(value.toString())
            }
        }

        if (key == 'direccion') {
            
            if (!isString(value)){
                value = String(value)
            }

            if (!value.toString().includes(',')) {
                errors['direccion'] = `La direccion debe ir separada por comas`
            }
            
        }
    })
    return  Object.keys(errors).length > 1 ? errors : params
}

export function sanitizeTelefono(param) {
    return param.toString().match(/.{1,3}/g).join(' ')
}

