import { User } from "src/modules/user/entities/user.entity";
import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
} from "typeorm";
import { Course } from "./course.entity";
import { CommonEntity } from "src/Common/common.entity";

/**
 *
 */
@Entity()
export class TeacherCourse extends CommonEntity {
  @ManyToOne(() => Course)
  @JoinColumn({ referencedColumnName: "id", name: "course" })
  course: Course;

  @ManyToOne(() => User)
  @JoinColumn({ referencedColumnName: "id", name: "teacher" })
  teacher: User;

  @ManyToMany(() => User)
  @JoinTable({
    name: "teacher_course_students",
    joinColumn: {
      name: "teacherCourse",
      referencedColumnName: "id",
      foreignKeyConstraintName: "teacher_course_fk",
    },
    inverseJoinColumn: {
      name: "student",
      referencedColumnName: "id",
      foreignKeyConstraintName: "student_fk",
    },
  })
  students: User[];

  @Column()
  hours: number;
}
