"""
Para crear una clase usaremos la palabra reservada class

"""
# El parentesit es optativo cuando es la unica
# Las propiedades de una clase se les llaman atributos
# Clase = plantilla
# self hace referencia al objeto que vamos a materalizar
class Persona(): # las clase son plantillas de objetos para crear los
    """
    Propiedades de una persona
    """
    # nombre = None
    # apellido = None
    # funcion = None
    # Introcir atributos de la clase
    def __init__(self,nombre,apellido,funcion): # def __init__ sirve para definir en la clase los atributos de la clase
        self.nombre = nombre
        self.apellido = apellido
        self.funcion = funcion

    # "definir los atributos"
    def __str__(self): # def __str__ sirve para poder visualizar los valores de la clase
        return f"Nombre: {self.nombre}, Apellido: {self.apellido}, Funcion: {self.funcion}"
        
# los objetos tienen herencia y se puede transmitir


# Un objeto es la instancia de una clase
# Objeto es igual a un conjuto de atributos de una plantilla y lo metemos y los definimos
# 
persona_1 = Persona("Peter","Parker","Alumno")
#print(type(persona_1))
#persona_1.nombre = "Peter"
print(persona_1)


