"""
LISTAS
"""

# Las listas equivalen a los  "Arrays" de otros leguajes
# Las listas se indican mediante corchetes -> []
# Las listas y los strings son "iterables" -> se pueden recorrer
# la separacion de elementos se realizan mediante comas
# la listas es una coleccion (de datos) indexada
# el indice empieza a contar en 0 

verdadero = True
lista_num= [1, 2, 3, 4, 5]
lista_nombres = ["Maria", "Pau", "Pol"] # lista de strings
lista_mixta = [1, "Maria", 3.5, True] # lista mixta
lista_de_lista = [[1, 2],["Pol", "Pau"], [True, verdadero]]

# Acceder al primer valor:
print(lista_num[0]) # 1

# Acceder al ultimo valor:
print(lista_num[-1]) # 5

# Slicing (el ultimo valor no esta incluido)
# [inicio: final: paso]
print(lista_num[1:3]) # [2, 3]
print(lista_num[-3:-1]) # [3, 4]
print(lista_num[-3:]) # [3, 4, 5]
print(lista_num[::-1]) # [5, 4, 3, 2, 1] # para guardar la inversion hay que meterlo en una variable
print(lista_num) # [1, 2, 3, 4, 5]

# Añadir un elemento al final
lista_num.append(6) # nombre_lista.append(valor)
print(lista_num) # [1, 2, 3, 4, 5, 6]

# Quitar el ultimo elemento 
ultimo_elemento = lista_num.pop() # nombre_lista.pop() quita el ultimo

# Poner un elemento en una posicion concreta 
lista_num.insert(2, 2.5) # nombre_lista.insert(posicion, valor)
print(lista_num)

# Eliminar una posicion concreta --> del[posicion]
print(lista_mixta)
del lista_mixta[2] # elimina solo la primera que concuerde con el valor que se encuentra 
print(lista_mixta)

# Eliminar un elemento por valor
print(lista_nombres)
lista_nombres.remove("Pol") # elimina solo la primera que concuerde
print(lista_nombres)

# Unir 2 listas
lista_1 = [0, 1, 2]
lista_2 = [3, 4, 5]
lista_1.extend(lista_2) # concatenacion, modifica la variable que se extienda
lista_1 = lista_1 + lista_2 # concatenacion, modifica la variable que se extienda
lista_1 += lista_2 # concatenacion, modifica la variable que se extienda
print(lista_1)

# las listas comprimida
lista_vacia = []
lista = [x ** 2 for x in lista_vacia]

lista_temp =[]
for x in lista:
    lista_temp.append(x **2)
#return lista_temp:

