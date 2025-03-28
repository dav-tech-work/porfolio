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

# Creacion Clase 
class Libro():
    """
    Definiendo el contructor con los atributos:\n
    - Autor: Nombre y Apellidos\n
    - Titulo: Titulo del libro\n
    - Cantidad: Atributo oculto\n
    """
    def __init__(self, autor, titulo, stock=1): #
        self.autor = autor
        self.titulo = titulo
        self.stock = stock

    def __str__(self):
        return f"Libro {self.titulo} del autor {self.autor} con {self.stock} ejemplares"

# Creacion Clase 
class Lector():
    def __init__(self, nombre, apellido): 
        """ Constructor con los atributos:\n
        - Nombre: Nombre del lector\n
        - Apellido: Apellido del lector\n
        """
        self.nombre = nombre
        self.apellido = apellido
    def __str__(self):
        return f"Lector: {self.nombre} {self.apellido}"

# Creacion Clase 
class Biblioteca():
    def __init__(self, nombre, direccion):
        """ Constructor con los atributos:\n
        - Nombre: Nombre de la Biblioteca\n
        - Direccion: Direccion de la Biblioteca\n
        - Lista_libros: Lista de libros disponibles\n
        - Lista_lectores: Lista de lectores registrados\n
        - Diccio_reservas: Diccionario con las reservas del lector\n
        - Libros_prestados: Lista de libros prestados\n
        """
        self.nombre = nombre
        self.direccion = direccion
        self.lista_libros = []
        self.lista_lectores = []
        self.diccio_reservas = {}
        self.libros_prestados = []

    def __str__(self):
        return f"Bienvenido a la Biblioteca {self.nombre}, ubicada en {self.direccion}"
    
    def agregar_lector(self, nombre, apellido):
        """
        Agrega un lector a la biblioteca\n
        Atributos:\n
        - Nombre: Nombre del lector\n
        - Apellido: Apellido del lector\n
        """
        for lector in self.lista_lectores: # Para el objeto lector en la lista lectores 
            if lector.nombre == nombre and lector.apellido == apellido: # Si el nombre y el apellido estan 
                return "Lector ya existe" # informa de que el lector esta

        # Si no existe, se agrega
        nuevo_lector = Lector(nombre, apellido) # Crea un nuevo objeto con los datos
        self.lista_lectores.append(nuevo_lector) # añade a la lista lectores el nuevo lector
        return "Lector agregado con éxito" # Muestra en pantalla el mensaje

    # Creacion del metodo para agregar un Libro
    def agregar_libro(self, autor, titulo, stock=1): #nombre_autor,apellido_autor
        """
        Agrega un libro a la biblioteca.
        Si el libro ya existe, aumenta su stock.
        Atributos:\n
        autor (str): Nombre del autor.\n
        titulo (str): Título del libro.\n
        stock (int): Cantidad de ejemplares. Por defecto es 1.\n
        """
        for libro in self.lista_libros: # para cada libro dentro de self.libros
            if libro.autor == autor and libro.titulo == titulo: # compara el autor y el titulo en self.libros
                libro.stock += stock # añade al stock del libro 1
                return f"Se han añadido {stock} ejemplares del libro '{titulo}' de {autor}."
            
        # Si no existe, se agrega
        nuevo_libro = Libro(autor, titulo, stock) # Crea un objeto de la clase libro
        self.lista_libros.append(nuevo_libro) # añade el nuevo objeto a la lista self.libro
        return f"Libro '{titulo}' de {autor} agregado con {stock} ejemplares."

    # Creacion del metodo para buscar libro
    def busca_libro(self, autor, titulo):
        """
        Busca un libro por autor y título. Devuelve una cadena con la información del libro o un mensaje indicando que el libro no está en la biblioteca.
        atributo:\n
        autor (str): Nombre del autor del libro.\n
        titulo (str): Título del libro.\n
        """
        for libro in self.lista_libros:  # para libro en la self.libros 
            if libro.autor == autor and libro.titulo == titulo: # compara tanto el titulo como el autor
                return f"El libro '{titulo}' de {autor} está disponible con {libro.stock} ejemplares."
        return f"El libro '{titulo}' de {autor} no está en la biblioteca."

    # Creacion del metodo para mostrar los libros
    def mostrar_libros(self):
        if not self.lista_libros: # si el libro no esta registrado muestra el mensaje
            return "La biblioteca no tiene libros registrados."
        return "\n".join(str(libro) for libro in self.lista_libros) # si el libro esta registrado muestra todos
    
    # Creacion del metodo para prestar un libro
    def prestar_libro(self, autor, titulo, nombre, apellido):
        """
        Añade un libro a la lista de reservas del lector. Si el libro está disponible, se reduce su stock en uno.
        Añade el lector a la lista de reservas del libro.
        Atributos:\n
        autor (str): Nombre del autor del libro.\n
        titulo (str): Título del libro.\n
        nombre (str): Nombre del lector.\n
        apellido (str): Apellido del lector.\n
        """
        for libro in self.lista_libros:  # para libro en la self.libros 
            if libro.autor == autor and libro.titulo == titulo and libro.stock > 0: # compara tanto el titulo como el autor y si hay stock
                libro.stock -= 1 # resta un ejemplar del stock
                for lector in self.lista_lectores: # para cada lector en la lista lectores 
                    if lector.nombre == nombre and lector.apellido == apellido: # si el nombre y el apellido estan 
                        if libro not in self.diccio_reservas: # si el libro no esta en la lista lo añade con una lista vacia 
                            self.diccio_reservas[libro] = [] # si el libro no esta en la lista lo añade con una lista vacia 
                        self.diccio_reservas[libro].append(lector) # añade el lector a la lista de reservas del libro 
                        self.libros_prestados.append(libro) # añade el libro a la lista libros_prestados del lector
                        return f"El libro '{titulo}' de {autor} ha sido prestado a {nombre} {apellido}."
        return f"El libro '{titulo}' de {autor} no está disponible para prestar."   
    
    # Creacion del metodo devolucion de los libros
    def devolucion(self, nombre, apellido, titulo, autor): # recibe el nombre y el apellido del lector y el titulo y el autor del libro 
        """
        Devuelve un libro prestado a un lector.
        Para que un libro pueda ser devuelto, debe estar en la lista de libros prestados.
        Atributos:\n
        - nombre: Nombre del lector\n
        - apellido: Apellido del lector\n
        - titulo: Titulo del libro\n
        - autor: Autor del libro\n
        """
        for libro in self.libros_prestados: # para cada libro en la lista libros_prestados 
            if libro.autor == autor and libro.titulo == titulo: # si el autor y el titulo coinciden
                for lector in self.lista_lectores: # para cada lector en la lista lectores 
                    if lector.nombre == nombre and lector.apellido == apellido: # si el nombre y el apellido del lector coinciden 
                        self.diccio_reservas[libro].remove(lector) # elimina el lector de la lista de reservas del libro 
                        self.libros_prestados.remove(libro) # elimina el libro de la lista libros_prestados del lector 
                        libro.stock += 1 # incrementa el stock del libro
                        return f"El libro '{titulo}' de {autor} ha sido devuelto por {nombre} {apellido}."
        return "No se ha encontrado un libro con esas características o no está prestado a este lector."    

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

print(biblioteca.prestar_libro("Miguel de Cervantes", "Don Quijote", "Juan", "Gonzalez"))
print(biblioteca.devolucion("Juan", "Gonzalez", "Don Quijote", "Miguel de Cervantes"))