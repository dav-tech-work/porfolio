"""
Diccionarios
"""

# Nombre
# Apellido
# Edad
# Direccion
# Asignaturas esta matriculado

# alumno = ["Pepe", "Díaz", 25, "Calle 123, 456", ["Python", "LJS"]]

# alumnos = [["Pepe", "Díaz", 25, "Calle 123, 456", ["Python", "LJS"]],
#             ["Maria", "García", 28, "Calle 456, 789", ["Java", "C++"]]
#             ]
# for nombre, apellido, edad, direccion, asignaturas in alumnos:
#     print(f"El alumno{nombre} {apellido} de{edad} años")

dic_alumno1 = {"nombre": "Pepe", "apellido": "Díaz", "edad": 25, "direccion": "Calle 123, 456", "asignaturas": ["Python", "LJS"]}
dic_alumno2 = {"nombre": "Maria", "apellido": "García", "edad": 28, "direccion": "Calle 456, 789", "asignaturas": ["Java", "C++"]}

mis_alumnos = [dic_alumno1, dic_alumno2]

# print(dic_alumno2["nombre"])
# print(mis_alumnos[0]["nombre"])

dic_alumno2["nombre"] = "Anna"

# print(mis_alumnos[1]["nombre"])

dic_alumno3 = {"nombre": "Juan", "apellido": "Pérez", "edad": 30, "direccion": "Calle 789, 123", "asignaturas": ["Python", "Django"], "beca": True}
#dic_alumno1.update(dic_alumno3)

for props in dic_alumno1:
    print(props)
print(dic_alumno1.keys())
print(dic_alumno1.values())

# print(dic_alumno1)