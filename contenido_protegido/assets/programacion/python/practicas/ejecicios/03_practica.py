# Preguntar edad Usuario
# si tiene menos de 12 años eres un/a niño/a
# si tienes menos de 18 años eres un adolescente
# si tienes menos de 30 años eres joven
# si tienes menos de 40 años eres adulto
# si tienes mas de 40 tu puedes con todo

edad = int(input("Pon tu edad ->"))  # Solicita y convierte la edad a número entero

if 0 <= edad < 12:                   # Verifica si la edad está en el rango de niño/a
    print("Eres un niño/a")
elif edad <= 18:                     # Verifica si la edad está en el rango de adolescente
    print("Eres adolescente")
elif edad <= 30:                     # Verifica si la edad está en el rango de joven
    print("Eres Joven")
elif edad <= 40:                     # Verifica si la edad está en el rango de adulto
    print("Eres adulto")
elif edad <= 120:                    # Verifica si la edad está en un rango realista
    print("Tu puedes con todo")
else:                               # Si la edad está fuera de rangos realistas
    print("Tienes 2 pies en la tumba")

# Preguntar al usuario la edad
# si tiene 0 o mas de 120: No me lo creo
# si tiene menos de 18: Aun no puedes votar, te faltan x años
# si tienes mas de 18: Puedes votar desde hace x años

edad = int(input("Pon tu edad ->"))  # Solicita y convierte la edad nuevamente

if 0 > edad:                         # Comprueba si la edad es negativa (inválida)
    print('NO me lo creo')
elif edad < 18:                      # Comprueba si es menor de edad
    print(f"Aun no puedes votar, te faltan {18 - edad} años")  # Calcula años faltantes
elif edad >= 18:                     # Comprueba si puede votar
    print("Puedes votar desde hace " + str(edad - 18) + " años")  # Calcula años con derecho a voto
elif edad >= 120:                    # Comprueba si la edad es poco realista
    print("No me lo creo")
else:                               # Caso por defecto
    pass

# Solucion ferran

mayoria_edad = 18 # Variable determinar la mayoria edad

edad = input("Porfavor indica tu edad: ") # Variable donde el usuario introduce su edad en formato string utiluzando el comando input

if not edad.isdigit(): # Comprobacion que no se ha introducido un numero entero
    print("Debes introducir un numero entero") # Imprime en pantalla el mensaje entre comillas
elif 0 >= int(edad) >= 120: # Si la edad es menos o mas de 120 int = convierte el string a entero ==> comprobacion rango de edad valido
    print("No me lo creo") # Imprime en pantalla el mensaje entre comillas
else:
    edad = int(edad)  # Convierte string en entero
    diferencia = abs(mayoria_edad - edad) # variable que hace el valor absoluto de la mayoria de edad y la edad
    if edad <  mayoria_edad:
        print(f"Aun no puedes votar, te faltan {diferencia} años")

# Pedir al usuario un numero
# Pedir otro numero
# Si no son numeros, le diremos que no se puede hacer 
# Pedir que operacion quiere hacer (7 posibilades)
    # Suma
    # resta
    # multi
    # division
    # expo
    # divi_entera
    # modulo
# Si no es ninguna de estas un mensaje de error
# Si divide por 0 tambien error

import os # importa libreria OS 
os.system("clear") # Pide realizar el comando del sistema que ponemos entre parentesis 

try:
    numero_a = float(input("Introduce un Numero: ")) # Introduccion de datos que se transforman en decimales con la funcion float()
    numero_b = float(input("Introduce un Numero: ")) # Introduccion de datos que se transforman en decimales con la funcion float()


    operacion = input("""Que operacion quieres:  
    suma
    resta
    multi
    division
    expo
    divi_entera
    modulo
    Escribe la palabra de la operacion: \n\n""") # Variable donde se solicita una introducion de datos
    
    
    #suma = "suma"
    #resta = "resta"
    #multi = "multi"
    #division = "division"
    #expo = "expo"
    #divi_entera = "divi_entera"
    #modulo = "modulo"
    if operacion == "suma": # Comparacion de si la variable operacion es igual a suma realiza la operacion de abajo
        print(f"{numero_a} + {numero_b} = {numero_a + numero_b}") # (f"{}") -> Cambia el formato de lo que hay entre corchetes a numeros  manteniendo el resto en las comillas como strings
    elif operacion == "resta": # Comparacion de si la variable operacion es igual a resta realiza la operacion de abajo
        print(f"{numero_a} - {numero_b} = {numero_a - numero_b}") # (f"{}") -> Cambia el formato de lo que hay entre corchetes a numeros  manteniendo el resto en las comillas como strings
    elif operacion == "multi": # Comparacion de si la variable operacion es igual a multi realiza la operacion de abajo
        print(f"{numero_a} * {numero_b} = {numero_a * numero_b}") # (f"{}") -> Cambia el formato de lo que hay entre corchetes a numeros  manteniendo el resto en las comillas como strings
    elif operacion == "division": # Comparacion de si la variable operacion es igual a division realiza la operacion de abajo
        print(f"{numero_a} / {numero_b} = {numero_a / numero_b}") # (f"{}") -> Cambia el formato de lo que hay entre corchetes a numeros  manteniendo el resto en las comillas como strings
    elif operacion == "divi_entera": # Comparacion de si la variable operacion es igual a division entera realiza la operacion de abajo
        print(f"{numero_a} // {numero_b} = {numero_a // numero_b}") # (f"{}") -> Cambia el formato de lo que hay entre corchetes a numeros  manteniendo el resto en las comillas como strings
    elif operacion == "expo": # Comparacion de si la variable operacion es igual a exponencial realiza la operacion de abajo
        print(f"{numero_a} ** {numero_b} = {numero_a ** numero_b}") # (f"{}") -> Cambia el formato de lo que hay entre corchetes a numeros  manteniendo el resto en las comillas como strings   
    elif operacion == "modulo": # Comparacion de si la variable operacion es igual a modulo realiza la operacion de abajo
        print(f"{numero_a} % {numero_b} ={numero_a % numero_b}") # (f"{}") -> Cambia el formato de lo que hay entre corchetes a numeros  manteniendo el resto en las comillas como strings
    else: # si no cumple con ninguno de los casos anteriores haz lo que pone
        print("No se puede hacer")
except ValueError: # ValueError indica que si el valor introducido por el usuario no es del tipo indicado de el siguiente mensaje
    print("Introduce un numero en Cifras")
except ZeroDivisionError: # ZeroDivisionError  indica que si el valor introducido por el usuario es 0 a la hora de dividir de el siguiente mensaje
    print("No se puede dividir por Cero")
finally:
    print("Resultado")


# Solulcion Ferran

num_1 = input("Escriba el primer numero -> ")
# provar "1", "1.2", "uno", "??"
if num_1.isalpha(): # Comprobacion que el dato introducido es caracter o numerico isalpha incluye caracteres y simbolos = true
    print("No se puede hacer")
else:
    print("Se puede hacer")

# Excepciones
num_1 = float(input("Escriba el primer numero -> "))
# provar "1", "1.2", "uno", "??"
if num_1.isalpha(): # Comprobacion que el dato introducido es caracter o numerico isalpha incluye caracteres y simbolos = true
    print("No se puede hacer")
else:
    print("Se puede hacer")
"""
"""
# Se puede producir una excepcion a causa de lo que introduzca el usuario:
try:
    # Pedimos los numeros
    num_1 = float(input("Introduce un numero: "))
    num_2 = float(input("Introduce un numero: "))
    print("""
    #Operaciones:
    #   suma
    #    resta
    #    multi
    #   division
    #   expo
    #   divi_entera
    #   modulo
    """)
    op = input("¿Que operacion quieres realizar?")

    if op == "suma":
        print(f"{num_1} + {num_2} = {num_1 + num_2}")
    elif op == "resta":
        print(f"{num_1} - {num_2} = {num_1 - num_2}")
    elif op == "multi":
        print(f"{num_1} * {num_2} = {num_1 * num_2}")
    elif op == "division":
        print(f"{num_1} / {num_2} = {num_1 / num_2}")
    elif op == "divi_entera":
        print(f"{num_1} // {num_2} = {num_1 // num_2}")
    elif op == "expo":
        print(f"{num_1} ** {num_2} = {num_1 ** num_2}")
    elif op == "modulo":
        print(f"{num_1} % {num_2} = {num_1 % num_2}")
except ValueError:
    print("Has de describir un numero en cifra")
except ZeroDivisionError:
    print("No se puede dividir entre cero")


# Calculadora a base de mathc

import os
os.system("clear")

try:
    numero_a = float(input("Introduce un Numero: "))
    numero_b = float(input("Introduce un Numero: "))
    print("""
    Operaciones:
        suma
        resta
        multi
        division
        expo
        divi_entera
        modulo
    """)

    op = input("¿Que operacion quieres realizar?")
    match operacion: 
        case "suma":
            print(f"{numero_a} + {numero_b} = {numero_a + numero_b}")
        case "resta":
            print(f"{numero_a} - {numero_b} = {numero_a - numero_b}")
        case "multi":
            print(f"{numero_a} * {numero_b} = {numero_a * numero_b}")
        case "division":
            print(f"{numero_a} / {numero_b} = {numero_a / numero_b}")
        case "divi_entera":
            print(f"{numero_a} // {numero_b} = {numero_a // numero_b}")
        case "expo":
            print(f"{numero_a} ** {numero_b} = {numero_a ** numero_b}")    
        case "modulo":
            print(f"{numero_a} % {numero_b} ={numero_a % numero_b}")
        case _:
            print("Operacion no identificada")
except ValueError:
    print("Introduce un numero en Cifras")
except ZeroDivisionError:
    print("No se puede dividir por Cero")


# Preguntar al usuario que dia de la se mañana es:
# si dice lunes toca sistemas
# si dice martes miercoles jueves o viernes toca programacion
# si dice sabado domingo descansa coño
# si dice otra cosa Creo que estas confundido

dia = input("Que dia de la semana estamos: ")  # Solicita el día de la semana
dia = dia.lower()                  # Convierte entrada a minúsculas para estandarizar

match dia:                         # Estructura de control match para evaluar el día
    case "lunes":                  # Caso específico para lunes
        print("Hoy toca sistemas.")
    case "martes" | "miercoles" | "jueves" | "viernes":  # Casos para días laborables
        print("Hoy toca Python.")
    case "sabado" | "domingo":     # Casos para fin de semana
        print("Es fin de semana.")
    case _:                        # Caso por defecto para entradas no válidas
        print("Creo que estas confundido.") 
