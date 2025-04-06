/*
ARRAYS = LISTAS

*/

const dia = "viernes"
let miPrimerArray = [1, 3.5, "hola", true, dia]
//                   0   1     2      3     4
console.log(miPrimerArray);
console.log(miPrimerArray[5]);

const longitudArray = miPrimerArray.length
console.log(longitudArray);
console.log(miPrimerArray[miPrimerArray.length -1 ]);

console.log(miPrimerArray.at(-1));

miPrimerArray[0] = 2
console.log(miPrimerArray);