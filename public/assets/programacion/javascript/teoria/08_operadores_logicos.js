/*
OPERADORES LÓGICOS

Y = and --> &&
O = or --> ||

*/

const hora = 8 

if ( (hora < 0) || (hora > 23) ) {
    console.log("Esta hora no existe");
} else if (hora >= 7 && hora <= 13) {
    console.log("Buenas días");
} else if (hora > 13 && hora < 20 ) {
    console.log("Buenas tardes");
} else {
    console.log("Buenas noches");
}

// Precedencia de los operadores

let operacion = (1 + 2) - 3 * 4 / 5 // () * / * -