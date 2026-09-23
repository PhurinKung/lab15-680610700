import { CourseCard } from "@/components/course-card";
import { useState } from "react";
import { RegisterDialog } from "@/components/register-dialog2";
import { courses, currentStudent, enrollments as initialEnrollments} from "@/lib/mock-data";

type RegisterData = {
  studentId: string,
  courseId: string;
  enrolledAt: string;
};

export default function Enrollent() {
  const [enrollments, setEnrollments] = useState(initialEnrollments);
  const [studentCourses, setStudentCourses] = useState(currentStudent.courses || []);

  const handleRegister = (data: RegisterData) => {
    // setEnrollments((prev) => [
    //   ...prev,
    //   data,
    // ]);

    setEnrollments([...enrollments, data]);
    setStudentCourses([...studentCourses, data.courseId]);
  };

  const handleCancel = (courseId: string) => {
    setEnrollments((prev) =>
      prev.filter((e) => e.courseId !== courseId)
    );
    setStudentCourses(studentCourses.filter((id) => id !== courseId));
  };

  return (
    <div className="space-y-4">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-xl font-semibold">รายวิชาทั้งหมด</h1>
          <p className="text-sm text-muted-foreground">Phichamon</p>
        </div>
          <RegisterDialog onRegister={handleRegister} registeredCourses={studentCourses} />
        </div>

      <div className="flex flex-col gap-4">
        {courses.map((course) => {
          const enrollment = enrollments.find(
            (entry) => entry.courseId === course.courseId
          );

          return (
            <CourseCard
              key={course.courseId}
              course={course}
              student={currentStudent}
              enrolledAt={enrollment?.enrolledAt}
              onCancel={handleCancel}
            />
          );
        })}
      </div>
    </div>
  );
}
