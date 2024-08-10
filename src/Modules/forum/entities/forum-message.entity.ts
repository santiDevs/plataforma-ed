import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";
import { Forum } from "./forum.entity";
import { CommonEntity } from "src/Common/common.entity";

/**
 *  Entidad que representa el mensaje de un foro en la base de datos
 */
@Entity()
export class ForumMessage extends CommonEntity {
  @Column()
  message: string;

  @ManyToOne(() => Forum, (forum) => forum.messages)
  @JoinColumn({ name: "forum" })
  forum: Forum;
}
