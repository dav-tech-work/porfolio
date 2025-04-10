// FUNCIONES

function sumar(num1, num2) {
  return num1 + num2;
}

let resultado = sumar(3, 4);
console.log(resultado);
sumar(234, 567);
sumar(4566788, 98879797.889999);

let numeroString = "25";
let numeroString2 = "8";
console.log(numeroString - numeroString2);
let numeroInt = parseInt(numeroString);
let numeroResta = 8;
console.log(numeroInt - numeroResta);
// Vamos a tener dos fechas:
// Una será la de nacimiento de una persona p.e.: "13-03-2000"
// La fecha de referencia p.e.: "13-03-2025"
// La edad que tenía en esa fecha de referencia

// const  = "12-03-2026"
// const  = "13-03-2025"

function calcularEdad(fechaNacimiento, fechaReferencia) {
  // Paso 1: obtener dia, mes año de cada fecha
  const fechaNArray = fechaNacimiento.split("-");
  const fechaRArray = fechaReferencia.split("-");

  const diaFechaN = parseInt(fechaNArray[0]);
  const mesFechaN = parseInt(fechaNArray[1]);
  const anyoFechaN = parseInt(fechaNArray[2]);

  const diaFechaR = parseInt(fechaRArray[0]);
  const mesFechaR = parseInt(fechaRArray[1]);
  const anyoFechaR = parseInt(fechaRArray[2]);

  let edad = anyoFechaR - anyoFechaN;
  if (mesFechaR < mesFechaN) {
    edad -= 1;
  } else if (mesFechaN == mesFechaR && diaFechaR < diaFechaN) {
    edad -= 1;
  }

//   console.log(`Tu edad es ${edad}`);
  return edad
}

const edad1 = calcularEdad("12-03-2000", "13-03-2025")
const edad2 = calcularEdad("25-03-2010", "13-03-2025")
const edad3 = calcularEdad("06-10-1992", "13-03-2025")

console.log(edad1, edad2, edad3);

// ===============================================================
// Sintaxis alternativa 1

let restar = function (num1, num2) {
  return num1 - num2
};

console.log(restar(9, 7)); 

// ===============================================================
// Sintaxis alternativa 2 (ARROW FUNCTION)

let restar2 = (num1, num2) => {
    return num1 - num2
  };
  
console.log(restar2(9, 7)); 

// ===============================================================
// Sintaxis alternativa 3 (ARROW FUNCTION)

let restar3 = (num1, num2) => num1 - num2
  
console.log(restar3(9, 7)); 