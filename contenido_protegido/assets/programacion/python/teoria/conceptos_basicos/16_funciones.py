# """
# FUNCIONES
# Definición o función es un bloque de código que se ejecuta cuando se le llama o invoca, puede recibir parámetros y devolver un resultado
# Las funciones se definen antes de usarla
# """

# # Declaración 1
# def sumar () : 
#     print(1 + 2)

# # Invocación
# sumar()

# # Declaración 2
# def sumar () :
#     return 1 + 2

# print(sumar())

# # Declaración 3
# # En la declaración lo que hay en 
# # los paréntesis son los PARÁMETROS
# def sumar (num1, num2) :
#     return num1 + num2

# # En la ejeccución/invocación lo que hay en 
# # los paréntesis son los ARGUMENTOS
# print(sumar(3, 7))
# print(sumar(3.5, 7.2))
# print(sumar("Hola ", "y adiós"))

# resultado = sumar(2, 3)

# # Ejemplos de funciones:
# # -- para ver si un número es primo o no
# # -- para corregir nombres mal escritos
# # -- para calcular días, horas, etc de una contidad de segundos
# # -- para calcular los días que faltan para una fecha

# variable = "Otra cosa"

# def prueba_variable() :
#     variable = "Soy una prueba"
# print(variable)

# def mostrar_datos_alumno(nombre, apellido, becado = False):
#     if becado:
#         becado = "Sí"
#     else:
#         becado = "No"
#     return f"¿el alumno {nombre} {apellido} tiene beca? --> {becado}"
    
# alumno_1 = mostrar_datos_alumno("Anna", "Garcia")
# print(alumno_1)
# alumno_2 = mostrar_datos_alumno("Joan", "Pou", True)
# print(alumno_2)

# def sumar(*argv) :
#     print(type(argv))

# sumar(1,2)
# sumar(3,4,5)
# sumar(3,7,907)


# var = "algo"
# print(id(var))

# lista = [1,2,3]
# def cuadrados(lista_numeros):
#     return[x**2 for x in lista_numeros]


def separar_names(apellido_nombre:str) -> str: # A la funcion nombre recibira una variable que hemos definido como string y esperamos optener un string. Los strings son anotaciones informativas
    """
    Devolverá de forma separada el nombre y el apellido

    Params
    str -> "Apellido, Nombre"
    
    Return
    str -> "Nombre"
    str -> "Apellido"
    """
    # for nombre, apellido in apellido_nombre:
    #     apellido[0] = apellido_nombre
    #     nombre[1] = apellido_nombre
    # return f"{nombre} \n {apellido}" 

    lista = apellido_nombre.split(",")
    apellido = lista[0].strip()
    nombre = lista[1].strip()
    return nombre, apellido

nombre , apellido = separar_names("Jobs, Steve")
print(f"{nombre}\n{apellido}")

help(separar_names) #  ver el contenido explicativo
print(separar_names.__doc__)
