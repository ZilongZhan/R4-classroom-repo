import { getStudentNameById } from "../../students/service/studentsService.js";
import { Course, CourseStats, Student } from "../../types";
import { getCourseStats } from "../service/statsService.js";

const coursesList = document.querySelector(".statistics");

if (!coursesList) {
  throw new Error("Missing elements");
}

export const renderStatsCards = (courses: Course[], students: Student[]) => {
  coursesList.innerHTML = "";

  courses.forEach((course) => {
    const stats = getCourseStats(course.id);
    createStatCard(course, students, stats);
  });
};

const createStatCard = (
  course: Course,
  students: Student[],
  stats: CourseStats
) => {
  const card = document.createElement("article");
  card.classList.add("statistics__card");

  card.innerHTML = `
    <h3 class="statistics__title">${course.name}</h3>
    <p>Estudiantes: ${stats.studentsCount}</p>`;

  if (stats.studentsCount > 0) {
    card.innerHTML += `
      <p>Aprobados: ${stats.passedCount} (${stats.passedCountPercentage.toFixed(
      2
    )}%)</p>
      <p>Suspensos: ${stats.failedCount} (${stats.failedCountPercentage.toFixed(
      2
    )}%)</p>
      <p>Nota media: ${stats.averageGrade.toFixed(2)}</p>
      <p>Nota máxima: ${stats.highestGrade} (${getStudentNameById(
      students,
      stats.highestGradeStudentId
    )})</p>
    `;
  }

  coursesList.appendChild(card);
};
