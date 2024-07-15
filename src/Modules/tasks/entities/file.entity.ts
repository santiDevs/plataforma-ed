import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { FileTask } from './file-task.entity';

@Entity()
export class File {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @Column()
    url: string

    @OneToMany(() => FileTask, fileTask => fileTask.file)
    fileTask: FileTask[]    

    @Column()
    extension: string

    @Column()
    size: number

    @Column()
    createdDay: Date
    
    @Column()    
    updatedDay: Date
}