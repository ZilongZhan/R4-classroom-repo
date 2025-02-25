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

  if (!indexOfStudentToDelete) {
    throw new Error("Error: no se ha encontrado el estudiante.");
  }

  students.splice(indexOfStudentToDelete, 1);
};

// Crea una función para obtener las opciones de estudiantes para rellenar un select
// La función debe recibir un array de estudiantes
// La función debe devolver un array de objetos con tres propiedades: id, name y lastName
// La propiedad id debe ser el id del estudiante
// La propiedad name debe ser el nombre del estudiante
// La propiedad lastName debe ser el apellido del estudiante
// export const getStudentsOptions =

// Crea una función para obtener el nombre completo de un estudiante por su id
// La función debe recibir un array de estudiantes y el id del estudiante
// export const getStudentNameById =
