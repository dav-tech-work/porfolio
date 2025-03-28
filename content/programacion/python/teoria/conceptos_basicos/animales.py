"""
Creacion clase
"""
class Animal(): # Plantilla de Animal 
    def __init__(self,especie): # define un atributo de la clase
        self.especie = especie
    def __str__(self): # define un atributo de la clase y lo muestra
        return f"La especie es {self.especie}"       

class Perro(Animal):
    def sonido(self):
        print("GUAUUUUUU!!!")

tortuga = Animal("Tortuga")

milu = Perro("Canido")
milu.sonido()
print(milu)

class Gato(Animal):
    def sonido(self):
        print("MIAUUUUUU!!!")

bola = Gato("Felino")
bola.sonido()

print(Perro.__base__)
print(Animal.__subclasses__())