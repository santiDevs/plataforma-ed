import { User } from "src/modules/user/entities/user.entity";
import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
} from "typeorm";
import { File } from "./file.entity";
import { Task } from "./task.entity";
import { CommonEntity } from "src/Common/common.entity";

@Entity()
export class TaskStudent extends CommonEntity {
  @ManyToMany(() => File)
  @JoinTable({
    name: "file_task_student",
    joinColumn: {
      name: "taskStudent",
      foreignKeyConstraintName: "FK_task_student_user",
    },
    inverseJoinColumn: {
      name: "file",
      foreignKeyConstraintName: "task_student_ibfk_1",
    },
  })
  file: Array<File>;

  @ManyToOne(() => Task, (task) => task.answer)
  @JoinColumn({ referencedColumnName: "id", name: "task" })
  task: Task;

  @ManyToOne(() => User)
  @JoinColumn({ referencedColumnName: "id", name: "student" })
  student: User;

  @Column()
  grade: number;
}
