// Objetos
/* Son muy parecido a los diccionarios de python, se compone de una clave y un valor */

let alumno = {}
alumno["nombre"] = "Maria"
console.log(alumno); // { nombre: 'Maria' }
alumno["apellido"] = "Pi" // Añadir una clave y un valor
alumno["edad"] = 25 // Añadir una clave y un valor
console.log(alumno); // { nombre: 'Maria', apellido: 'Pi', edad: 25 }

let alumno2 = {
    nombre: "Pep",
    apellido: "Guardiola",
    edad: 55
}
alumno2.cp = "08001"; // Añadir una clave y un valor
console.log(alumno2); // { nombre: 'Pep', apellido: 'Guardiola', edad: 55 , cp: 8001}
alumno2["direccion familiar"] = "Calle Mayor 1"; // Añadir una clave y un valor
console.log(alumno2); // { nombre: 'Pep', apellido: 'Guardiola', edad: 55 , cp: 8001, direccion familiar: 'Calle Mayor 1'}
let clase = {
    alumnos: [alumno, alumno2],
    asignatura: "Programacion",
    profesor: "Ferran"
} // si los datos se van a guardar en un json de debe de poner comillas dobles en las claves y en los valores
console.log(clase); // { alumnos: [ { nombre: 'Maria', apellido: 'Pi', edad: 25 }, { nombre: 'Pep', apellido: 'Guardiola', edad: 55 } ], asignatura: 'Programacion', profesor: 'Ferran' }

// iterar sobre un objeto
for (claves in alumno) console.log(claves); // Devuelve las claves del objeto
for (claves in alumno2){
    console.log(claves, alumno2[claves]); // Devuelve las claves y los valores del objeto 
    console.log(alumno2["direccion familiar"]); // Devuelve las claves y los valores del objeto
}
