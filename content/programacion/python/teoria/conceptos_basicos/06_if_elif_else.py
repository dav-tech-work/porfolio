"""
IF / ELIF / ELSE
Control de condiciones
"""
# Condicion binaria
llueve = True

if llueve: # Si la variable llueve es True, imprime "Cogere el paraguas"
    print("Cogere el paraguas")
else: # Si la variable llueve es False, imprime "Ire a pasear"
    print("Ire a pasear")

print("Esto del codigo")

#

lunes = False # los lunes como pizza
jueves = True # jueves paella 
# El resto de dias bocata

if lunes: # Si la variable lunes es True, imprime "Hoy toca PIZZA"
    print("Hoy toca PIZZA")
elif jueves: # Si la variable jueves es True, imprime "Hoy toca PAELLA"
    print("Hoy toca PAELLA")
else: # Si ninguna de las condiciones anteriores se cumple, imprime "Hoy toca Bocata"
    print("Hoy toca Bocata")
