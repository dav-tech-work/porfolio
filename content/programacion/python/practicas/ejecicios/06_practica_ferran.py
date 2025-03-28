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

"""
#dic tarifa
tarificacion = {"estandar": 9.00 ,"senior":6.90,"infantil":7.20,"reduce":5.00}
#lista entrada
lista_compras = []
compra = True

lista_init = []
for clave in tarificacion:
    lista_init.append(clave[0])


while compra:
    menu = "Precios de las entradas"
    for clase, valor in tarificacion.items():
        menu += f"\n{clase[0].upper()} {clase.capitalize()} : {valor:.2f} €"
    
    menu += "\n\nF. Finalizar la compra"
    menu += "\nX. Salir sin comprar"
    menu += "\n\nElija el tipo de entrada."
    menu += "\nA continuacion podra indicar la cantidad.\n>>>"

    eleccion_entrada = input(menu).lower().strip()

    if eleccion_entrada == "x":
        print("\n Aplicacion finalizada. ¡Hasta pronto!")
        compra = False
    elif eleccion_entrada == "f":
        if lista_compras:
            pass
        else:
            print("Aun no ha comprado nada.\n")
    elif eleccion_entrada in lista_init:
        # Buscar la entra que corresponde a la eleccion del cliente
        for clave,valor in tarificacion.items():
            if eleccion_entrada == clave[0]:
                try:
                    cantidad = int(input("Indique cuantas entradas quiere:\n"))
                except ValueError:
                    print("Debe indicar un numero entero")
                    break
                tipo = clave
                precio = valor
                subtotal = precio * cantidad
                #print(f"Has elegido : {clave}")

    else:
        print("Opcion incorrecta.")
