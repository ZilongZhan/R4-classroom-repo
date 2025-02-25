import { students } from "../../index.js";
import { studentsStorage } from "../../storage/Storage.js";
import {
  addStudent,
  deleteStudent,
  getStudentsTotal,
} from "../service/studentsService.js";
import { Student } from "../../types.js";

const studentsTable = document.querySelector(".table.students tbody");
const studentsForm = document.querySelector(
  ".form.new-student"
) as HTMLFormElement;
const studentsCounter = document.querySelector(".counter");

if (!studentsTable || !studentsForm || !studentsCounter) {
  throw new Error("Missing elements");
}

export const renderStudentsTable = (): void => {
  studentsTable.innerHTML = "";

  students.forEach((student) => {
    createStudentRow(student);
  });

  studentsCounter.textContent = `${getStudentsTotal(students)}`;
};

const createStudentRow = (student: Student): void => {
  const row = document.createElement("tr");
  row.innerHTML = `
    <tr>
      <td>${student.name}</td>
      <td>${student.lastName}</td>
      <td>${student.age}</td>
      <td>${student.email}</td>
      <td>${student.phoneNumber}</td>
      <td><button type="submit">borrar</button></td>
    </tr>
  `;

  row.querySelector("button")?.addEventListener("click", () => {
    deleteStudent(students, student.id);
    studentsStorage.save(students);

    renderStudentsTable();
  });

  studentsTable.appendChild(row);
};

studentsForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const studentName = studentsForm.querySelector("#name") as HTMLInputElement;
  const studentLastName = studentsForm.querySelector(
    "#lastname"
  ) as HTMLInputElement;
  const studentAge = studentsForm.querySelector("#age") as HTMLInputElement;
  const studentEmail = studentsForm.querySelector("#email") as HTMLInputElement;
  const studentPhoneNumber = studentsForm.querySelector(
    "#phone"
  ) as HTMLInputElement;

  addStudent(
    students,
    studentName.value,
    studentLastName.value,
    +studentAge.value,
    studentEmail.value,
    studentPhoneNumber.value
  );
  studentsStorage.save(students);

  renderStudentsTable();

  studentsForm.reset();
});
