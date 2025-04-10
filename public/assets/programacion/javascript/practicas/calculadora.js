let num1 = 5
let num2 = 3
let operacion = "/"

/*
Operaciones matemáticas:
+
-
*
/
** elevar a un exponente
% módulo = resto de la división
*/

operacion = "%"

console.log(num1, operacion, num2, "=", num1% num2);

let num3 = 25

num3 = num3 + 1 // sumar un número a la variable
num3 += 1 // sumar un número a la variable
num3++ // incrementar en 1 la variable
num3-- // restar en 1 la variable

let num4 = 25
num4 = num4**0.5
console.log(num4);


operacion = "+"
switch (operacion) { // si operacion coincide con el símbolo accede al case

    case "+" :
        console.log(num1, operacion, num2, "=", num1 + num2);
        break
    case "-" :
        console.log(num1, operacion, num2, "=", num1 - num2);
}