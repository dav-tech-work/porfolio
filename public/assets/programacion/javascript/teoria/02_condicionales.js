/* Condicionales de JavaScript */

//Python: if, elif, else
//JavaScript: if, else if, else
// hacen los mismo pero con diferente sintaxis

const edad = 17;

if (edad >= 18) {
    console.log("Eres mayor de edad");
} 
else if (edad == 17) {
    console.log("Ya te falta poco");
} 
else {
    console.log("Aun eres menor de edad");
}

let curso = "JavaScript";
let prueba = true
if (prueba) {
    let curso = "Python";
    console.log(curso);
}
console.log(curso);
curso = "PHP";
// Equivalente a: match case de Python
switch (curso) { // switch es como match en Python
    case "PHP":
        console.log("PHP? Te has vuelto loco?");
        break; // Equivalente a break de Python pero es necesario poque si no se ejecutaría el siguiente case sin importar si se cumple o no
    case "Python":
        console.log("Curso de Python");
        break;
    case "JavaScrit":
        console.log("Curso de JavaScript");
        break;
    default: // Equivalente a else de Python
        console.log("Y que estudias?");
}

const diaSemana = "miercoles";

switch (diaSemana) { // switch es como match en Python
    case "lunes": // Los case se pueden agrupar si se quiere que se ejecute el mismo código 
    case "martes":
    case "miercoles":
    case "jueves":
    case "viernes":
        console.log("Es un día laboral");
        break;
    case "sabado":
    case "domingo":
        console.log("Es un día festivo");
        break;
    default:
        console.log("No es un día de la semana");
}