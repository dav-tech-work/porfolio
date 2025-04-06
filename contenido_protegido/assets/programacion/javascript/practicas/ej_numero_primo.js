/*
Dado un número:
const numero = 12

Indicar si es primo o no
    -- Si lo es: "El numero X es primo"
    -- Si no lo es : "El número X no es primo"

Un número primo es un número entero que sólo es divisible por sí mismo o 1
Por defecto ni 0, ni 1 se consideran primos
El primer número primo es 2 

*/

const numero = 11
let esPrimo = true

for (let i = 2; i < numero; i++ ) {
    if (numero % i == 0) {
        console.log( `El numero ${numero} no es primo`);
        esPrimo = false
        break
    }
}

if (esPrimo) {
    console.log( `El numero ${numero} es primo`);
}
