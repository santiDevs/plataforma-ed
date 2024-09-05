import { CommonEntity } from "src/Common/common.entity";
import { Column, Entity } from "typeorm";

/**
 *
 */
@Entity()
export class AuthRefreshToken extends CommonEntity {
  @Column()
  token: string;

  @Column()
  expiration: Date;

  @Column()
  userId: number;
}
