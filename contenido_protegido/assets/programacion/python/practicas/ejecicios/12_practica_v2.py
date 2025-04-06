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
 
class Lector:
    def __init__(self, nombre, apellido):
        self.nombre, self.apellido = nombre, apellido
        self.reservas = set()  # Evita reservas duplicadas

    def __str__(self):
        return f"{self.nombre} {self.apellido} ({len(self.reservas)} reservas)"


class Libro:
    def __init__(self, autor, titulo, stock=1):
        self.autor, self.titulo, self.stock = autor, titulo, stock
        self.lista_espera = []

    def __str__(self):
        return f"'{self.titulo}' de {self.autor} (Stock: {self.stock})"


class Biblioteca:
    def __init__(self, nombre, direccion):
        self.nombre, self.direccion = nombre, direccion
        self.lectores, self.libros = {}, {}

    def agregar_lector(self, nombre, apellido):
        if (clave := f"{nombre} {apellido}") in self.lectores:
            return f"❌ {clave} ya registrado."
        self.lectores[clave] = Lector(nombre, apellido)
        return f"✅ Lector {clave} agregado."

    def agregar_libro(self, autor, titulo, stock=1):
        clave = titulo.lower()
        self.libros.setdefault(clave, Libro(autor, titulo, 0)).stock += stock
        return f"✅ '{titulo}' agregado. Stock: {self.libros[clave].stock}"

    def busca_libro(self, titulo):
        return str(self.libros.get(titulo.lower(), f"❌ '{titulo}' no disponible."))

    def reservar_libro(self, nombre, apellido, titulo):
        lector, libro = self.lectores.get(f"{nombre} {apellido}"), self.libros.get(titulo.lower())
        if not lector: return "❌ Lector no registrado."
        if not libro: return "❌ Libro no disponible."

        if libro.stock > 0:
            libro.stock -= 1
            lector.reservas.add(libro)
            return f"✅ {nombre} reservó '{titulo}'. Stock: {libro.stock}"
        
        libro.lista_espera.append(lector)
        return f"📌 Sin stock. {nombre} en lista de espera."

    def devolver_libro(self, nombre, apellido, titulo):
        lector, libro = self.lectores.get(f"{nombre} {apellido}"), self.libros.get(titulo.lower())
        if not lector or libro not in lector.reservas: return f"❌ No tiene '{titulo}'."

        lector.reservas.remove(libro)
        libro.stock += 1

        if libro.lista_espera:
            siguiente_lector = libro.lista_espera.pop(0)
            siguiente_lector.reservas.add(libro)
            libro.stock -= 1
            return f"🔄 '{titulo}' pasa a {siguiente_lector.nombre} {siguiente_lector.apellido}."

        return f"✅ '{titulo}' devuelto. Stock: {libro.stock}."

    def mostrar_libros(self):
        return "\n".join(map(str, self.libros.values())) or "📖 No hay libros."

    def mostrar_lectores(self):
        return "\n".join(map(str, self.lectores.values())) or "👤 No hay lectores."

# Creación de la biblioteca
biblioteca = Biblioteca("Biblioteca Nacional", "Calle Mayor, 10")
print(f"🏛️ {biblioteca.nombre} en {biblioteca.direccion}")

# Pruebas rápidas
print(biblioteca.agregar_lector("Juan", "Perez"))
print(biblioteca.agregar_lector("Ana", "Gonzalez"))
print(biblioteca.agregar_libro("Miguel de Cervantes", "Don Quijote", 1))

print(biblioteca.reservar_libro("Juan", "Perez", "Don Quijote"))
print(biblioteca.reservar_libro("Ana", "Gonzalez", "Don Quijote"))  # Lista de espera

print(biblioteca.devolver_libro("Juan", "Perez", "Don Quijote"))  # Pasa a Ana

print("\n📚 Libros en la biblioteca:\n", biblioteca.mostrar_libros())
print("\n👥 Lectores en la biblioteca:\n", biblioteca.mostrar_lectores())
