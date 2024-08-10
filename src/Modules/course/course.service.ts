import { Injectable } from "@nestjs/common";
import { CreateCourseDto } from "./dto/create-course.dto";
import { UpdateCourseDto } from "./dto/update-course.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { FindOptionsWhere, Repository } from "typeorm";
import { Course } from "./entities/course.entity";
import { TeacherCourse } from "./entities/teacher-course.entity";
import { CourseState } from "./entities/course-state.entity";

/**
 * Servicio que maneja las operaciones relacionadas con los cursos.
 */
@Injectable()
export class CourseService {
  constructor(
    @InjectRepository(Course)
    private courseRepository: Repository<Course>,
    @InjectRepository(CourseState)
    private courseStateRepository: Repository<CourseState>,
    @InjectRepository(TeacherCourse)
    private teacherCourseRepository: Repository<TeacherCourse>,
  ) {}

  /**
   * Crea un nuevo curso.
   * @param {CreateCourseDto} createCourseDto - Datos para el nuevo curso.
   * @returns {Promise<Course>} El curso creado.
   */
  create(createCourseDto: CreateCourseDto) {
    return this.courseRepository.save(createCourseDto);
  }

  /**
   * Obtiene una lista de todos los cursos.
   * @param {FindOptionsWhere<Course> | FindOptionsWhere<Course>[]} [where] - Condiciones opcionales para filtrar los cursos.
   * @returns {Promise<Course[]>} Una lista de cursos.
   */
  findAll(where?: FindOptionsWhere<Course> | FindOptionsWhere<Course>[]) {
    return this.courseRepository.find({
      where,
      relations: ["state"],
    });
  }

  /**
   * Obtiene un curso específico por su ID.
   * @param {number} id - El ID del curso.
   * @returns {Promise<Course | null>} El curso encontrado o null si no existe.
   */
  findOne(id: number) {
    return this.courseRepository.findOne({ where: { id } });
  }

  /**
   * Actualiza un curso existente.
   * @param {number} id - El ID del curso que se desea actualizar.
   * @param {UpdateCourseDto} updateCourseDto - Los nuevos datos para el curso.
   * @returns {Promise<void>} Indica si la operación de actualización fue exitosa.
   */
  update(id: number, updateCourseDto: UpdateCourseDto) {
    return this.courseRepository.update(id, updateCourseDto);
  }

  /**
   * Elimina un curso específico.
   * @param {number} id - El ID del curso que se desea eliminar.
   * @returns {Promise<void>} Indica si la operación de eliminación fue exitosa.
   */
  remove(id: number) {
    return this.courseRepository.delete(id);
  }

  /**
   * Obtiene todos los estados de los cursos.
   * @returns {Promise<CourseState[]>} Una lista de estados de cursos.
   */
  findStates() {
    return this.courseStateRepository.find({ relations: ["courses"] });
  }

  /**
   * Obtiene todos los cursos asignados a los profesores.
   * @returns {Promise<TeacherCourse[]>} Una lista de cursos asignados a profesores.
   */
  findTeacherCourses() {
    return this.teacherCourseRepository.find({
      relations: ["course", "teacher", "students"],
    });
  }
}
