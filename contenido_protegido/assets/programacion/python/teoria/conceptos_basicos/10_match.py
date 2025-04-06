#Match = SWITCH
#

mes = "Enero"

match mes:  #segun el valor que tenga mes haremos algo
    case "Enero":
        print("Iré a NY")
    case "Febrero":
        print("Iré a Paris")
    case "Marzo" | "Abril" | "Mayo":                 #case puede absorver varios valores
        print("Iré a Egipto")                        #no hay default pero hay (case _ :), se ejecuta cuando no es ninguna de las otras, es como el else en if/else
    case _ :
        print("Nose donde iré")


#import os
#os.system("cls")

try:                                    #Porque se puede roducir una excepcion a causa del input del usuario
    n1 = float(input("numero 1? "))     #con float() aqui forzamos error si no se introducen numeros y lidiamos con ellos con los except
    n2 = float(input("numero 2? "))     #
    op = input("que operacion quieres hacer? operaciones disponibles:\nsuma\nresta\nmulti (multiplicacion)\ndivision\nexp (exponencial)\ndiv_ent (division entera)\nmodulo\n:")
    
    match op:
        case "suma":                            #operaciones
            print(f"{n1} + {n2} = {n1+n2}")
        case "resta":
            print(f"{n1} - {n2} = {n1-n2}")
        case "multi":
            print(f"{n1} * {n2} = {n1*n2}")
        case "division":
            print(f"{n1} / {n2} = {n1/n2}")
        case "exp":
            print(f"{n1} ^ {n2} = {n1**n2}")
        case "div_ent":
            print(f"{n1} // {n2} = {n1//n2}")   #aqui falta para no dividir por 0
        case "modulo":
            print(f"{n1} % {n2} = {n1%n2}")     #aqui falta para no dividir por 0........ con excepciones te ahorras 3 if/else 
        case _ :
            print("ERROR: operacion no reconocida")
except ValueError:                                  #si se pone un try hay que poner al menos un except
    print("tienes que introducir un numero valido en cifras")
except ZeroDivisionError:
    print("no se puede dividir por 0")


#Ejercicio: 
#Preguntar al ususario que dia de la semana es (lunes, martes...)
#lunes: "Toca sistemas"
#Martes, miercoles, jueves o viernes: "Toca python"
#Sabado, Domingo: "Es fin de semana"
#Otra cosa: "Creo que estas confundido"


dia = input("que dia es? ")
dia = dia.lower()                           #porque los case son todos en minuscula, por si el usuario introduce alguna mayuscula
match dia:
    case "lunes" :
        print("toca sistemas")
    case "martes"|"miercoles"|"miércoles"|"jueves"|"viernes" :
        print("toca python")
    case "sabado"|"domingo"|"sábado":
        print("toca descansar")
    case _ :
        print("creo que estas confundido")

#print("solucion 3")
try:
    respuesta = input("Indique la operacion a realizar:\nEjemplo: 10, 5, +\n").split(", ")
    print(respuesta)
    n1 = float(respuesta[0])
    n2 = float(respuesta[1])
    op = respuesta[2]
    
    match op:
        case "+"|"-"|"*"|"/"|"**"|"//"|"%":
            print(eval(f"{n1}{op}{n2}"))    #eval parte de un string i si contiene operaciones matematicas las va a ejecutar
            
        case _ :
            print("operacion desconocida, revisa la entrada de datos")
except ValueError:                                  
    print("tienes que introducir un numero valido en cifras")
except ZeroDivisionError:
    print("no se puede dividir por 0")

print(eval("1 + 2"))    #3


#Ejercicio PALINDROMOS
#obviar/ignorar mayusculas y espacios
#que el ususario pueda escribir algo y comprobar si es palindromo

pal=input("Escribe una frase: ")
pal=pal.lower()         #pasa a minusculas 
pal=pal.strip()         #quita esacios exteriores (____de____)
pal=pal.split(" ")      #quitas los espacios 
pal="".join(pal)        #vuelves recomponer la frase(string) sin espacios
print(pal)
palneg=pal[::-1]        #invierte la frase
print(palneg)
if pal==palneg:
    print("es un plaindromo")
else:
    print("no es un palindromo")

#pregunta un numero y que te diga si es par o impar
num=float(input("numero? "))

if num % 2 == 0:
    print("es par")
else:
    print("no es par")
