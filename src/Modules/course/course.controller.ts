import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
} from "@nestjs/common";
import { CourseService } from "./course.service";
import { CreateCourseDto } from "./dto/create-course.dto";
import { UpdateCourseDto } from "./dto/update-course.dto";
import { AuthGuard } from "src/guards/auth.guard";
import { AuthPayloadValidateInfo } from "../auth/login.dto";
import { Course } from "./entities/course.entity";
import { CourseState } from "./entities/course-state.entity";
import { TeacherCourse } from "./entities/teacher-course.entity";
import { JwtAuthGuard } from "src/guards/jwt-auth.guard";
import { Request } from "express";

/**
 * Controlador que maneja las operaciones relacionadas con los cursos.
 */
@Controller("course")
export class CourseController {
  constructor(private readonly courseService: CourseService) {}

  /**
   * Crea un nuevo curso.
   * @param {CreateCourseDto} createCourseDto - Datos necesarios para crear un curso.
   * @returns {Promise<Course>} El curso creado.
   */
  @Post()
  create(@Body() createCourseDto: CreateCourseDto) {
    return this.courseService.create(createCourseDto);
  }

  /**
   * Obtiene una lista de todos los cursos.
   * Requiere autenticación.
   * @returns {Promise<Course[]>} Una lista de cursos.
   */
  @Get("courses")
  @UseGuards(JwtAuthGuard)
  findAll() {
    return this.courseService.findAll();
  }

  /**
   * Obtiene los cursos del usuario autenticado.
   * Requiere autenticación.
   * @param {Request} request - La solicitud con la información del usuario autenticado.
   * @returns {Promise<Course[]>} Una lista de cursos del usuario.
   */
  @Get("getMyCourse")
  @UseGuards(JwtAuthGuard)
  getMyCourse(@Req() request: Request) {
    const payload = request.user["info"] as AuthPayloadValidateInfo;
    return this.courseService.findAll({ id: payload.id });
  }

  /**
   * Obtiene todos los estados de los cursos.
   * @returns {Promise<CourseState[]>} Una lista de estados de cursos.
   */
  @Get("states")
  findStates() {
    return this.courseService.findStates();
  }

  /**
   * Obtiene todos los cursos asignados a los profesores.
   * Requiere autenticación.
   * @returns {Promise<TeacherCourse[]>} Una lista de cursos asignados a profesores.
   */
  @Get("teacherCourses")
  @UseGuards(AuthGuard)
  findTeacherCourses() {
    return this.courseService.findTeacherCourses();
  }

  /**
   * Obtiene un curso específico por su ID.
   * @param {string} id - El ID del curso.
   * @returns {Promise<Course | null>} El curso encontrado o null si no existe.
   */
  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.courseService.findOne(+id);
  }

  /**
   * Actualiza un curso específico por su ID.
   * @param {string} id - El ID del curso.
   * @param {UpdateCourseDto} updateCourseDto - Los nuevos datos para el curso.
   * @returns {Promise<void>} Indica si la operación de actualización fue exitosa.
   */
  @Patch(":id")
  update(@Param("id") id: string, @Body() updateCourseDto: UpdateCourseDto) {
    return this.courseService.update(+id, updateCourseDto);
  }

  /**
   * Elimina un curso específico por su ID.
   * @param {string} id - El ID del curso.
   * @returns {Promise<void>} Indica si la operación de eliminación fue exitosa.
   */
  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.courseService.remove(+id);
  }
}
