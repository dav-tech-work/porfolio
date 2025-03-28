# Pratica 04
# Mostrar los numero de esta lista que empiezan por 2
import os
os.system("clear")
nombres = ["Pau","Maria", "Pedro", "Pol"]
edades = [25, 30, 35, 40, 45, 28, 24, 75, 89, 234, 2]

check = 2
suma = 0

for nums in edades:
    if str(nums).startswith(str(check)): # str(nums) => convierte en string 
        # .startswith(str(check)) => busca la primer digito y lo comprara con la conversion string de check 
        print(nums, end=" ") # finaliza con un espacio
        suma += nums
print("\n",suma, end="\n")
"""
# Mostrar el resultado asi:
# La suma de los valores es X
# Hay X elemntos
# El promedio de la lista es N
"""
x = len(edades)
for nums in edades:
    suma += nums # a la variable suma le suma los de la lista
print(f"Hay {x} elementos")
print(f"El promedio de la lista es {suma / x}")
"""
"""
# Quiero saber si el usuario "x" esta en la lista
busca = input("A quien buscas ? \n")
for nom in nombres:
    #print(nom)
    if nom.lower() == busca.lower():
        print(f"El nombre {busca.capitalize()} esta en la lista")
        break
else:
    print(f"El nombre {busca.capitalize()} no esta en la lista")

# Quiero saber que nombres de la lista contienen con la letra "N"
lista_names = []
letra = input("Que letra buscas en los nombres ? \n")
for nombre in nombres:
    indice = nombres.index(nombre) # indice de la lista nombres y lo mete en nombre
    if letra in nombre.lower():
        print(f"{indice + 1}, {nombre}")
        lista_names.append(nombre)
print(f"Esta es la lista de los nombres que continen {letra.capitalize()}: {lista_names}")
"""
# Hay una instruccion de en python que nos genera valores
"""
print(list(range(10)))

for num in range(10):
    print(num, end=" ")
   
for index in range(len(nombres)):
    print(f"{index + 1} {nombres[index]}")
""" """ 
