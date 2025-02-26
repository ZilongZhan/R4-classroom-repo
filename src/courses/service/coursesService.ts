import { showErrorModal } from "../../dom/index.js";
import { Course } from "../../types";
import { generateId } from "../../utils.js";

// Crea una función para obtener el total de cursos
// La función debe recibir un array de cursos y devolver el total de cursos
export const getCoursesTotal = (courses: Course[]): number => {
  return courses.length;
};

// Crea una función para añadir un curso a la lista de cursos
// La función debe recibir un array de cursos y el nombre del curso a añadir
// Si el curso ya existe en la lista, muestra un error con showErrorModal
export const addCourse = (courses: Course[], courseName: string): void => {
  const newCourse: Course = {
    id: generateId(courses),
    name: courseName,
  };

  const minNameLength = 1;
  const maxNameLength = 255;

  const isValidName =
    courseName.length >= minNameLength && courseName.length <= maxNameLength;

  if (!isValidName) {
    showErrorModal("Error en algún valor introducido. Inténtelo de nuevo");
    return;
  }

  const courseAlreadyExists = courses.some(
    (course) => course.name === courseName
  );

  if (courseAlreadyExists) {
    showErrorModal("El curso que has introducido ya existe.");
    return;
  }

  courses.push(newCourse);
};

export const deleteCourse = (courses: Course[], courseId: number): void => {
  const indexOfCourseToDelete = courses.findIndex(
    (course) => course.id === courseId
  );

  if (indexOfCourseToDelete === -1) {
    showErrorModal("Error: no se ha encontrado el curso.");
    return;
  }

  courses.splice(indexOfCourseToDelete, 1);
};

// Crea una función para obtener las opciones de cursos para rellenar un select
// La función debe recibir un array de cursos
// La función debe devolver un array de objetos con dos propiedades: id y name
// La propiedad id debe ser el id del curso
// La propiedad name debe ser el nombre del curso
// export const getCoursesOptions =
