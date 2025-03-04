import { courses, students } from "../../index.js";
import { showErrorModal } from "../../dom/index.js";
import { Grade } from "../../types";
import { generateId } from "../../utils.js";

export const getGradesTotal = (grades: Grade[]): number => {
  return grades.length;
};

export const getGradeFullData = (
  grade: Grade
): {
  id: number;
  studentId: number;
  courseId: number;
  value: number;
  studentName: string;
  studentLastName: string;
  courseName: string;
} => {
  const student = students.find((student) => student.id === grade.studentId)!;
  const course = courses.find((course) => course.id === grade.courseId)!;

  if (!student || !course) {
    return {
      ...grade,
      value: 0,
      studentName: "(no disponible)",
      studentLastName: "(no disponible)",
      courseName: "(no disponible)",
    };
  }

  const studentName = student.name;
  const studentLastName = student.lastName;
  const courseName = course.name;

  return { ...grade, studentName, studentLastName, courseName };
};

export const deleteGrade = (grades: Grade[], gradeId: number): void => {
  const indexOfGradeToDelete = grades.findIndex(
    (grade) => grade.id === gradeId
  );

  if (indexOfGradeToDelete === -1) {
    showErrorModal("Error: la nota no existe.");
  }

  grades.splice(indexOfGradeToDelete, 1);
};

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
  const isValidStudentId = students.find((student) => student.id === studentId);
  const isValidCourseId = courses.find((course) => course.id === courseId);

  if (!isValidGrade || !isValidStudentId || !isValidCourseId) {
    showErrorModal("Error: datos introducidos no válidos.");
    return;
  }

  const gradeAlreadyExists = grades.some(
    (grade) => grade.studentId === studentId && grade.courseId === courseId
  );

  if (gradeAlreadyExists) {
    showErrorModal(
      "La nota que has introducido ya existe para este estudiante."
    );
    return;
  }

  grades.push(newGrade);
};
