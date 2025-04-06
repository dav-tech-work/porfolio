"""
 Caracteristicas basicas de Python
"""

# VARIABLES
# Una variable es un espacio de memoria para guardar datos
# por tanto, es un ConnectionAbortedError

# Para crear una variable es necesario ..
# identificador = valor

# Hay reglas para llamar a los identificadores = de la variable
# no se puede hacer:
# 1variable (empezar por numero, despues si lo puede llevar)
# $variable (ni empezar ni contener simbolos especiales)
# de estos errores nos avisa VSC

# No de debemos hacer (no son exactamente errores):
#     contener caracteres fuera del idioma ingles, como ñ, ç, tildes, Etc
#     Empezar por guion bajo (reservado para determinadas situaciones)
#     No debemos utilizar palabras utilizadas por el sistema  

# Que debemos hacer:
#     Nombra a nuestras variables con palabras descriptivas
#     Podemos usar mas de una palabra separadas por un guion bajo (Directiva PEP-8)
#     Intentar que las lineas de codigo no sean mu largas

# Las variables tienen tipos:
#     -- numeros => enteros (int), decimales (float), complejos ()
#     -- texto => strings
#     -- booleanos => True / False

# Python es de tipado dinamico

numero = 1 # entero
numero = "uno" # string

# Python es de tipado fuerte 

suma = numero + 2 # Error > no se pueden sumar numeros y texto
concatenacion = numero + str(2)
suma_numerica = int("1") + 2

# En python, por defecto NO exiten las constante

PI = 3.1416


frase ="esto es una frase un poco larga"
# Primer caractesr del string

print("frase[0] ->", frase[0])

# Ultimo caracter del string

print("frase[-1] ->", frase[-1])

# 6 primeros caracteres

print("frase[0:6] ->", frase[0:6]) # [inicio:fin:pasos]

# 6 ultimos caracteres

print("frase[-6:] ->", frase[-6:]) # [del caracter x : al final]

# Caracteres pares

print("frase[::2] ->", frase[::2]) # [coje las opciones pares]
print("frase[::-1] ->", frase[::-1]) # [coje e invierte el string]

# Contar caracteres hay en el string
print("len(frase) ->", len(frase))

# Conversion de texto a Mayuscula
print("frase.upper() ->", frase.upper())
frase = frase.upper()
print(frase)

# Conversion de texto a Minusculas
print("frase.lower() ->", frase.lower()) 
frase = frase.lower()
print(frase)

# Empezar el string con mayuscula

print("frase.capitalize() ->", frase.capitalize()) # funciona solo en letras y se aplica solo en el primer caracter
frase = frase.capitalize()

# Invertir mayusculas y minusculas

print("frase.swapcase() ->", frase.swapcase())

# Contar caracteres especificos (sensible a mayusculas y minusculas)

print('frase.count("a") ->', frase.count("a"))
print('frase.count("es") ->', frase.count("es"))

# Encontrar posicion caracter determinado o grupo de caracteres

print('frase.find("a") ->', frase.find("a"))
print('frase.find("x") ->', frase.find("x")) # si no esta devuelve -1 significa que no existe

# Verificacion de string empieza por cierto caracter o grupo de caracteres, devuelve booleanos

print('frase.startswith("Esto") ->', frase.startswith("Esto"))

https = 'https://google.es'
print('frase.startswith("http") ->', frase.startswith("http"))
print('frase.endswith(".es") ->', frase.endswith(".es"))

# Verificacion de texto es convertible a numeros
numero = '10'
print('int(numero) ->', int(numero))
print('numero.isnumeric() ->', numero.isnumeric()) # solo numeros
print('numero.isalpha() ->', numero.isalpha()) # solo texto
print('numero.isalnum() ->', numero.isalnum()) # Se pueden mezclar numeros y texto

# Cambio de caracteres
print("frase.replace('a', 'i') ->", frase.replace('a', 'i'))

# Contar los espacios

palabras_en_frases = frase.split(" ") # crea lista 
print(len(palabras_en_frases))

print( 10 > 5 )
print( "abeja" > "flor") #compara solo asta que el caracter es mayor que el otro

# Variable de los numeros no sirven para decimales

print(edad.isdigit()) #Comprueba si son digitos
print(edad.isdecimal()) #Comprueba si son decimales
print(edad.isnumeric()) #Comprueba si son numeros enteros
print(edad.isalpha()) #Comprueba si son caracteres