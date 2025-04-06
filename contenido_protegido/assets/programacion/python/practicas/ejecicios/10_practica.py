"""
Crear un programa que utilice un diccionario para almacenar un inventario de productos.
Hay que guardar 5 productos con sus cantidades.
Después añadiremos dos nuevos productos.
Actualizaremos las cantidades de 2 productos cualquiera.
Mostrar ahora todos los productos y sus cantidades.
"""

inventario = {"tomates": 10, "platanos": 5, "peras": 9, "manzanas": 4, "sandias": 2}

def mostrar_inventario(inventario):
    print("\nInventario actual:")
    for producto, cantidad in inventario.items():
        print(f"{producto.capitalize()}: {cantidad}")
    print()

def añadir_producto(inventario):
    producto = input("Introduce el nombre del producto: ").strip().lower()
    cantidad = int(input("Introduce la cantidad del producto: ").strip())
    if producto in inventario:
        inventario[producto] += cantidad
    else:
        inventario[producto] = cantidad
    print(f"Producto {producto} añadido/actualizado con éxito.\n")

def modificar_cantidad(inventario):
    producto = input("Introduce el nombre del producto a modificar: ").strip().lower()
    if producto in inventario:
        cantidad = int(input("Introduce la nueva cantidad del producto: ").strip())
        inventario[producto] = cantidad
        print(f"Cantidad de {producto} actualizada a {cantidad}.\n")
    else:
        print(f"El producto {producto} no existe en el inventario.\n")

while True:
    menu = """
    Opciones:
    \t 1.- Añadir a la lista de productos
    \t 2.- Mostrar la lista de productos
    \t 3.- Modificar la cantidad de un producto
    \t 4.- Salir
    """
    print(menu)
    opcion_user = input("Que opcion eliges ==> ").strip()
    
    if opcion_user == "1":
        añadir_producto(inventario)
    elif opcion_user == "2":
        mostrar_inventario(inventario)
    elif opcion_user == "3":
        modificar_cantidad(inventario)
    elif opcion_user == "4":
        print("Saliendo del programa.")
        break
    else:
        print("Introduce una de las 4 opciones")

