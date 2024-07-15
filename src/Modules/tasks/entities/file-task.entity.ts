import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { Task } from './task.entity';
import { File } from './file.entity';

@Entity()
export class FileTask {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Task)
    @JoinColumn({referencedColumnName: 'id', name: 'task'})
    task: Task

    @ManyToOne(() => File)
    @JoinColumn({referencedColumnName: 'id', name: 'file'})
    file : File   

    @Column()
    createdDay: Date

    @Column()
    updatedDay: Date
}