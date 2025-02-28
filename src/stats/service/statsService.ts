import { grades, students } from "../../index.js";
import { CourseStats } from "../../types";

export const getCourseStats = (courseId: number): CourseStats => {
  const studentsCount = students.filter((student) =>
    grades.some(
      (grade) => grade.courseId === courseId && grade.studentId === student.id
    )
  ).length;

  if (!studentsCount) {
    return {
      courseId: 0,
      studentsCount: 0,
      passedCount: 0,
      passedCountPercentage: 0,
      failedCount: 0,
      failedCountPercentage: 0,
      averageGrade: 0,
      highestGrade: 0,
      highestGradeStudentId: 0,
    };
  }

  const gradesFromThisCourse = grades
    .filter((grade) => grade.courseId === courseId)
    .sort((gradeA, gradeB) => gradeA.value - gradeB.value);
  const gradesTotal = gradesFromThisCourse.length;

  const passedExams = gradesFromThisCourse.filter((grade) => grade.value >= 5);
  const failedExams = gradesFromThisCourse.filter((grade) => grade.value < 5);

  const passedCount = passedExams.length;
  const passedCountPercentage = (passedCount / gradesTotal) * 100;

  const failedCount = failedExams.length;
  const failedCountPercentage = (failedCount / gradesTotal) * 100;

  const gradesValues = gradesFromThisCourse.map((grade) => grade.value);

  const averageGrade =
    gradesValues.reduce((gradeValue, accumulator) => gradeValue + accumulator) /
    gradesTotal;
  const highestGrade = gradesFromThisCourse.at(-1)!.value;
  const highestGradeStudentId = gradesFromThisCourse.at(-1)!.studentId;

  return {
    courseId,
    studentsCount,
    passedCount,
    passedCountPercentage,
    failedCount,
    failedCountPercentage,
    averageGrade,
    highestGrade,
    highestGradeStudentId,
  };
};
