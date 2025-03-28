"""
Vamos a crear una clase llamada Persona.
Tendra estos atributos:
- Nombre
- Apellido
- Ciudad

Crear el constructor y el metodo que muestra la informacion de la classe print(objeto muestra todas las caracteristicas)
__init__, __str__, 

Tambien habra una clase hija llamada Cliente.
Tiene estos atributos:
- DNI
- Compras

Cuando se muestre el objeto debe aparecer todos los atributos.
Hay que crear un metodo que tenga esta salida: compras_realizadas
" El cliente " " ha comprado "xx.xx"."
"""

class Persona():
    def __init__(self,nombre:str,apellido:str,ciudad:str):
        self.nombre = nombre
        self.apellido = apellido
        self.ciudad = ciudad
    def __str__(self):
        print(f"Nombre: {self.nombre}\nApellido: {self.apellido}\nCiudad: {self.ciudad}")


class Cliente(Persona):
    def __init__(self, nombre, apellido, ciudad,dni,compras):
        super().__init__(nombre, apellido, ciudad)
        self.dni = dni
        self.compras = compras
    def __str__(self):
        super().__str__()
        return f"El cliente {self.dni} ha comprado {self.compras}"
    def compras_realizadas(self):
        return f"El cliente {self.nombre} ha comprado {self.compras}."
    # def compras_realizadas(self):
    #     return f"El cliente {self.nombre} {self.apellido} ha comprado {self.compras}"

#persona_1 = Persona("David","Gomez","Lima")
#print(type(persona_1))
cliente_1 = Cliente("Pepito","Garcia","Vic","44558877-R","3,000,000.52")
print(type(cliente_1))
print(cliente_1)
# print(persona.nombre)
# print(cliente_1)
cliente_2 = Cliente(1112,666,555,888,555)
print(cliente_2)