'''
Crea una clase llamada Vehiculo.

En su constructor incluye marca, modelo y año de construcción.

Dos métodos también:
-- arrancar, con el mensaje "El vehículo XX modelo YY ha arrancado"
-- detener, con el mensaje "El vehículo XX modelo YY se ha detenido"

Luego, dos clases hijas: Coche y Moto

La clase Coche tiene dos atributos propio: numero de puertas y AC (verdadero o falso).
y también un método propio: abrir_maletero, que
devuelve este mensaje: "El maletero del [marca] [modelo] está abierto"

La clase Moto tiene un método propio: revisar_seguridad, devuelve este mensaje:
"Si circulas en motocicleta debes llevar casco"
'''

# Definición de la clase base Vehiculo
class Vehiculo(): 
    # Constructor de la clase Vehiculo
    def __init__(self, marca, modelo, año): 
        self.marca = marca
        self.modelo = modelo
        self.año = año
    
    # Método para arrancar el vehículo
    def arrancar(self):
        return f"El vehiculo {self.marca} modelo {self.modelo} ha arrancado"
    
    # Método para detener el vehículo
    def detener(self):
        return f"El vehiculo {self.marca} modelo {self.modelo} se ha detenido"
    
# Definición de la clase Coche que hereda de Vehiculo
class Coche(Vehiculo):
    # Constructor de la clase Coche
    def __init__(self, marca, modelo, año, puertas, ac):
        super().__init__(marca, modelo, año)  # Llamada al constructor de la clase base
        self.puertas = puertas
        self.ac = ac
    
    # Método para abrir el maletero del coche
    def abrir_maletero(self):
        if self.puertas >= 1:
            return f"El maletero del {self.marca} {self.modelo} está abierto"
        
# Definición de la clase Moto que hereda de Vehiculo
class Moto(Vehiculo):
    # Método para revisar la seguridad de la moto
    def revisar_seguridad(self):
        return f"Si circulas en motocicleta debes llevar casco"    

# Creación de una instancia de la clase Coche
coche_1 = Coche("Opel", "Corsa", 1992, 3, "si")

# Creación de una instancia de la clase Moto
moto_1 = Moto("Yamaha", "MT09", 2025)

# Uso de los métodos de la instancia coche_1
print(coche_1.arrancar())
print(coche_1.detener())
print(coche_1.abrir_maletero())   

# Uso de los métodos de la instancia moto_1
print(moto_1.arrancar())
print(moto_1.detener())
print(moto_1.revisar_seguridad())
