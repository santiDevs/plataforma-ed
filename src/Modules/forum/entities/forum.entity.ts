import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { ForumMessage } from './forum-message.entity'

@Entity()
export class Forum {
    @PrimaryGeneratedColumn()
    id: number
    @Column()
    nombre: string
    
    @Column({nullable: true})
    descripcion: string | null

    @OneToMany(() => ForumMessage, forumMessage => forumMessage.forum)
    messages: ForumMessage[]

    @Column()
    createdDay: Date
    @Column()
    updatedDay: Date
}
