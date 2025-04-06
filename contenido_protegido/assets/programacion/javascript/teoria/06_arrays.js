// ARRAYS
// Los arrays son una estructura de datos que nos permite almacenar varios valores en una sola variable.
// Se crean utilizando corchetes [] y separando los valores por comas.

let frutas = [1,1.2,"hola",true,[4,6,7]]; // Arrays pueden contener cualquier tipo de dato
console.log(frutas);
frutas = ["kiwi", "pera", "fresa","pomelo"] // El array es una variable que contiene varios valores y estos valores se pueden modificar
console.log(frutas);
                    //    0       1        2        3
// El tamaño de un array. En python era el len(lista)
let arraySize = frutas.length // es el tamaño
console.log(arraySize);

// Acceder a un elemento de un array y modificarlo
frutas[3] = "limon"; // Modificar un elemento del array
frutas[frutas.length - 2] = "naranja"; // Modificar un elemento del array
console.log(frutas); 

// Como añadir un elemento al final de un array: push(Elemento a añadir)
frutas.push("mandarina");
console.log(frutas);
// Como añadir un elemento al principio de un array: unshift(Elemento a añadir)
frutas.unshift("sandia")
console.log(frutas);

// Como eliminar el ultimo elemento de un array: pop()
let frutaEliminada = frutas.pop();
console.log(frutaEliminada);
console.log(frutas);
// Como eliminar el primer elemento de un array: shift()
frutaEliminada = frutas.shift();
console.log(frutaEliminada);
console.log(frutas);


// Pasar Arry a String
console.log(frutas.toString()); // Se pasa a string
console.log(frutas); // El array original no se modifica
console.log(frutas.join(" | ")); // Se puede pasar a string y se puede separar por un caracter o lo que uno quiera

// Obtencion posicion de un elemento en un array: index(Elemento a buscar)
console.log(frutas.indexOf("kiwi")); // Devuelve la posicion del elemento en el array
console.log(frutas.indexOf("manzana")); // Si no existe el elemento devuelve -1 solo muestra la primera ocurrencia
frutas.push("pera");
console.log(frutas);
console.log(frutas.indexOf("pera")); // Devuelve la posicion del elemento en el array 
console.log(frutas.lastIndexOf("pera")); // Devuelve la posicion del elemento en el array pero la ultima ocurrencia
console.log(frutas.at(-1)); // Devuelve el ultimo elemento del array
console.log(frutas.at(-2)); // Devuelve el penultimo elemento del array
console.log(frutas[frutas.length - 2]); // Devuelve el penultimo elemento del array

// Como invertir la posicion de los elementos de un array: reverse()
frutas.reverse(); // modifica el array original
console.log(frutas);
let arrayInvertido = frutas.toReversed() // modifica el array original pero lo guarda en otra variable
console.log(frutas);
console.log(arrayInvertido);

// Cortar el Array: slice(posicionInicial, posicionFinal) sirver para obtener datos de un array
let frutasCortadas = frutas.slice(1,3); // Devuelve un nuevo array con los elementos entre las posiciones 1 y 3
console.log(frutasCortadas);
console.log(frutas); // El array original no se modifica 

// Destructuring
let [fruta1, fruta2, fruta3, fruta4, fruta5] = frutas
console.log(fruta1);

// Ordenar un array 
frutas.sort() // Modifica el array original
console.log(frutas);
let frutasOrdenadas = frutas.toSorted() // Guarda en un array nuevo
console.log(frutasOrdenadas);