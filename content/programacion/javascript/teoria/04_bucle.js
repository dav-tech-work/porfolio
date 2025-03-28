// Bucles en JavaScript
// los strings son iterables o cadenas de texto son iterables

// Bucle for clasico
const palabra = "Abracadabra";

for (let i = 0; i < palabra.length; i++) { // i < palabra.length es la condición de parada i++ es el incremento de i
    console.log(i); // i es el índice de la letra 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10
    console.log(palabra[i]); // palabra[i] es la letra en la posición i A, b, r, a, c, a, d, a, b, r, a
}

for (let i =0 ; i < palabra.length; i++) {
    if (palabra[i]== "c"){
        break;
    }
    console.log(palabra[i]); // A, b, r, a
}

for (let i =0 ; i < palabra.length; i++) {
    if (palabra[i].toLocaleLowerCase() == "a"){
        console.log(palabra[i]);
        continue;
    }
    console.log(palabra[i]); // A, b, r, a
}

// Bucle for of

for (letra of palabra) console.log(letra); // A, b, r, a, c, a, d, a, b, r, a

// Bucle while
// funciona igual que en Python
let control = true;
let i = 0;
while (control) {
    console.log("Hola");
    if (i == 3) {
        control = false;
    }
    i++ ; // i+=1; i = i + 1; son lo mismo que i++

}

// Bucle do while
// funciona igual que en Python pero se ejecuta al menos una vez aunque la condición sea falsa

let condicion = "jueves";
do { // do while se ejecuta al menos una vez aunque la condición sea falsa
    console.log("Estaria bien que fuera viernes"); // Estaria bien que fuera viernes
} while (condicion == "miercoles"); // condicion es jueves