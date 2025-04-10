/*
Saludo

Vamos a partir de una hora definida (de 0 a 23)
const hora = 8

Si la hora está entre las 7 y las 13 ( las dos incluidas) diremos "Buenos días"
Si está entre las 14 y las 20 diremos "Buenas tardes"
Y en los demás casos diremos "Buenas noches"
*/

const hora = 8 

if (hora < 0) {
    console.log("Esta hora no existe");
} else if (hora < 7 ) {
    console.log("Buenas noches");
} else if (hora < 14 ) {
    console.log("Buenas días");
} else if (hora <= 20 ) {
    console.log("Buenas tardes");
} else if (hora <= 23 ) {
    console.log("Buenas noches");
} else {
    console.log("Esta hora no existe");
}