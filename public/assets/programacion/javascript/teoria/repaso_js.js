let num = 2; // es una variable de tipo number
let saludo = "hola"; // es una variable de tipo string
let booleano = true; // es una variable de tipo boolean
console.log(saludo + num); // es una concatenación de dos variables
console.log(num + saludo); // es una concatenación de dos variables
let palabraConcatenada = "         " + "con" + "ca" + "te" + "nar"; // es una concatenación de strings
let numString = "5"; // es una variable de tipo string
console.log(numString - num); // es una resta de dos variables

console.log(palabraConcatenada); // es una impresión de la variable palabraConcatenada
palabraConcatenada[0] = "C"; // es una modificación de la variable palabraConcatenada
console.log(palabraConcatenada); // es una impresión de la variable palabraConcatenada

// Estructura del for:
// for (inicio; final; paso) { bloque de código a utilizar }
for (let i = 0; i < palabraConcatenada.length; i++) {   // es un ciclo for que recorre la variable palabraConcatenada
  console.log(`${i}. ${palabraConcatenada[i]}`); // es una impresión de la variable palabraConcatenada
}

console.log(palabraConcatenada.toLocaleUpperCase()); // es una impresión de la variable palabraConcatenada en mayúsculas
console.log(palabraConcatenada.toLocaleLowerCase()); // es una impresión de la variable palabraConcatenada en minúsculas
console.log("La variable palabraConcatenda mide", palabraConcatenada.length); // es una impresión de la longitud de la variable palabraConcatenada
palabraConcatenada = palabraConcatenada.trim(); // es una modificación de la variable palabraConcatenada
console.log("La variable palabraConcatenda mide", palabraConcatenada.length); // es una impresión de la longitud de la variable palabraConcatenada
let inicial = palabraConcatenada.at(0); // es una variable que almacena la primera letra de la variable palabraConcatenada
console.log(inicial); // es una impresión de la variable inicial

let lista = [1, "w", [4, "t", palabraConcatenada], false]; // es una lista de variables de diferentes tipos
console.log(lista); // es una impresión de la variable lista
 
for (let i = 0; i < lista.length; i++) { // es un ciclo for que recorre la variable lista
  console.log(typeof lista[i]); // es una impresión del tipo de variable de la lista
}

let texto = "Hoy es lunes".split(" "); // es una variable que almacena la variable texto dividida por espacios
console.log(texto); // es una impresión de la variable texto

console.log(palabraConcatenada.slice(1, 3)); // es una impresión de la variable palabraConcatenada desde la posición 1 a la 3

let nombre = "    mArIA De LoS angELes     "; // Maria de los Angeles
// nombre = "     jOsE mArIA de los saNTOs peREz                   "

nombre = nombre.trim(); // Elimina los espacios al inicio y al final
console.log(nombre); // es una impresión de la variable nombre
nombre = nombre.split(" "); // es una variable que almacena la variable nombre dividida por espacios
console.log(nombre); // es una impresión de la variable nombre

let nombreCorregido = ""; // es una variable de tipo string vacía
let listaPalabrasNombre = [];   // es una lista vacía

for (let i = 0; i < nombre.length; i++) { // es un ciclo for que recorre la variable nombre
  // Obtener la inicial y pasarla a mayúsculas
  let inicial = nombre[i].at(0).toLocaleUpperCase(); // es una variable que almacena la primera letra de la variable nombre en mayúsculas
  console.log(inicial);
  // Obtenemos el resto de las letras
  let restoNombre = nombre[i].slice(1).toLocaleLowerCase(); // es una variable que almacena el resto de la variable nombre en minúsculas
  console.log(restoNombre);
  // Reconstruir el nombre
  let nombreFinal = inicial + restoNombre; // es una variable que almacena la variable inicial y restoNombre
  console.log(nombreFinal); // es una impresión de la variable nombreFinal
  if (  // es una condición que verifica si la variable nombreFinal es igual a "De", "Los", "La", "El" o "Las"
    nombreFinal == "De" ||
    nombreFinal == "Los" ||
    nombreFinal == "La" ||
    nombreFinal == "El" ||
    nombreFinal == "Las"
  ) {
    nombreFinal = nombreFinal.toLocaleLowerCase();  // es una variable que almacena la variable nombreFinal en minúsculas
  }
  console.log(nombreFinal); // es una impresión de la variable nombreFinal

  listaPalabrasNombre.push(nombreFinal); // es una lista que almacena la variable nombreFinal
  console.log(listaPalabrasNombre);

  // acumular las palabras
  //   nombreCorregido += nombreFinal + " "
}
nombreCorregido = listaPalabrasNombre.join(" ");  // es una variable que almacena la variable listaPalabrasNombre unida por espacios
// nombreCorregido = listaPalabrasNombre.toString().replaceAll(",", " ")
console.log(nombreCorregido);

// nombreCorregido = nombreCorregido.trim()
// console.log(nombreCorregido);

let fecha = "9/3/2025"; // "2025-03-10" "AAAA-MM-DD"

// Separar los valores
fecha = fecha.split("/");
console.log(fecha);

for (let i = 0; i <= 1; i++) {
  if (fecha[i].length == 1) {
    fecha[i] = "0" + fecha[i];
  }
}
console.log(fecha);
fecha = fecha[2] + "-" + fecha[1] + "-" + fecha[0];
console.log(fecha);
