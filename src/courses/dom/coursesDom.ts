import { courses } from "../../index.js";
import { coursesStorage } from "../../storage/Storage.js";
import { Course } from "../../types.js";
import {
  // addCourse,
  // deleteCourse,
  getCoursesTotal,
} from "../service/coursesService.js";

const coursesTable = document.querySelector(".table.courses tbody");
const coursesForm = document.querySelector(
  ".form.new-course"
) as HTMLFormElement;
const coursesCounter = document.querySelector(".counter");

if (!coursesTable || !coursesForm || !coursesCounter) {
  throw new Error("Missing elements");
}

export const renderCoursesTable = (): void => {
  coursesTable.innerHTML = "";

  courses.forEach((course) => {
    createCourseRow(course);
  });

  coursesCounter.textContent = `${getCoursesTotal(courses)}`;
};

const createCourseRow = (course: Course): void => {
  const row = document.createElement("tr");
  row.innerHTML = `
    <tr>
      <td>${course.name}</td>
      <td><button class="button">borrar</button></td>
    </tr>
  `;

  row.querySelector("button")?.addEventListener("click", () => {
    // deleteCourse(courses, course.id);
    coursesStorage.save(courses);

    renderCoursesTable();
  });

  coursesTable.appendChild(row);
};

coursesForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const courseName = coursesForm.querySelector("#name") as HTMLInputElement;

  //addCourse(courses, courseName.value);
  coursesStorage.save(courses);

  renderCoursesTable();

  coursesForm.reset();
});
