import { grades } from "../../index.js";
import { CourseStats } from "../../types";

export const getCourseStats = (courseId: number): CourseStats => {
  const gradesFromThisCourse = grades
    .filter((grade) => grade.courseId === courseId)
    .sort((gradeA, gradeB) => gradeA.value - gradeB.value);
  const gradesTotal = gradesFromThisCourse.length;

  if (!gradesTotal) {
    return {
      courseId,
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

  const minPassingGrade = 5;

  const passedExams = gradesFromThisCourse.filter(
    (grade) => grade.value >= minPassingGrade
  );
  const failedExams = gradesFromThisCourse.filter(
    (grade) => grade.value < minPassingGrade
  );

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
    studentsCount: gradesTotal,
    passedCount,
    passedCountPercentage,
    failedCount,
    failedCountPercentage,
    averageGrade,
    highestGrade,
    highestGradeStudentId,
  };
};
