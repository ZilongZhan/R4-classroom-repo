import { courses, students } from "../../index.js";
import { showErrorModal } from "../../dom/index.js";
import { Grade } from "../../types";
import { generateId } from "../../utils.js";

export const getGradesTotal = (grades: Grade[]): number => {
  return grades.length;
};

// Crea una función para obtener los datos completos de una nota
// La función debe recibir una nota
// La función debe devolver un objeto con las mismas propiedades de la nota
// más las propiedades studentName, studentLastName y courseName
// export const getGradeFullData =

// Crea una función para eliminar una nota de la lista de notas
// La función debe recibir un array de notas y el id de la nota a eliminar
// export const deleteGrade =

export const addGrade = (
  grades: Grade[],
  studentId: number,
  courseId: number,
  grade: number
): void => {
  const newGrade: Grade = {
    id: generateId(grades),
    studentId: studentId,
    courseId: courseId,
    value: grade,
  };

  const isValidGrade = grade >= 0 && grade <= 10;

  if (!isValidGrade) {
    showErrorModal("Error: la nota que has introducido no es válida.");
    return;
  }

  const gradeAlreadyExists = grades.some(
    (grade) => grade.studentId === studentId && grade.courseId === courseId
  );

  if (gradeAlreadyExists) {
    showErrorModal(
      "La nota que has introducido ya existe para este estudiante"
    );
    return;
  }

  grades.push(newGrade);
};
