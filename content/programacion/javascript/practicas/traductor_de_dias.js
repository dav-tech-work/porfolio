// TRADUCTOR DE DÍAS 

const dias = ["lunes", "martes", "miércoles", "jueves", "viernes", "sábado", "domingo"]

const days = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"]

const diaElegido = "sábado" // tuesday

for (let i = 0; i < dias.length; i++) {
    if (dias[i] == diaElegido) {
        console.log(days[i]);
        break
    }
}

console.log(dias.indexOf("domingo"));
console.log(days[dias.indexOf("domingo")]);