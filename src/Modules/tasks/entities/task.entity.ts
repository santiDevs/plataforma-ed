import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { TeacherCourse } from 'src/modules/course/entities/teacher-course.entity';
import { TaskStudent } from './task-student.entity';
import { FileTask } from './file-task.entity';

@Entity()
export class Task {
    @PrimaryGeneratedColumn()
    id: number

    @ManyToOne(() => TeacherCourse)
    @JoinColumn({referencedColumnName: 'id', name: 'teacherCourse'})
    teacherCourse: TeacherCourse

    @OneToMany(() => TaskStudent, taskStudents => taskStudents.task)
    @JoinColumn({referencedColumnName: 'id', name: 'task'})
    taskStudents: TaskStudent[]

    @OneToMany(() => FileTask, fileTask => fileTask.task)
    @JoinColumn({referencedColumnName: 'id', name: 'fileTask'})
    fileTask: FileTask[]
    
    @Column()
    description: string

    @Column()
    deadline: Date

    @Column()
    createdDay: Date

    @Column()
    updatedDay: Date
}

