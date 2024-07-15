import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { CourseState } from './course-state.entity';

@Entity()
export class Course {
    @PrimaryGeneratedColumn()
    id: number
    @Column()
    
    nombre: string
    @Column({default: () => 'CURRENT_TIMESTAMP'})
    updatedDay: Date
    
    @Column()
    description: string

    @ManyToOne(() => CourseState, (state) => state.courses)    
    @JoinColumn({referencedColumnName: 'id', name: 'courseState'})
    state: CourseState
}
