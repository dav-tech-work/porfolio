"""
BOOLEANS
"""

verdadero = True
falso = False
Verdadero = True   #python es sensible a mayusculas, se da cuenta que tienen el mismo valor y los manda a ala misma direccion, si Verdadero = False las id seran diferentes
asd = True
Asd = False
print(id(verdadero), id(Verdadero), id(asd), id(Asd))   
print(verdadero is verdadero)           #== con numeros y strings y els is con estructuras mas complejas

#Casting, algunos valores tienen asignado False(0, ""(string vacío), [] (lista vacía), )
#print(bool(0))

if (0):
    print("El 0 es verdadero")
else:
    print("El 0 es falso")

if []:
    print("la lista esta vacía")
else:
    pass