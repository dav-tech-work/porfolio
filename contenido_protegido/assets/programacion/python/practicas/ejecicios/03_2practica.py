
# Solucion 3 calculadora Ferran
import os
os.system("cls")

try:
    respuesta = input("Inndica los numero y la operacion a realizar:\nEjemplo: 10, 5, +\n\n").split(", ") # Separa la entrada en numeros y operacion
    num_1 = float(respuesta[0]) # Convierte los datos proporcionados por el usuario a float y los guarda en la variable num_1
    num_2 = float(respuesta[1]) # Convierte los datos proporcionados por el usuario a float y los guarda en la variable num_2 
    op = respuesta[2] # Guarda la operacion en una variable

    match op:
        case "+" | "-" | "*" | "**" | "/" | "//" | "%": # Comprueba las operaciones disponibles con la variable op
            resultado = eval(f"{num_1} {op} {num_2}") # Evalúa la operación y guarda el resultado en la variable resultado
            print(f"{num_1} {op} {num_2} = {resultado}")  # Muestra el resultado de la operación
        case _: # Si la operacion no es conocida, muestra el mensaje 
            print("Operacion desconocida") 
            
except ValueError: # Si la entrada no es un numero, muestra el mensaje 
    print("Introduce un numero en Cifras")
except ZeroDivisionError: # Si se intenta dividir entre cero, muestra el mensaje 
    print("No se puede dividir por Cero")

# Ejecicio Palindrono
# Solicitat al usuario un texto y le vas a decir si es un palindromo o no

texto1 = input("Escribe una frase: \n").strip() # Quita los espacios de delante y detras
print(texto1) # Muestra en pantalla
# Transforma en lista el texto usando los espacios en blanco como guia
palabras = texto1.split(" ") # Quita los espacios de la frase 
# Comprueba si la lista es palindroma
if palabras == palabras[::-1]: # Compara la lista con su inversa 
    print("La frase es palindroma")
else:  # Si no es palindroma, muestra el mensaje 
    print("La frase no es palindroma")


# Preguntale al usuario un mumero y dile si es par o inpar
num=input("Dime un numero: ") # Solicita un numero al usuario
if not num.isdigit():  # Comprueba que no se ha introducido un numero entero
    print("No has introducido un numero")
elif int(num) % 2 == 0: # Comprueba si el numero es par
    print(f"{num} es par") # Muestra el mensaje 
else: # Si no es par, muestra el mensaje 
    print(f"{num} es impar") #