"""
Bucles
"""

# for -> para elementos controlados

nombres = ["Juan", "Maria", "Pol", "Pau"]
edades = [25, 30, 45, 80, 90]

# para cada nombre que este en la lista nombre ...
for nombre in nombres: # for cada nombre en la lista, imprime su nombre
    print(nombre)
    
# impirmir pantalla p

for nombre in nombres: # for cada nombre en la lista, imprime su nombre
    nombre = nombre.startswith("P") # si el nombre empieza por P, lo imprime en mayusculas
    if nombre is True: # Si nonbre es True, imprime el nombre en mayusculas
        print(str(nombre))
    print(type(nombre))


# Solucion Ferran
check = input("Porque letra empieza el nombre de quien buscas? \n") # pedir que introduzca una letra
# crear el bucle para acceder a cada elemento de la lista
for nombre in nombres:
    if nombre[0].lower() == check.lower():  # si el nombre empieza por la letra introducida en la variable check, imprime el nombre en mayusculas
        print(nombre.capitalize())   # imprime el nombre en mayusculas
    if nombre.lower().capitalize(check.lower()): # si el nombre empieza por la letra introducida en la variable check, imprime el nombre en mayusculas
        print(nombre.capitalize())

# while = mientras -> para elementos no controlados

num = 5
while num > 0: # Hasta que la variable no llega a 0 el bucle continua
    print(num) 
    num -= 1 # decrementa el valor de num en 1	
else:
    print("Estas en el else")
print("#"*20)
while True: # mientras no se pulse la tecla intro
    print(num)
    num -= 1 # decrementa el valor de num en 1	
    if num == 0: # si num es igual a 0, sale del bucle
        break # para el bucle
else: 
    print("Estas en el else")

monedas = float(input("cuantas monedas tengo? \n")) # pedir que introduzca un numero de monedas 
# crear el bucle para pedir prestamos mientras tenga monedas
while True: # mientras no se pulse la tecla intro
    prestamo = float(input("¿Cuantas monedas necesitas? \n")) # pedir que introduzca un numero de monedas para pedir prestamo
    if prestamo <= monedas: # si el prestamo es menor o igual que las monedas, resta las monedas
        monedas -= prestamo # resta las monedas
    elif prestamo > monedas > 0: # si el prestamo es mayor que las monedas, pero ademas tienes monedas, muestra un mensaje de que no hay suficiente
        print("No hay suficiente")
    else:
        print("No hay cash")
        break

# while es un bucle y comprara el valor el booleano
test = 1
while test:
    if test >=1:
        print("es mayor")
    else:
        print("fin")

    
