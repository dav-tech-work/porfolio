"""
ENTRADAS DEL CINE

Vamos a crear una app para vender entradas del cine.

Hay tres precios:
- Entrada estándar: 9.00
- Mayores de 65 años (seniors) : 6.90
- Infantiles : 7.20

Se puede vender cualquier cantidad de entradas,
pero los menores siempre deber ir acompañados
de un adulto.

Al finalizar la compra mostraremos las entradas 
y el importe total. 

En cualquier momento hay que poder finalizar 
el proceso sin que se produzca la compra

Dependiendo el dia de la semana se le aplica dia del espectador

"""
import os
from datetime import datetime

def limpiar_pantalla(): # función de limpiar pantalla
    os.system('cls' if os.name == 'nt' else 'clear')

# Definición de tarifas
tarificacion = {
    "estandar": 9.00,
    "senior": 6.90,
    "niños": 7.20
}

def aplicar_descuento_dia_espectador(tarificacion): # funcion que aplica el descuento dependiendo el dia de la semana
    dia_semana = datetime.now().weekday()
    # Suponiendo que el día del espectador es el miércoles (día 2)
    if dia_semana == 2:
        for tipo in tarificacion:
            tarificacion[tipo] = 5.00  # Aplicar precio de 5.00€ para todos

def mostrar_menu(): # Funcion que crea el menu
    menu = "\n¡Bienvenido a los Cines Ferran!\n"
    menu += "\nPrecios de las entradas:"
    for clase, valor in tarificacion.items():
        menu += f"\n{clase[0].upper()} - {clase.capitalize()}: {valor:.2f} €"
    menu += "\n\nF - Finalizar la compra"
    menu += "\nX - Salir sin comprar"
    menu += "\n\nElija el tipo de entrada (E/S/N/F/X): "
    return menu

def procesar_compra(): # Funcion que crea la compra 
    entradas = {"estandar": 0, "senior": 0, "niños": 0}
    total = 0
    
    while True:
        limpiar_pantalla()
        opcion = input(mostrar_menu()).lower().strip()
        
        if opcion == 'x':
            return None
        elif opcion == 'f':
            if entradas["niños"] > 0 and entradas["estandar"] == 0:
                print("\n¡Error! Los niños deben ir acompañados de al menos un adulto.")
                input("\nPresione Enter para continuar...")
                continue
            break
        
        tipo_entrada = None
        if opcion == 'e':
            tipo_entrada = "estandar"
        elif opcion == 's':
            tipo_entrada = "senior"
        elif opcion == 'n':
            tipo_entrada = "niños"
        
        if tipo_entrada:
            try:
                cantidad = int(input(f"\nCantidad de entradas {tipo_entrada}: "))
                if cantidad >= 0:
                    entradas[tipo_entrada] += cantidad
                else:
                    print("\nPor favor, ingrese un número positivo.")
                    input("\nPresione Enter para continuar...")
            except ValueError:
                print("\nPor favor, ingrese un número válido.")
                input("\nPresione Enter para continuar...")
        else:
            print("\nOpción no válida.")
            input("\nPresione Enter para continuar...")
    
    return entradas

def mostrar_resumen(entradas): # funcion que calcula el valor de la entradas
    total = 0
    limpiar_pantalla()
    print("\nResumen de su compra:")
    print("-" * 30)
    
    for tipo, cantidad in entradas.items():
        if cantidad > 0:
            subtotal = cantidad * tarificacion[tipo]
            total += subtotal
            print(f"{tipo.capitalize()}: {cantidad} x {tarificacion[tipo]:.2f}€ = {subtotal:.2f}€")
    
    print("-" * 30)
    print(f"Total a pagar: {total:.2f}€")
    return total

# Aplicar descuento si es el día del espectador
aplicar_descuento_dia_espectador(tarificacion)

# Ejecución principal del programa
while True: 
    entradas = procesar_compra()
    
    if entradas is None:
        print("\n¡Gracias por su visita!")
        break
    
    total = mostrar_resumen(entradas)
    
    confirmar = input("\n¿Desea confirmar la compra? (S/N): ").lower().strip()
    if confirmar == 's':
        print("\n¡Compra realizada con éxito!")
        print("¡Disfrute de la película!")
        break
    else:
        print("\nCompra cancelada.")
        continuar = input("\n¿Desea realizar otra compra? (S/N): ").lower().strip()
        if continuar != 's':
            print("\n¡Gracias por su visita!")
            break

