import { Column, Entity, JoinColumn, OneToMany } from "typeorm";
import { User } from "./user.entity";
import { CommonEntity } from "src/Common/common.entity";

@Entity()
export class UserType extends CommonEntity {
  @Column()
  name: string;

  @OneToMany(() => User, (user) => user.userType)
  @JoinColumn({ referencedColumnName: "id", name: "userType" })
  users: User[];
}
