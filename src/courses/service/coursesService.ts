import { showErrorModal } from "../../dom/index.js";
import { Course } from "../../types";
import { generateId } from "../../utils.js";

export const getCoursesTotal = (courses: Course[]): number => {
  return courses.length;
};

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
    showErrorModal("Nombre introducino no válido. Inténtelo de nuevo.");
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
    showErrorModal("Error: el curso no existe.");
    return;
  }

  courses.splice(indexOfCourseToDelete, 1);
};

export const getCoursesOptions = (
  courses: Course[]
): { id: number; name: string }[] => {
  return courses.map((course) => ({ id: course.id, name: course.name }));
};
