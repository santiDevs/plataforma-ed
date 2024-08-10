import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";
import { CourseState } from "./course-state.entity";
import { CommonEntity } from "src/Common/common.entity";

/**
 *
 */
@Entity()
export class Course extends CommonEntity {
  @Column()
  nombre: string;

  @Column({ default: () => "CURRENT_TIMESTAMP" })
  updatedDay: Date;

  @Column({ default: "No description provided" })
  description: string;

  @ManyToOne(() => CourseState, (state) => state.courses)
  @JoinColumn({ referencedColumnName: "id", name: "courseState" })
  state: CourseState;
}
