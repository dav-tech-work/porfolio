// OBJETOS

let alumnos = ["Anna", "Pau", "Miki"]
let apellidos = ["Pou", "Mouse"]

// nombre
// apellido
// fechaNacimiento
// distritoPostal

let objetoAlumno = {} // Object()
objetoAlumno["nombre"] = "Anna Maria"
objetoAlumno["apellido"] = "Pou"
objetoAlumno["fecha de Nacimiento"] = "2000-03-12"
objetoAlumno["distritoPostal"] = "08001"

console.log(objetoAlumno);

console.log(`El nombre del alumno es ${objetoAlumno["nombre"]}`);
objetoAlumno["nombre"] = "Marta"
console.log(`El nombre del alumno es ${objetoAlumno["nombre"]}`);

let objetoAlumno2 = {nombre : "Marco", apellido : "Polo", fechaNacimiento : "1254-09-15", distritoPostal : "30100"  }

let listaAlumnos = [objetoAlumno, objetoAlumno2] // listaAlumnos[i]

for (let i = 0; i < listaAlumnos.length; i++) {
    console.log( `El alumno se llama ${listaAlumnos[i]['nombre']}`);
    console.log( `El alumno se llama ${listaAlumnos[i].nombre}`);
}