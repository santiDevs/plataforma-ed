import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { Forum } from './forum.entity';
import { User } from 'src/modules/user/entities/user.entity';

@Entity()
export class ForumMessage {
    @PrimaryGeneratedColumn()
    id: number
    @Column()
    message: string;

    @ManyToOne(() => User)
    @JoinColumn({name: 'user', referencedColumnName:'id'})
    user: User 

    @ManyToOne(() => Forum, (forum) => forum.messages)
    @JoinColumn({name: 'forum'})
    forum: Forum    
}