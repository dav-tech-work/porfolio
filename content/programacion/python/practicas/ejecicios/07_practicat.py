"""
Crear una clase llamada coche

Tendra los siguentes atributos:
- Marca
- Color
- Combustible
- Cilindrada

Crear la funcion __init__ con los parametros anteriores.
Crear otra funcion llamada "mostrar_caracteristicas" que mostrara todos los atributos del objeto en un unico mensaje.
Crear la funcion __str__ que tendra  como salida la marca y el color.
Con eso crearemos un objeto con los valores:

- Marca > Opel
- Color > Rojo
- Combustible > Electrico
- Cilindrada > 1.6

Ejecutar las funciones que acabas de crear
"""

class Coche():
    def __init__(self,marca,color,combustible,cilindrada):
        self.marca = marca
        self.color = color
        self.combustible = combustible
        self.cilindrada = cilindrada
    def __str__(self):
        return f"Marca: {self.marca}, Color: {self.color}"
    def mostrar_caracteristicas(self):
        return f"Marca: {self.marca}, Color: {self.color}, Combustible: {self.combustible}, Cilindrada: {self.cilindrada}"
    
coche_1 = Coche("Opel","Rojo","Electrico","1.6")
print(coche_1)
print(Coche.mostrar_caracteristicas(coche_1))