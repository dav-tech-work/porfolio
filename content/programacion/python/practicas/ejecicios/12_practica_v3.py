import json
import os
from datetime import datetime, timedelta

class Lector:
    def __init__(self, nombre, apellido):
        self.nombre, self.apellido = nombre, apellido
        self.reservas = {}  # {titulo: fecha_devolucion}

    def __str__(self):
        return f"{self.nombre} {self.apellido} ({len(self.reservas)} reservas)"

    def reservas_vencidas(self):
        hoy = datetime.now().date()
        return [titulo for titulo, fecha in self.reservas.items() if datetime.strptime(fecha, "%Y-%m-%d").date() < hoy]

class Libro:
    def __init__(self, autor, titulo, stock=1):
        self.autor, self.titulo, self.stock = autor, titulo, stock
        self.lista_espera = []

    def __str__(self):
        return f"'{self.titulo}' de {self.autor} (Stock: {self.stock})"

class Biblioteca:
    DATA_FILE = "biblioteca.json"

    def __init__(self, nombre, direccion):
        self.nombre, self.direccion = nombre, direccion
        self.lectores, self.libros = {}, {}
        self.cargar_datos()

    def guardar_datos(self):
        datos = {
            "lectores": {k: {"nombre": v.nombre, "apellido": v.apellido, "reservas": v.reservas} for k, v in self.lectores.items()},
            "libros": {k: {"autor": v.autor, "titulo": v.titulo, "stock": v.stock, "lista_espera": [l.nombre + " " + l.apellido for l in v.lista_espera]} for k, v in self.libros.items()}
        }
        with open(self.DATA_FILE, "w") as f:
            json.dump(datos, f, indent=4)

    def cargar_datos(self):
        if not os.path.exists(self.DATA_FILE):
            return
        with open(self.DATA_FILE, "r") as f:
            datos = json.load(f)
        self.lectores = {k: Lector(v["nombre"], v["apellido"]) for k, v in datos["lectores"].items()}
        for k, v in datos["lectores"].items():
            self.lectores[k].reservas = v["reservas"]
        self.libros = {k: Libro(v["autor"], v["titulo"], v["stock"]) for k, v in datos["libros"].items()}

    def agregar_lector(self, nombre, apellido):
        clave = f"{nombre} {apellido}"
        if clave in self.lectores:
            return f"❌ {clave} ya registrado."
        self.lectores[clave] = Lector(nombre, apellido)
        self.guardar_datos()
        return f"✅ Lector {clave} agregado."

    def agregar_libro(self, autor, titulo, stock=1):
        clave = titulo.lower()
        self.libros.setdefault(clave, Libro(autor, titulo, 0)).stock += stock
        self.guardar_datos()
        return f"✅ '{titulo}' agregado. Stock: {self.libros[clave].stock}"

    def busca_libro(self, titulo):
        return str(self.libros.get(titulo.lower(), f"❌ '{titulo}' no disponible."))

    def reservar_libro(self, nombre, apellido, titulo):
        clave_lector = f"{nombre} {apellido}"
        clave_libro = titulo.lower()
        lector, libro = self.lectores.get(clave_lector), self.libros.get(clave_libro)

        if not lector: return "❌ Lector no registrado."
        if not libro: return "❌ Libro no disponible."

        if libro.stock > 0:
            libro.stock -= 1
            fecha_devolucion = (datetime.now() + timedelta(days=30)).strftime("%Y-%m-%d")
            lector.reservas[clave_libro] = fecha_devolucion
            self.guardar_datos()
            return f"✅ {nombre} reservó '{titulo}'. Devolver antes de: {fecha_devolucion}"
        
        libro.lista_espera.append(lector)
        self.guardar_datos()
        return f"📌 Sin stock. {nombre} en lista de espera."

    def devolver_libro(self, nombre, apellido, titulo):
        clave_lector = f"{nombre} {apellido}"
        clave_libro = titulo.lower()
        lector, libro = self.lectores.get(clave_lector), self.libros.get(clave_libro)

        if not lector or clave_libro not in lector.reservas:
            return f"❌ No tiene '{titulo}'."

        del lector.reservas[clave_libro]
        libro.stock += 1

        if libro.lista_espera:
            siguiente_lector = libro.lista_espera.pop(0)
            fecha_devolucion = (datetime.now() + timedelta(days=30)).strftime("%Y-%m-%d")
            siguiente_lector.reservas[clave_libro] = fecha_devolucion
            libro.stock -= 1
            self.guardar_datos()
            return f"🔄 '{titulo}' pasa a {siguiente_lector.nombre} {siguiente_lector.apellido}. Devolver antes de {fecha_devolucion}."

        self.guardar_datos()
        return f"✅ '{titulo}' devuelto. Stock: {libro.stock}."

    def mostrar_libros(self):
        return "\n".join(map(str, self.libros.values())) or "📖 No hay libros."

    def mostrar_lectores(self):
        return "\n".join(map(str, self.lectores.values())) or "👤 No hay lectores."

    def mostrar_reservas_vencidas(self):
        vencidos = {lector: l.reservas_vencidas() for lector, l in self.lectores.items() if l.reservas_vencidas()}
        return vencidos if vencidos else "✅ No hay reservas vencidas."

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
print("\n📅 Reservas vencidas:\n", biblioteca.mostrar_reservas_vencidas())
