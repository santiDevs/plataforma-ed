import { Column, Entity, OneToMany } from "typeorm";
import { ForumMessage } from "./forum-message.entity";
import { CommonEntity } from "src/Common/common.entity";

/**
 *  Entidad que representa un foro en la base de datos
 */
@Entity()
export class Forum extends CommonEntity {
  @Column()
  nombre: string;

  @Column({ nullable: true })
  descripcion: string | null;

  @OneToMany(() => ForumMessage, (forumMessage) => forumMessage.forum)
  messages: ForumMessage[];
}
