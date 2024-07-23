import { OmitType } from "@nestjs/mapped-types";
import { Course } from "../entities/course.entity";

export class CreateCourseDto extends OmitType(Course, ["updatedDay"]) {}
