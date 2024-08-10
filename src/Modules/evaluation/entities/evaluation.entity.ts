import { CommonEntity } from "src/Common/common.entity";
import { Course } from "src/modules/course/entities/course.entity";
import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";

/**
 *  Entidad que representa las evaluaciones en la base de datos
 */
@Entity()
export class Evaluation extends CommonEntity {
  @ManyToOne(() => Course)
  @JoinColumn({ referencedColumnName: "id", name: "course" })
  course: Course;

  @Column()
  description: string;
}
