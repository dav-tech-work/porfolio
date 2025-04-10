// BUCLE WHILE = mientras

let arrayFrutas = ["kiwi", "pera", "piña", "manzana"];

// while simple
// Sintaxis básica del while
// while (condicion) { bloque de código a ejecutar }

let i = 0;

while (i < 10) {
  console.log(i);
  i++;
}

// do { bloque de código} while (condición)
let dia = "miercoles";
do {
  console.log("Hoy es miércoles");
  dia = "martes";
} while (dia == "miercoles");

let num = 1
do {
  console.log(num);
  num++
} while (num <= 5);

let lista = [1, 2, 3]
for (let i = 0; i < lista.length; i++) {
    console.log(lista[i]);
    // i-- Esto generaría un bucle infinito
}
