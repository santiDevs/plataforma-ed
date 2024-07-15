import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { UserType } from './user-type.entity';
import { ForumMessage } from 'src/Modules/forum/entities/forum-message.entity';

@Entity()
export class User{
    @PrimaryGeneratedColumn()
    id: number
    @Column()
    nombre: string
    @Column()
    lastname: string
    @Column()
    password: string
    @Column({unique: true})
    email: string
    @Column({nullable: true})
    direccion: string
    @Column({nullable: true})
    birthDay: Date | null


    @ManyToOne(() => UserType)
    @JoinColumn({referencedColumnName: 'id', name: 'userType'})
    userType: UserType

    @CreateDateColumn({nullable: true})
    createdDay: Date

    @UpdateDateColumn({nullable: true})
    updatedDay: Date
}

