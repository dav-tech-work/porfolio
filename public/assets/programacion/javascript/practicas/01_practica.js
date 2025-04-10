/* Tranforma el nombre correctamente */
let nombre = "mAriA de Las merCedes y de TOdas Las SANtAs"; // Maria de las Mercedes y de Todas las Santas
let string = "";
nombre = nombre.toLowerCase();
console.log(nombre);
nombre = nombre.split(" ")
console.log(nombre);

// Solucion Ferran 
// tranformar a miniusculas Esta arriba
// Obtener las palabras Esta arriba
let nombre_corregido = ""
for (palabra of nombre){
    console.log(palabra);
    if (palabra != "de" && palabra!="la" && palabra!="las" && palabra!="un" && palabra!="una" && palabra!="y" && palabra!="los"){
        console.log(palabra);
        let inicial = palabra.at(0).toLocaleUpperCase()
        let restoNombre = palabra.slice(1)
        palabra = inicial + restoNombre
    }
    nombre_corregido += palabra + " "
}
console.log(nombre_corregido);
