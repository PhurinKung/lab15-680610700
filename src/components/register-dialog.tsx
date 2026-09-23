import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "@/components/ui/combobox"

import { courses, currentStudent, enrollments as initialEnrollments } from "@/lib/mock-data";
import type { Course } from "@/lib/types";

type RegisterData = {
  studentId: string,
  courseId: string;
  enrolledAt: string;
};

export function RegisterDialog() {
  const [open, setOpen] = useState(false); // true = แสดง Dialog
  const [courseId, setCourseId] = useState("");

  const [enrollments, setEnrollments] = useState(initialEnrollments);
  const [studentCourses, setStudentCourses] = useState(currentStudent.courses || []);

  function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault(); // ไม่ให้หน้าเว็บ reload
    
    currentStudent.courses?.push(courseId);
    
    const formData = new FormData(e.currentTarget);
    const submittedTime = formData.get("time"); 
    
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    
    // Stitch it together using the submittedTime
    const fullEnrollmentTime = `${year}-${month}-${day}T${submittedTime}:00`;
    enrollments.push({
      studentId: currentStudent.studentId,
      courseId: courseId,
      enrolledAt: fullEnrollmentTime,
    })
    // console.log(fullEnrollmentTime);
    setCourseId(""); // เคลียร์ฟอร์ม
    setOpen(false); // ปิด Dialog
  }

  const currentTime = new Date().toTimeString().slice(0, 5); //so only get 23:45 the format html 
  
  const availableCourses = courses.filter(
    (course) => !(currentStudent.courses || []).includes(course.courseId)
  );

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {/* ปุ่มที่กดแล้วเปิด Dialog */}
      <DialogTrigger>
        <Button>ลงทะเบียน</Button>
      </DialogTrigger>

      {/* ฟอร์มที่แสดงออกมาเมื่อกดปุ่ม */}
      <DialogContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <DialogHeader>
            <DialogTitle>ลงทะเบียนเรียน</DialogTitle>
            <DialogDescription>เลือกวิชาที่ต้องการลงทะเบียน แล้วกรอกข้อมูลให้ครบ</DialogDescription>
          </DialogHeader>

          <div className="grid min-w-0 gap-4">
            <div className="grid min-w-0 gap-2">
              <Label htmlFor="Course">วิชา</Label>
              <Combobox 
                  value={courseId} 
                  onValueChange={(value) => setCourseId(value || "")}
                  items={availableCourses}
                  // itemToStringValue={(c: Course) => `${c.courseId} - ${c.courseTitle}`}
                >
                <ComboboxInput placeholder="เลือกวิชา" />
                <ComboboxContent>
                  <ComboboxList>
                    {availableCourses.map((c) =>(
                    <ComboboxItem key={c.courseId} value={c.courseId} >
                      {c.courseId} - {c.courseTitle}
                     </ComboboxItem> 
                    ))}
                  </ComboboxList>
                </ComboboxContent>
              </Combobox>
            </div>

            <div className="space-y-2">
              <Label htmlFor="Time">เวลา</Label>
              <Input id="Time" name="time" type="time" defaultValue={currentTime} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="fullName">ชื่อ นศ.</Label>
              <Input id="fullName" placeholder={currentStudent.firstName + "  " + currentStudent.lastName } readOnly/>
            </div>

            <div className="space-y-2">
              <Label htmlFor="Program">โปรแกรม</Label>
              <Input id="Program" placeholder={currentStudent.program} readOnly/>
            </div>
            
          </div>

          <DialogFooter>
            <Button type="submit" disabled={!courseId} >ยืนยันการลงทะเบียน</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
