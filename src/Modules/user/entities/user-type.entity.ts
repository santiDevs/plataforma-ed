import { Column, Entity, JoinColumn, OneToMany } from "typeorm";
import { User } from "./user.entity";
import { CommonEntity } from "src/Common/common.entity";

/**
 * Entidad que representa el tipo de usuario en la base de datos.
 */
@Entity()
export class UserType extends CommonEntity {
  @Column()
  name: string;

  @OneToMany(() => User, (user) => user.userType)
  @JoinColumn({ referencedColumnName: "id", name: "userType" })
  users: User[];
}
