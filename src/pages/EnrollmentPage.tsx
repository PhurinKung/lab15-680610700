import { CourseCard } from "@/components/course-card";
import { useState } from "react";
import { RegisterDialog } from "@/components/register-dialog2";
import { courses, currentStudent, enrollments } from "@/lib/mock-data";

type RegisterData = {
  studentId: string,
  courseId: string;
  time: string;
};

export default function Enrollent() {
  const [enroll, setEnrollments] = useState<RegisterData[]>([]);
  const fullName = `${currentStudent.firstName} ${currentStudent.lastName}`;

  const handleRegister = (data: RegisterData) => {
    setEnrollments((prev) => [
      ...prev,
      data,
    ]);
  };

  const handleCancel = (courseId: string) => {
    setEnrollments((prev) =>
      prev.filter((e) => e.courseId !== courseId)
    );
  };

  return (
    <div className="space-y-4">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-xl font-semibold">รายวิชาทั้งหมด</h1>
          <p className="text-sm text-muted-foreground">Phichamon</p>
        </div>
          <RegisterDialog onRegister={handleRegister} enrollments={enrollments}/>
        </div>

      <div className="flex flex-col gap-4">
        {courses.map((course) => (
          <CourseCard
            key={course.courseId}
            course={course}
            student={currentStudent}
            enrolledAt={enrollments?.}
            onCancel={handleCancel}
          />
        ))}
      </div>
    </div>
  );
}
