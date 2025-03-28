// MÉTODOS DE STRINGS

let string = "esto es un string un poco largo"


// string = string.toLocaleUpperCase()
// Pasar todo a mayúsculas
console.log(string.toLocaleUpperCase());
// console.log(string);

// Pasar todo a minúsculas
console.log(string.toLocaleLowerCase());

// Obtener el tamaño de la cadena
console.log(string.length);

// Obtener la posición del primer valor designado
console.log(string.indexOf("es"));

// Obtener la posición del último valor designado
console.log(string.lastIndexOf("o"));

// Cortar la cadena por posicion
console.log(string.slice(0,4));
console.log(string.substr(0,4));

// Pasar la cadena a array
console.log(string.split(" "));

// Sustituir valores
console.log(string.replace("o", "a"));
console.log(string.replaceAll("o", "a"));

// Saber si en el texto hay determinado valor
console.log(string.includes("str"));
console.log(string.includes("bool"));

// Saber si la cadena empieza por determinado valor
console.log(string.startsWith("esto"));
console.log(string.startsWith("Esto"));

// Saber si la cadena acaba por determinado valor
console.log(string.endsWith("esto"));
console.log(string.endsWith("largo"));

// Invertir la cadena de texto
const textoInvertido = string.split("").reverse().join("")
console.log(textoInvertido);