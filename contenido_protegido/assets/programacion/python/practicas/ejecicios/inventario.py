"""
Crear un programa que utilice un diccionario para almacenar un inventario de productos.
Hay que guardar 5 productos con sus cantidades.
Después añadiremos dos nuevos productos.
Actualizaremos las cantidades de 2 productos cualquiera.
Mostrar ahora todos los productos y sus cantidades.
Quitar cosas del diccionario
"""

inventario = {"manzanas":12,"peras":14,"naranjas":20,"uvas":50,"kiwis":4}
# Añadir al diccionario
inventario["piñas"]=6
inventario["tomates"]=5

print(inventario)
# Modificar inventario
inventario["naranjas"] = 10
# Incrementar diccionario
inventario["kiwis"] += 5 

print(inventario)

#inventario.popitem() # Quita el ultimo item añadido 
fruta = inventario.pop("peras") # Quita el item que le digamos y guardamos el valor en una variable solo guarda el valor.
print(inventario)
print(fruta)

inventario.popitem()
print(inventario)

# Salida ordenada
for producto in sorted(inventario):
    print(f"producto : {producto}")

# Salida invertida
for producto in sorted(inventario, reverse=True):
    print(f"producto : {producto}")