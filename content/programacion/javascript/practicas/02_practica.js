// Ejercicios de práctica
// Contar letras

/* Vamos a tener una palabra y una letra hay que mostrar un mensaje
indicando cuantas veces aparece esta letra. 
Por ejemplo:
La letra "a" aparece 2 veces en la palabra "Marta"
La letra "r" aparece 1 vez en la palabra "Marta"
La letra "z" no esta en la palabra "Marta"
*/

// const palabra = "Marta";
// const letra = "z";
// let contador = 0;
// for (caracter of palabra){
//     console.log(caracter);
//     caracter = caracter.toLowerCase();
//     if (caracter == letra){
//         contador += 1;
//         console.log(contador);

//     }
// }
// if (contador == 0){
//     console.log(`La letra ${letra} no esta en la palabra ${palabra}`);   
// } else if (contador == 1) {
//     console.log(`La letra ${letra} aparece 1 vez en la palabra ${palabra}`);    
// } else {
//     console.log(`La letra ${letra} aparece ${contador} veces en la palabra ${palabra}`);
// }

/* Vamos a tener una frase
Por ejemplo:
Mañana sera viernes y aunque va a llover sera un dia maravilloso
Hay que mostrar cuantas palabras contienen una letra determinada*/

// const frase = "Mañana sera viernes y aunque va a llover sera un dia maravilloso"
// const letra = "a"
// let contador= 0
// let listaFrase = frase.split(" ")
// console.log(listaFrase);

// for (palabra of listaFrase){
//     for (caracter of palabra){
//         if (caracter == letra);
//         contador += 1 ;
//         break
        
//     }
// }
// console.log(contador);

// for (palabra of listaFrase){
//     if (palabra.includes(letra)) contador++
// }
// console.log(contador)
// let contadorLetra = 0
// let listaPalabras 
// let contadorPalabras = 0
// for (palabra of listaFrase ){
//     for (caracter of palabra){
//         console.log(caracter);
//         caracter = caracter.toLowerCase();
//         if (caracter == letra){
//             contador +=1;
//             listaPalabras = palabra   
//         }for (listaPalabras >= palabra){
//             contadorPalabras +=1;
//             console.log(palabra);
//         }
//     }
// }


/* Vamos a trabajar para un comercio que vende toda clase de articulos,
desde los mas caros a los mas baratos. El cambio se va a devolver en metalico,
segun las siguientes reglas:
- Tienen que ser de modo exacto (en metalico)
- Tienen que ser usando la minima cantidad de billetes y monedas posibles*/

let cambio = 457.28;

const money = [500, 200, 100, 50, 20, 10, 5, 2, 1, 0.5, 0.2, 0.1, 0.05, 0.02, 0.01,];
let objetoCambio = {}; // 200: 2 , 

// for (let i = 0; i < moneyEuros.length; i++) {
//     let money = moneyEuros[i];
//     if (cambio >= money) {
//         let temp = parseInt(cambio / money);
//         resultado[money] = temp;
//         cambio = (cambio - (temp * money)).toFixed(2);
//         cambio = parseFloat(cambio); // Convertir de nuevo a número
//     }
// }

// console.log("Cambio devuelto:");
// for (let i = 0; i < moneyEuros.length; i++) {
//     let money = moneyEuros[i];
//     if (resultado[money]) {
//         console.log(resultado[money] + " x " + money + "€");
//     }
// }

// Solucion Ferran
let parcialCambio = 0
for (tipoMoney of money){
    let cantidadMoney = parseInt(Math.round(cambio/tipoMoney))
    if (cantidadMoney == 0) continue
    else{
        parcialCambio += cantidadMoney * tipoMoney
        objetoCambio[tipoMoney] = cantidadMoney
        cambio = cambio % tipoMoney
        console.log(cambio);
    }
}
console.log(objetoCambio);