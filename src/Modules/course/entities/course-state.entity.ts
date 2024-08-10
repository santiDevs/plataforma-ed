import { Column, Entity, JoinColumn, OneToMany } from "typeorm";
import { Course } from "./course.entity";
import { CommonEntity } from "src/Common/common.entity";

/**
 *
 */
@Entity()
export class CourseState extends CommonEntity {
  @Column()
  nombre: string;

  @Column()
  state: string;

  @OneToMany(() => Course, (courses) => courses.state)
  @JoinColumn({ referencedColumnName: "id", name: "state" })
  courses: Course[];
}
