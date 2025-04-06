"""
Excepciones 
Son errores que se producen durante la ejecucion
y lo interrumpen
"""
import os
os.system("clear") # clear es el cls en windows borrar los que hay en la terminal primero

# try / except
# si hay try debe haber un except

try: # Prueba
    num = float(input("Escribe un numero -> "))
    #print( 1 / 0 )
    #print("Despues de la division por cero")
except ValueError: # Error de converison de tipo
    print("Has de introducir un numero")
except ZeroDivisionError: # Error de division por 0
    print("No se puede dividir por cero")
except: # Error generico
    print("Ha ocurrido un error")

print("El programa continua ...")

try: # intentar algo
    pass
except: # si falla ejecuta esto
    pass
else: #
    # si no falla ejecuta esto
    pass
finally: # si no falla ejecuta esto
    pass