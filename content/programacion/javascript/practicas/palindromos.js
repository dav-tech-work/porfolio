// PALÍNDROMOS
// Averiguar si un texto es palíndromo:
// -- ignorar los espacios
// -- ignorar mayúsculas/minúsculas
// -- ignorar tildes (acentos) 

let string = "   dabale arroz a la zorra el abad       "
// string = "   dabale garbanzos a la zorra el abad       "

// Texto inicial sin espacios
let stringLimpio = string.split(" ").join("")
console.log(stringLimpio);
// Lo convertimos en lista para poder darle la vuelta 
// y después otra vez en texto para compararlo con el anterior
let stringLimpio2 = stringLimpio.split("").reverse().join("")
console.log(stringLimpio2);

if (stringLimpio == stringLimpio2) {
    console.log("La frase es un palíndromo");
} else {
    console.log("La frase no es un palíndromo");
}