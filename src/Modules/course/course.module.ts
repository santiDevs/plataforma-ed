import { Module } from "@nestjs/common";
import { CourseService } from "./course.service";
import { CourseController } from "./course.controller";
import { Course } from "./entities/course.entity";
import { CourseState } from "./entities/course-state.entity";
import { TypeOrmModule } from "@nestjs/typeorm";
import { TeacherCourse } from "./entities/teacher-course.entity";

/**
 *
 */
@Module({
  imports: [TypeOrmModule.forFeature([Course, CourseState, TeacherCourse])],

  controllers: [CourseController],
  providers: [CourseService],
})
export class CourseModule {}
