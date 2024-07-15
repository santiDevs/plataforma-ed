import { Column, CreateDateColumn, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { Course } from './course.entity';
import { User } from 'src/modules/user/entities/user.entity';
import { TaskStudent } from 'src/modules/tasks/entities/task-student.entity';

@Entity()
export class TeacherCourse{
    @PrimaryGeneratedColumn()
    id: number

    @ManyToOne(() => Course)
    @JoinColumn({referencedColumnName: 'id', name: 'course'})
    course: Course

    @ManyToOne(() => User)
    @JoinColumn({referencedColumnName: 'id', name: 'teacher'})
    teacher: User
    
    @ManyToMany(() => User)
    @JoinTable({
        name: 'teacher_course_students',
        joinColumn: {
            name: 'teacherCourse',
            referencedColumnName: 'id',
            foreignKeyConstraintName: 'teacher_course_fk'
        },
        inverseJoinColumn: {
            name: 'student',
            referencedColumnName: 'id',
            foreignKeyConstraintName: 'student_fk'
        }
    })
    students: User[]

    @OneToMany(() => TaskStudent, taskStudent => taskStudent.teacherCourseStudent)
    taskStudent: TaskStudent

    @Column()
    hours: number

    @Column()
    createdDay: Date;

    @Column()
    updatedDay: Date;
}