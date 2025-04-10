// ANAGRAMAS
// Dos palabras son anagramas si utilizan 
// las mismas letras en orden diferente. Por ejemplo:
// amor ramo 

const palabra1 = "amor"
const palabra2 = "ramo"
const palabra3 = "patata"
const palabra4 = "omar"

// Obtener esta salida
// Las palabras "amor" y "ramo" son anagramas
// Las palabras "amor" y "patata" no son anagramas

let palabra2Ordenada = palabra2.split("").sort().join("")
console.log(palabra2Ordenada);
let palabra1Ordenada = palabra1.split("").sort().join("")
console.log(palabra1Ordenada);
let palabra4Ordenada = palabra4.split("").sort().join("")
console.log(palabra4Ordenada);

if (palabra1Ordenada == palabra2Ordenada) {
    console.log(`Las palabras ${palabra1} y ${palabra2} son anagramas`);
} else {
    console.log(`Las palabras ${palabra1} y ${palabra2} no son anagramas`);
}