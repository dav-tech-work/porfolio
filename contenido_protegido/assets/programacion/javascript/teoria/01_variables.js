// Variables

var num_1 = 1; // Declaración de variable con var
var num_1 = 2; // Reasignación de variable con var

let num_2 = 2; // Declaración de variable con let
num_2 = 3; // Reasignación de variable con let
//let num_2 = 4 // Error: num_2 ya ha sido declarada
console.log(num_2);
console.log(num_1);
const mensaje = "Es el momento del descanso"; // Declaración de constante
//mensaje = "Es el momento de trabajar"; // Error: no se puede reasignar una constante, pero no se queja en la declaración.

let num_3
console.log(typeof num_3); // undefined
num_3 = 2.5;
console.log(typeof num_3); // number

// Destructuring 
let [txt1, txt2, txt3] = ["a", "b", "c"]; // Destructuring de un array
console.log(txt1, txt2, txt3); // a b c
console.log(typeof txt1); // string

// JavaScript es un lenguaje de tipado dinámico debil (no fuerte)
let saludo = "Hola";
let num_4 = 3;
console.log(saludo + num_4); // Hola3 // Concatenación hace un casting a string directamente
console.log(num_4 * saludo); // NaN // Multiplicación no puede hacer casting a number directamente y devuelve NaN

// NOTA: En lugar de usar eval(), que es inseguro, es mejor usar alternativas seguras
// Por ejemplo, para calcular expresiones matemáticas simples:
const expresion = 4 + 5 / 9;
console.log(expresion); // 4.55555

// Si necesitas evaluar expresiones dinámicas, considera usar:
// 1. Function constructor (más seguro que eval, pero aún tiene riesgos):
// const calcular = new Function('return 4 + 5 / 9')();
// console.log(calcular);

// 2. Bibliotecas matemáticas seguras como math.js para expresiones complejas
// 3. JSON.parse para datos JSON

console.log("5"+num_4); // 53 //
console.log("5"-num_4); // 2 // Casting a number el string "5" y resta 3
console.log("5"*num_4); // 15 // Casting a number el string "5" y multiplica por 3 
console.log("5"/num_4); // 1.6666666666666667 // Casting a number el string "5" y divide por 3
console.log("5"**num_4); // 125 // Casting a number el string "5" y eleva a la 3
console.log("5"%"3"); // 2 // Casting a number el string "5" y calcula el módulo de 5 entre 3
console.log("1"==1); // true // Comparación de valor
console.log("1"===1); // false // Comparación de valor y tipo // === es más estricto que == igualdad estricta
console.log("1"!==1); // false // Comparación de valor // !== es más estricto que != desigualdad estricta

console.log(1/0); // Infinity // División por 0
console.log(-1/0); // -Infinity // División por 0