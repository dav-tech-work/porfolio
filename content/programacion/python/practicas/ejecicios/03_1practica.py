# Pedir al usuario un numero
numero_a = input("Introduce un número: ")
numero_b = input("Introduce otro número: ")
operacion = input("""¿Qué operación quieres realizar?
1. suma
2. resta
3. multi
4. division
5. expo
6. divi_entera
7. modulo
Tu elección: \n""")

# Verificar si los números son válidos (enteros, decimales o negativos)
def es_numero_valido(num):
    # Eliminar el signo negativo si existe
    if num.startswith('-'):
        num = num[1:]
    # Verificar si es entero o decimal
    return num.isnumeric() or (num.replace(".", "", 1).isdecimal() and num.count(".") == 1)

if es_numero_valido(numero_a) and es_numero_valido(numero_b):
    # Convertir a float
    num_a = float(numero_a)
    num_b = float(numero_b)
    
    # Verificar la operación
    if operacion == "suma":
        print(f"{num_a} + {num_b} = {num_a + num_b}")
    elif operacion == "resta":
        print(f"{num_a} - {num_b} = {num_a - num_b}")
    elif operacion == "multi":
        print(f"{num_a} * {num_b} = {num_a * num_b}")
    elif operacion == "division":
        if num_b == 0:
            print("No se puede dividir por cero")
        else:
            print(f"{num_a} / {num_b} = {num_a / num_b}")
    elif operacion == "expo":
        print(f"{num_a} ** {num_b} = {num_a ** num_b}")
    elif operacion == "divi_entera":
        if num_b == 0:
            print("No se puede dividir por cero")
        else:
            print(f"{num_a} // {num_b} = {num_a // num_b}")
    elif operacion == "modulo":
        if num_b == 0:
            print("No se puede dividir por cero")
        else:
            print(f"{num_a} % {num_b} = {num_a % num_b}")
    else:
        print("Operación no válida")
else:
    print("Por favor, introduce números válidos")

    # Preguntar al usuario que dia de la se mana es:
# si dice lunes toca sistemas
# si dice martes miercoles jueves o viernes toca programacion
# si dice sabado domingo descansa coño
# si dice otra cosa Creo que estas confundido

dia = input("Que dia de la semana estamos: ") # Solicita el día de la semana
dia = dia.lower() # Convierte entrada a minúsculas para estandarizar
match dia: # Estructura de control match para evaluar el día
    case "lunes": # Caso específico para lunes muestra el mensaje correspondiente
        print("Hoy toca sistemas.") 
    case "martes" | "miercoles" | "jueves" | "viernes": # Casos para días laborables muestra el mensaje correspondiente
        print("Hoy toca Python.")
    case "sabado" | "domingo": # Casos para fin de semana muestra el mensaje correspondiente
        print("Es fin de semana.")
    case _: # Caso por defecto muestra el mensaje correspondiente
        print("Creo que estas confundido.")
    