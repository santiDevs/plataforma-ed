import { Entity, JoinColumn, ManyToOne } from "typeorm";
import { Task } from "./task.entity";
import { File } from "./file.entity";
import { CommonEntity } from "src/Common/common.entity";

/**
 * Entidad que representa el archivo de la tarea en la base de datos
 */
@Entity()
export class FileTask extends CommonEntity {
  @ManyToOne(() => Task)
  @JoinColumn({ referencedColumnName: "id", name: "task" })
  task: Task;

  @ManyToOne(() => File)
  @JoinColumn({ referencedColumnName: "id", name: "file" })
  file: File;
}
