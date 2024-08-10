import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateTaskDto } from "./dto/create-task.dto";
import { UpdateTaskDto } from "./dto/update-task.dto";
import { FileTask } from "./entities/file-task.entity";
import { TaskStudent } from "./entities/task-student.entity";
import { Task } from "./entities/task.entity";
import { UpdateResult } from "typeorm";
import { DeleteResult } from "typeorm";

/**
 * Servicio que maneja las operaciones relacionadas con las tareas.
 * Incluye la creación, consulta, actualización y eliminación de tareas,
 * así como la gestión de las relaciones con estudiantes y archivos.
 */
@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private taskRepository: Repository<Task>,
    @InjectRepository(TaskStudent)
    private taskStudent: Repository<TaskStudent>,
    @InjectRepository(FileTask)
    private fileTaskRepository: Repository<FileTask>,
  ) {}

  /**
   * Crea una nueva tarea en la base de datos.
   * @param {CreateTaskDto} createTaskDto - Los datos necesarios para crear una tarea.
   * @returns {Promise<Task>} - La tarea creada.
   */
  create(createTaskDto: CreateTaskDto) {
    return this.taskRepository.save(createTaskDto);
  }

  /**
   * Encuentra todas las tareas en la base de datos, incluyendo sus relaciones.
   * @returns {Promise<Task[]>} - Una lista de todas las tareas con sus relaciones.
   */
  findAll() {
    return this.taskRepository.find({
      relations: {
        teacherCourse: {
          teacher: true,
          course: true,
        },
        answer: {
          file: true,
          student: {
            teacherCourses: true,
          },
        },
      },
    });
  }

  /**
   * Encuentra una tarea específica por su ID.
   * @param {number} id - El ID de la tarea que se desea encontrar.
   * @returns {Promise<Task | null>} - La tarea encontrada o null si no existe.
   */
  findOne(id: number) {
    return this.taskRepository.findOne({ where: { id } });
  }

  /**
   * Actualiza una tarea específica en la base de datos.
   * @param {number} id - El ID de la tarea que se desea actualizar.
   * @param {UpdateTaskDto} updateTaskDto - Los nuevos datos para actualizar la tarea.
   * @returns {Promise<UpdateResult>} - El resultado de la actualización.
   */
  update(id: number, updateTaskDto: UpdateTaskDto) {
    return this.taskRepository.update(id, updateTaskDto);
  }

  /**
   * Elimina una tarea específica de la base de datos.
   * @param {number} id - El ID de la tarea que se desea eliminar.
   * @returns {Promise<DeleteResult>} - El resultado de la eliminación.
   */
  remove(id: number) {
    return this.taskRepository.delete(id);
  }

  /**
   * Encuentra todas las relaciones entre tareas y estudiantes.
   * @returns {Promise<Task[]>} - Una lista de tareas con sus relaciones con estudiantes.
   */
  findTaskStudent() {
    return this.taskRepository.find({ relations: ["taskStudents"] });
  }

  /**
   * Encuentra todas las relaciones entre tareas y archivos.
   * @returns {Promise<FileTask[]>} - Una lista de tareas con sus archivos relacionados.
   */
  findTaskFile() {
    return this.fileTaskRepository.find({ relations: ["task", "file"] });
  }
}
