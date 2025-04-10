const diaSemana = "domingo"

switch (diaSemana) {
    case "lunes" :
    case "martes" : 
    case "miercoles" :
    case "jueves":
    case "viernes":
        console.log(diaSemana, "no es festivo");
        break 
    case "sabado":
    case "domingo":
        console.log(diaSemana, "es fin de semana");
        break
    default :
        console.log(diaSemana, "día desconocido"); 
}