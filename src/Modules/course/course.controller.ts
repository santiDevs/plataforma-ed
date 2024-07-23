import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from "@nestjs/common";
import { CourseService } from "./course.service";
import { CreateCourseDto } from "./dto/create-course.dto";
import { UpdateCourseDto } from "./dto/update-course.dto";

@Controller("course")
export class CourseController {
  constructor(private readonly courseService: CourseService) {}

  @Post()
  create(@Body() createCourseDto: CreateCourseDto) {
    return this.courseService.create(createCourseDto);
  }

  @Get("courses")
  findAll() {
    return this.courseService.findAll();
  }

  @Get("states")
  findStates() {
    return this.courseService.findStates();
  }

  @Get("teacherCourses")
  findTeacherCourses() {
    return this.courseService.findTeacherCourses();
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.courseService.findOne(+id);
  }

  @Patch(":id")
  update(@Param("id") id: string, @Body() updateCourseDto: UpdateCourseDto) {
    return this.courseService.update(+id, updateCourseDto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.courseService.remove(+id);
  }
}
