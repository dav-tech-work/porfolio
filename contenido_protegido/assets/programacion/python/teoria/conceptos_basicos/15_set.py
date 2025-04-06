"""
SET -> conjunto lógico
Los sets no pueden tener valores repetidos
"""

lista_numeros = [1, 2, 2, 5, 7, 5, 4, 1] # lista de números 
lista_sin_repeticiones = list(set(lista_numeros)) # lista [] donde set {} elimina los valores repetidos
lista_sin_repeticiones = set(lista_numeros) # set {} elimina los valores repetidos
print(lista_sin_repeticiones)