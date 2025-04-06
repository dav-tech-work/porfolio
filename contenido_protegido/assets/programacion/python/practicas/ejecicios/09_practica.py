"""
Hay que crear una clase llamada Rectangulo.
Necesitamos los metodos para obtener el area, perimetro y diagonal de la figura.
Cada uno en un metodo diferente
Lo probraremos con un rectangulo de l: 3 h:4
"""

class Rectangulo():
    def __init__(self,base:float,altura:float):
        self.base = base
        self.altura = altura
    def __str__(self):
        return f"Base: {self.base}\nAltura: {self.altura}"
    
    def area(self):
        print(f"El area es {self.base * self.altura}")
    def perimetro(self):
        print(f"El perimetro es {2*self.altura + self.base*2}")
    def diagonal(self):
        print(f"La diagonal es {(self.base**2 + self.altura**2)**0.5}")
    
rectangulo = Rectangulo(3.0,4.0)
rectangulo.area()
rectangulo.perimetro()
rectangulo.diagonal()