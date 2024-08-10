import { Column, Entity, JoinTable, ManyToMany } from "typeorm";
import { TaskStudent } from "./task-student.entity";
import { CommonEntity } from "src/Common/common.entity";

/**
 *  Entidad que representa el archivo en la base de datos
 */
@Entity()
export class File extends CommonEntity {
  @Column()
  name: string;

  @Column()
  url: string;

  @ManyToMany(() => TaskStudent)
  @JoinTable({
    name: "file_task_student",
    joinColumn: {
      name: "file",
      foreignKeyConstraintName: "FK_file_task_student_file",
    },
    inverseJoinColumn: {
      name: "taskStudent",
      foreignKeyConstraintName: "FK_task_student",
    },
  })
  taskStudent: Array<TaskStudent>;

  @Column()
  extension: string;

  @Column()
  size: number;
}
