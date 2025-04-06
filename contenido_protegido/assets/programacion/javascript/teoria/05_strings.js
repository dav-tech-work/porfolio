// Strings en JavaScript

let palabra = "Abracadabra";

// metodos de js para strings
console.log(palabra.length); // 11 ==> obtener la longitud de la cadena
// at(posición) devuelve el caracter en la posición indicada
console.log(palabra[3]); // a ==> obtener el caracter en la posición 3
console.log(palabra.at(-2)) // r ==> obtener el caracter en la posición -2 (empezando por el final)
console.log(palabra.at(3)); // a ==> obtener el caracter en la posición 3 (empezando por el principio)

// Metodos para pasar el texto a mayúsculas o minúsculas
let palabraMays = console.log(palabra.toLocaleUpperCase()); // ABRACADABRA ==> pasar a mayúsculas guardando en una variable
palabra = palabra.toLocaleUpperCase(); // abracadabra ==> pasar a Mayusculas y guardar en la misma variable
console.log(palabra); // abracadabra
palabra = palabra.toLocaleLowerCase(); // ABRACADABRA ==> pasar a minusculas y guardar en la misma variable
console.log(palabra); // abracadabra

// trim() elimina los espacios en blanco al principio y al final de la cadena
let palabra2 = "        " + palabra + "        ";
console.log(palabra2.length); // 27 ==> longitud de la cadena con espacios en blanco al principio y al final
console.log(palabra2.trim()); // abracadabra ==> eliminar los espacios en blanco al principio y al final de la cadena

// replace("quieres cambiar", "lo que pones" ) reemplaza una cadena por otra cadena
console.log(palabra.replace("a", "o")); // obracodobra ==> reemplazar la primera a por o
console.log(palabra.replaceAll("a", "o")); // obracodobro ==> reemplazar todas las a por o

let frase = "Como no estudies javascript vas a suspender";

// starsWith("cadena") devuelve true si la cadena empieza con la cadena indicada y false si no empieza con la cadena indicada
console.log(frase.startsWith("Como")); // true ==> la cadena empieza con Como
console.log(frase.startsWith("como")); // false ==> la cadena no empieza con como

// endsWith("cadena") devuelve true si la cadena termina con la cadena indicada y false si no termina con la cadena indicada
console.log(frase.endsWith("suspender")); // true ==> la cadena termina con suspender
console.log(frase.endsWith("rir")); // false ==> la cadena no termina con suspender.

// slice(inicio, fin) devuelve una subcadena desde la posición inicio hasta la posición fin
console.log(palabra.slice(1)); // bracadabra ==> subcadena desde la posición 1 hasta el final
console.log(palabra.slice(1, 4)); // bra ==> subcadena desde la posición 1 hasta la posición 4
console.log(palabra.slice(-4)); // abra ==> subcadena desde la posición -4 hasta el final
console.log(palabra.slice(-4, -1)); // abr ==> subcadena desde la posición -4 hasta la posición -1

// split("separador") divide la cadena en un array de subcadenas separadas por el separador
console.log(frase.split(" ")); // ["Como", "no", "estudies", "javascript", "vas", "a", "suspender"] ==> dividir la cadena en un array de subcadenas separadas por el espacio
let lista = [] // array vacío para guardar las palabras de la frase