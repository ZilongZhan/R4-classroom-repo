import { courses, grades, students } from "../../index.js";
import { getStudentsOptions } from "../../students/service/studentsService.js";
// import { getCoursesOptions } from "../../courses/service/coursesService.js";
import { Grade } from "../../types.js";
import {
  //   addGrade,
  //   deleteGrade,
  //   getGradeFullData,
  getGradesTotal,
} from "../service/gradesService.js";
import { gradesStorage } from "../../storage/Storage.js";

const gradesTable = document.querySelector(".table.grades tbody");
const gradesForm = document.querySelector(".form.new-grade") as HTMLFormElement;
const studentsSelect = gradesForm.querySelector("#student");
const gradesCounter = document.querySelector(".counter");

if (!gradesTable || !gradesForm || !studentsSelect || !gradesCounter) {
  throw new Error("Missing elements");
}

getStudentsOptions(students).forEach(({ id, name, lastName }) => {
  const option = document.createElement("option");
  option.value = `${id}`;
  option.textContent = `${name} ${lastName}`;

  studentsSelect.appendChild(option);
});

/* getCoursesOptions(courses).forEach(({ id, name }) => {
  const option = document.createElement("option");
  option.value = `${id}`;
  option.textContent = name;

  const coursesSelect = gradesForm.querySelector("#course");
  coursesSelect?.appendChild(option);
}); */

export const renderGradesTable = (): void => {
  gradesTable.innerHTML = "";

  grades.forEach((grade) => {
    createGradeRow(grade);
  });

  gradesCounter.textContent = `${getGradesTotal(grades)}`;
};

const createGradeRow = (grade: Grade): void => {
  // const gradeData = getGradeFullData(grade);

  const row = document.createElement("tr");
  /* row.innerHTML = `
    <tr>
      <td>${gradeData.studentName}</td>
      <td>${gradeData.studentLastName}</td>
      <td>${gradeData.courseName}</td>
      <td>${gradeData.value}</td>
      <td><button class="button">borrar</button></td>
    </tr>
  `; */

  row.querySelector("button")?.addEventListener("click", () => {
    // deleteGrade(grades, grade.id);
    gradesStorage.save(grades);

    renderGradesTable();
  });

  gradesTable.appendChild(row);
};

gradesForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const gradeStudentId = gradesForm.querySelector(
    "#student"
  ) as HTMLSelectElement;
  const gradeCourseId = gradesForm.querySelector(
    "#course"
  ) as HTMLSelectElement;
  const gradeValue = gradesForm.querySelector("#grade") as HTMLInputElement;

  /* addGrade(
    grades,
    +gradeStudentId.value,
    +gradeCourseId.value,
    +gradeValue.value
  ); */
  gradesStorage.save(grades);

  renderGradesTable();

  gradesForm.reset();
});
