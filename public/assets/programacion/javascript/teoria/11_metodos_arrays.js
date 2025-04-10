// MÉTODOS DE ARRAYS

let arrayFrutas = ["kiwi", "pera", "piña", "manzana"]

arrayFrutas[3] = "naranja"
console.log(arrayFrutas);


console.log(typeof arrayFrutas);

// Saber cuantos elementos hay en el array
console.log(arrayFrutas.length);

// Añadir un elemento al final
arrayFrutas.push("mandarina")

let arrayFrutas2 = ["melón", "cereza"]

let arrayFrutasNew = arrayFrutas.concat(arrayFrutas2)

console.log(arrayFrutasNew);

// Quitar el elemento del final
let ultimaFruta = arrayFrutasNew.pop()
console.log(arrayFrutasNew);
console.log(ultimaFruta);

// Añadir elementos al principio
arrayFrutasNew.unshift("sandía")
console.log(arrayFrutasNew);

// Quitar el primer elemento
let primeraFruta = arrayFrutasNew.shift()
console.log(arrayFrutasNew);
console.log(primeraFruta);

// Invertir el orden
console.log(arrayFrutasNew.reverse());

// Pasar el array a string
let string1 = arrayFrutasNew.toString()
console.log(string1);
let string2 = arrayFrutasNew.join(" - ")
console.log(string2);

console.log(("Anna" < "Maria"));
console.log(("maria" < "Marta"));

// Ordenar los valores del array
arrayFrutasNew.sort() 
console.log(arrayFrutasNew);