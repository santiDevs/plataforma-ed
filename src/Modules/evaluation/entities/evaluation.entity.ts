import { Course } from 'src/modules/course/entities/course.entity';
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class Evaluation {
    @PrimaryGeneratedColumn()
    id: number;
    
    @ManyToOne(() => Course)
    @JoinColumn({ referencedColumnName: 'id', name: 'course' })
    course: Course;

    @Column()
    description: string

    @Column()
    createdDay: Date

    @Column()
    updatedDay: Date
}
