/* Variables Javascript */

var numero = 12 
console.log(numero, typeof(numero))
numero = 5.5
console.log(numero, typeof(numero))
numero = "uno"
numero = "5.5"
numero = '12'
// console.log(numero, typeof(numero))

let num1 = 1
let num2 = 2

const PI = 3.1416
// PI = 6.28
console.log(PI)

// Variable tipo boolean 
let llueve = true // false

if (llueve) {
    let num1 = 100
    console.log("Está lloviendo. Toma el paraguas")
    console.log(num1)
    console.log(numero)
    numero = 45000
} else {
    console.log("No llueve")
}

console.log(num1)
console.log(numero)

let texto = "hola"
texto = "adiós"

// Forma recomendada de escribir una variable con JS (camel case)
let diaSemana = "jueves" 
let dia_alternativo = "viernes" // Este es snake case (Python)

if (diaSemana == "sabado") {
    console.log("Estamos de fin de semana")
} else if (diaSemana == "jueves") {
    console.log("Día de paella")
} else if (diaSemana == "domingo") {
    console.log("Estamos de fin de semana")
} else {
    console.log("No es ni sabado ni domingo ni jueves")
}
// } else {
//     console.log("Toca clase")
// }
num2 = 0
console.log(num1 + num2)
console.log(num1 - num2)
console.log(num1 * num2)
console.log(num1 / num2)
