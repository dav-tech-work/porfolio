"""
Programación Orientada a Objetos: Biblioteca

El programa debe crear las siguientes clases con sus métodos:

    Clase Lector, que se construirá con nombre y apellido

    Clase Libro, que se construirá con nombre_autor, apellido_autor,
    y título

    Clase Biblioteca, que se construirá con nombre y dirección
    Esta clase dispondrá de los siguientes métodos:
    - agregar_lector: agrega un lector a la biblioteca
    - mostrar lectores
    - agregar_libro: agrega un libro a la biblioteca,
        indicando los ejemplare disponibles
    - buscar_libro: busca un libro en la biblioteca, 
        indicando si lo tiene o no
    - mostrar libros de la biblioteca

"""
# Creacion clase lector
class Lector():
    def __init__(self, nombre, apellido,):
        self.nombre = nombre
        self.apellido = apellido
        self.reserva = 0

# Creacion Clase Libro
class Libro():
    def __init__(self,autor, titulo,stock): # nombre_autor,apellido_autor
        # self.nombre_autor = nombre_autor
        # self.apellido_autor = apellido_autor
        self.autor = autor # Contine el nombre y los apellidos
        self.titulo = titulo
        self.stock = stock  # Número de ejemplares disponibles
        self.lista_espera = []  # Lista de lectores esperando el libro

    def __str__(self):
        return f"'{self.titulo}' de {self.autor} (Stock: {self.stock})"


class Biblioteca():
    
    def __init__(self, nombre, direccion):
        self.nombre = nombre
        self.direccion = direccion
        self.lectores = []
        self.libros = []
        
    # Creacion del metodo para agregar a un Lector    
    def agregar_lector(self, nombre, apellido):

        for lector in self.lectores: # Para el objeto lector en la lista lectores 
            if lector.nombre == nombre and lector.apellido == apellido: # Si el nombre y el apellido estan 
                return "Lector ya existe" # informa de que el lector esta

        # Si no existe, se agrega
        nuevo_lector = Lector(nombre, apellido) # Crea un nuevo objeto con los datos
        self.lectores.append(nuevo_lector) # añade a la lista lectores el nuevo lector
        return "Lector agregado con éxito" # Muestra en pantalla el mensaje

    # Creacion del metodo para agregar un Libro
    def agregar_libro(self,autor,titulo,stock=1): #nombre_autor,apellido_autor
        for libro in self.libros: # para cada libro dentro de self.libros
            if libro.autor == autor and libro.titulo == titulo: # compara el autor y el titulo en self.libros
                libro.stock += stock # añade al stock del libro 1
                return f"Se han añadido {stock} ejemplares del libro '{titulo}' de {autor}."
            
        # Si no existe, se agrega
        nuevo_libro = Libro(autor, titulo, stock) # Crea un objeto de la clase libro
        self.libros.append(nuevo_libro) # añade el nuevo objeto a la lista self.libro
        return f"Libro '{titulo}' de {autor} agregado con {stock} ejemplares."

    # Creacion del metodo para buscar libro
    def busca_libro(self, autor, titulo):
        for libro in self.libros:  # para libro en la self.libros 
            if libro.autor == autor and libro.titulo == titulo: # compara tanto el titulo como el autor
                return f"El libro '{titulo}' de {autor} está disponible con {libro.stock} ejemplares."
        return f"El libro '{titulo}' de {autor} no está en la biblioteca."

    # Creacion del metodo para mostrar los libros
    def mostrar_libros(self):
        if not self.libros: # si el libro no esta registrado muestra el mensaje
            return "La biblioteca no tiene libros registrados."
        return "\n".join(str(libro) for libro in self.libros) # si el libro esta registrado muestra todos

    # Creacion del metodo para reservar los libros
    def reservar(self,titulo, autor, nombre,apellido):
        for libro in self.libros: # para cada libro en self.libros
            if libro.autor == autor and libro.titulo == titulo and libro.stock > 0: # si los parametros titulo, autor y stock se cumplen
                #print(libro.titulo, libro.stock)
                libro.stock -= 1 # Resta 1 al stock del libro
                #print(libro.titulo, libro.stock)
                for lector in self.lectores: # para el lector en la lista self.lectores
                    if lector.nombre == nombre and lector.apellido == apellido: # compara si los parametros nombre, apellido estan en la lista
                        lector.reserva += 1 # añade 1 a la reserva del objeto lector
                        return f"El libro {titulo} del autor {autor}, ha sido reservado por: {nombre} {apellido}"
                    else:
                        return f"El libro {titulo} del autor {autor}, no se ha podido reservar"

# Creación de la biblioteca
biblioteca = Biblioteca("Biblioteca Nacional", "Calle Mayor, 10")

print(f"La Biblioteca {biblioteca.nombre}, está ubicada en {biblioteca.direccion}")

# Agregar lectores a la biblioteca
print(biblioteca.agregar_lector("Juan", "Perez"))
print(biblioteca.agregar_lector("Ana", "Gonzalez"))
print(biblioteca.agregar_lector("Juan", "Perez")) 
print(biblioteca.agregar_lector("Juan", "Gonzalez"))
print(biblioteca.agregar_lector("Juan", "Gonzalez")) # Intento agregar un lector que ya existe

# Agregar libros a la biblioteca
print(biblioteca.agregar_libro("Miguel de Cervantes","Don Quijote",2))
print(biblioteca.agregar_libro("Miguel de Cervantes","El Quijote",5))
print(biblioteca.agregar_libro("Miguel de Cervantes","Don Quijote",1))
print(biblioteca.agregar_libro("Miguel Lara","Don Quijote",7))
print(biblioteca.agregar_libro("Rafa de Cervantes","Yo y yo",1))


print("\nLista de libros en la biblioteca:")
print(biblioteca.mostrar_libros())

print(biblioteca.reservar("Don Quijote","Miguel de Cervantes","Juan", "Gonzalez"))