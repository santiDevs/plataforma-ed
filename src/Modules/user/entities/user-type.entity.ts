import { Column, CreateDateColumn, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { User } from './user.entity';

@Entity()
export class UserType {
    @PrimaryGeneratedColumn()
    id: number
    @Column()
    name: string

    @OneToMany(() => User, (user) => user.userType)
    @JoinColumn({referencedColumnName: 'id', name: 'userType'})
    users: User[]

    @CreateDateColumn()
    createdDay: Date
    @UpdateDateColumn()
    updatedDay: Date
}
