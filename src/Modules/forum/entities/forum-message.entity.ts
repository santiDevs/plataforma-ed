import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";
import { Forum } from "./forum.entity";
import { CommonEntity } from "src/Common/common.entity";

@Entity()
export class ForumMessage extends CommonEntity {
  @Column()
  message: string;

  @ManyToOne(() => Forum, (forum) => forum.messages)
  @JoinColumn({ name: "forum" })
  forum: Forum;
}
