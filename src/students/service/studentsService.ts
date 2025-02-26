import { showErrorModal } from "../../dom/index.js";
import { Student } from "../../types.js";
import { generateId } from "../../utils.js";

export const getStudentsTotal = (students: Student[]): number => {
  return students.length;
};

export const addStudent = (
  students: Student[],
  studentName: string,
  studentLastName: string,
  studentAge: number,
  studentEmail: string,
  studentPhoneNumber: string
): void => {
  const newStudent: Student = {
    id: generateId(students),
    name: studentName,
    lastName: studentLastName,
    age: studentAge,
    email: studentEmail,
    phoneNumber: studentPhoneNumber,
  };

  const maxNameLength = 60;
  const maxEmailLength = 320;
  const maxAge = 120;
  const emailPattern = /^[^@]+@[^@]+\.[^@]+$/;
  const spanishNumberPattern = /^(\+?34)?(6\d{2}|7[1-9]\d{1})\d{6}$/;

  const areValidValues =
    studentName.length <= maxNameLength &&
    studentLastName.length <= maxNameLength &&
    studentAge <= maxAge &&
    studentEmail.length <= maxEmailLength &&
    emailPattern.test(studentEmail) &&
    spanishNumberPattern.test(studentPhoneNumber);

  if (!areValidValues) {
    showErrorModal("Error en algún valor introducido. Inténtelo de nuevo");
    return;
  }

  const studentAlreadyExists = students.some(
    (student) =>
      student.name === newStudent.name &&
      student.lastName === newStudent.lastName &&
      (student.phoneNumber === newStudent.phoneNumber ||
        student.email === newStudent.email)
  );

  if (studentAlreadyExists) {
    showErrorModal("El estudiante que has introducido ya existe.");
    return;
  }

  students.push(newStudent);
};

export const deleteStudent = (students: Student[], studentId: number): void => {
  const indexOfStudentToDelete = students.findIndex(
    (student) => student.id === studentId
  );

  if (indexOfStudentToDelete === -1) {
    showErrorModal("Error: no se ha encontrado el estudiante.");
  }

  students.splice(indexOfStudentToDelete, 1);
};

export const getStudentsOptions = (
  students: Student[]
): { id: number; name: string; lastName: string }[] => {
  return students.map((student) => ({
    id: student.id,
    name: student.name,
    lastName: student.lastName,
  }));
};

// Crea una función para obtener el nombre completo de un estudiante por su id
// La función debe recibir un array de estudiantes y el id del estudiante
// export const getStudentNameById =
