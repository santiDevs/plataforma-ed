import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { File } from './file.entity'
import { Task } from './task.entity';
import { TeacherCourse } from 'src/modules/course/entities/teacher-course.entity';

@Entity()
export class TaskStudent{
    @PrimaryGeneratedColumn()
    id: number

    // @ManyToOne(() => File)
    // @JoinColumn({referencedColumnName: 'id', name: 'file'})
    // file: File

    // @OneToMany(() => File, )
    // @JoinColumn({referencedColumnName: 'id', name: 'file'})
    // file: File

    @ManyToOne(() => Task, task => task.taskStudents)
    @JoinColumn({referencedColumnName: 'id', name: 'task'})
    task: Task

    @ManyToOne(() => TeacherCourse)
    @JoinColumn({referencedColumnName: 'id', name: 'teacherCourseStuden'})
    teacherCourseStudent: TeacherCourse

    @Column()
    grade: number

    @Column()
    createdDay: Date

    @Column()
    updatedDay: Date
}