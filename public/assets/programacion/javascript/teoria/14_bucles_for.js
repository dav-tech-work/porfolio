let array = [1, 2, 3, 4, 5]

let objeto = {nombre : "Peter", apellido :  "Parker"}

// Bucle for of
for (numero of array) {
    console.log(numero);
}

let texto = "Abracadabra"
for (letra of texto) {
    letra = letra.toLowerCase()    
    if (letra == "r") {
        continue
    }
    console.log(letra);
}

for (key in objeto) {
    console.log(key, objeto[key]);
}
