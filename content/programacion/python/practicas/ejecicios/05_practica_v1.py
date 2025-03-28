"""
Juego de piedra papel tijera
"""
"""
Introducciones normas juegos
Menu de seleccion de las tres opciones 
El usuario introduce valores "piedra", "papel", "tijera"
el programa randomiza entre los 3 valores y los compara en cada caso.
en cada caso hay que mostras o as ganado o as perdido.
contadores de cuanto a ganado cada uno
"""
"""
LISTA DE MEJORAS
- Jugar mas de 1 una vez
- Limitar un maximo de partidas
- Contar cuantas veces a ganado, perdido o empatado cada 1
- Personalizar solicitando el nombre
- Poder guardar el resultados
- Procentaje de victorias
- 
"""

import random # Importamos la libreria Random
# Lista opciones del juego
lista = ["Piedra","Papel","Tijeras"] # Creamos una lista de strings 
opciones_juego = ['🪨','⬜','✂️'] # Creamos una lista de strings 
menu = f"""
PIERDRA - PAPEL - TIJERAS
=========================

Selecciona 1 de las 3 opciones para jugar:

1.- {lista[0]} {opciones_juego[0]}
2.- {lista[1]} {opciones_juego[1]}
3.- {lista[2]} {opciones_juego[2]}

En caso de no querer jugar o salir del juego pulsa qualquier tecla
fuera de las 3 opciones.

Buena suerte y pasalo bien.

""" # Creamos la variable menu dandole un formato para poder poner variables

print(menu) # Mostramos en pantalla el menu
opciones_dig = ["1","2","3"]


opcion_user = input("Que opcion eliges ==> ").strip() # Creamos la variable opcion_user y le pedimos al usuario que ponga una de las opciones
if opcion_user not in opciones_dig: # Realizamos una condicion que si la opcion_user no cumple con los parametro ["1","2","3"] finaliza y muestra en pantalla el mensaje.
   print("El juego a finalizazo. ¡Hasta pronto!")
else: # en caso de si ser uno de los parametros estableciodos ejecuta el siguiente codigo
    opcion_pc = str(random.randint(1,3)) # Crea una variable llamada opcion_pc que genera un numero aleatorio entre 1 y 3 y lo transforma de un entero a un string

resultado_pvp = f"""
Has elegido {lista[int(opcion_user)-1]} {opciones_juego[int(opcion_user)-1]}
EL pc a elegido {lista[int(opcion_pc)-1]} {opciones_juego[int(opcion_pc)-1]}
""" # Crea la variable resultado_pvp donde se muestra un texto y las elecciones del usuario y del programa.
print(resultado_pvp) # Muestra la variable en pantalla.
    
if opcion_user == opcion_pc: # Compara la variable opcion_user y opcion_pc si son iguales ejecuta el codigo
    print("Empate😒😒") # Muestra en pantalla el mensaje
elif (opcion_user == "1" and opcion_pc == "3") \
        or (opcion_user == "2" and opcion_pc == "1") \
        or (opcion_user == "3" and opcion_pc == "2"): # Si en caso de que una de estas comparaciones se cumpla ejecuta el codigo
    print("🎉🎉¡¡¡Has ganado!!!🎉🎉") # Muestra el mensaje
else: # Si no es ninguna de las opciones anteriores ejecuta codigo
    print("😿😿¡¡¡Has perdido!!!😿😿") # Muestra el mensaje



            
#print(juego)

