import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { UserType } from "./user-type.entity";
import { TaskStudent } from "src/modules/tasks/entities/task-student.entity";
import { TeacherCourse } from "src/modules/course/entities/teacher-course.entity";
import { CommonEntity } from "src/Common/common.entity";

@Entity()
export class User extends CommonEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  nombre: string;
  @Column()
  lastname: string;
  @Column()
  password: string;
  @Column({ unique: true })
  email: string;
  @Column({ nullable: true })
  direccion: string;
  @Column({ nullable: true })
  birthDay: Date | null;

  @ManyToOne(() => UserType)
  @JoinColumn({ referencedColumnName: "id", name: "userType" })
  userType: UserType;

  @OneToMany(() => TaskStudent, (tasks) => tasks.student)
  tasks: TaskStudent[];

  @ManyToMany(() => TeacherCourse)
  @JoinTable({
    name: "teacher_course_students",
    joinColumn: {
      foreignKeyConstraintName: "FK_teacher_course_students_user",
      name: "student",
      referencedColumnName: "id",
    },
    inverseJoinColumn: {
      foreignKeyConstraintName: "FK_teacher_course_students_teacher_course",
      name: "teacherCourse",
      referencedColumnName: "id",
    },
  })
  teacherCourses: TeacherCourse[];
}
