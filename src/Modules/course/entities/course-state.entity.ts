import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, Timestamp, UpdateDateColumn } from 'typeorm';
import { Course } from './course.entity';

@Entity()
export class CourseState{
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    nombre: string

    @Column()
    state: string

    @OneToMany(() => Course, (courses) => courses.state)
    @JoinColumn({referencedColumnName: 'id', name: 'state'})
    courses: Course[]

    @Column()
    createdDay: Date
    
    @Column()
    updatedDay: Date   
}
