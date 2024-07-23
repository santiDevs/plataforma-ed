import { TeacherCourse } from "src/modules/course/entities/teacher-course.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from "typeorm";
import { FileTask } from "./file-task.entity";
import { TaskStudent } from "./task-student.entity";
import { CommonEntity } from "src/Common/common.entity";

@Entity()
export class Task extends CommonEntity {
  @ManyToOne(() => TeacherCourse)
  @JoinColumn({ referencedColumnName: "id", name: "teacherCourse" })
  teacherCourse: TeacherCourse;

  @OneToMany(() => TaskStudent, (taskStudents) => taskStudents.task)
  @JoinColumn({ name: "task" })
  answer: TaskStudent[];

  @OneToMany(() => FileTask, (fileTask) => fileTask.task)
  @JoinColumn({ referencedColumnName: "id", name: "fileTask" })
  fileTask: FileTask[];

  @Column()
  description: string;

  @Column()
  deadline: Date;
}
