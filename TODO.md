[5:06 p. m., 1/5/2020] Profesor Augusto Salazar: Hola de nuevo, con Franklin estuvimos trabajando en una propuesta para simplificar los JSON
[5:06 p. m., 1/5/2020] Profesor Augusto Salazar: Reducir en todos los JSON información de created_at, updated_at, db_id
Quitar el sistema de paginado
[5:06 p. m., 1/5/2020] Profesor Augusto Salazar: GetCourses:
Array => Course[
-Id
-Nombre
-Nombre del profesor
-Cantidad de estudiantes]

GetCoursebyID:
-Nombre
-Profesor[
-Id
-Nombre
-nombre de usuario
-email]
-Array => Estudiante[
-Id
-Nombre
-nombre de usuario
-email]

getProfessors:
Array => Profesor[
-Id
-Nombre
-nombre de usuario
-email]

getProfessorbyID:
-Nombre
-nombre de usuario
-telefono
-email
-fecha de nacimiento
-pais,ciudad
-idCurso

getStudents:
Array => Profesor[
-Id
-Nombre
-nombre de usuario
-email]

getStudentbyID:
-Nombre
-nombre de usuario
-telefono
-email
-fecha de nacimiento
-pais,ciudad
-idCurso