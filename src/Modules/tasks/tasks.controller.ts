import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from "@nestjs/common";
import { TasksService } from "./tasks.service";
import { CreateTaskDto } from "./dto/create-task.dto";
import { UpdateTaskDto } from "./dto/update-task.dto";
import { Task } from "./entities/task.entity";
import { FileTask } from "./entities/file-task.entity";
import { UpdateResult } from "typeorm";
import { DeleteResult } from "typeorm";

/**
 * Controlador para manejar las rutas relacionadas con las tareas.
 * Proporciona endpoints para crear, obtener, actualizar y eliminar tareas.
 */
@Controller("task")
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  /**
   * Endpoint para crear una nueva tarea.
   * @param {CreateTaskDto} createTaskDto - Los datos necesarios para crear una tarea.
   * @returns {Promise<Task>} - La tarea creada.
   */
  @Post()
  create(@Body() createTaskDto: CreateTaskDto) {
    return this.tasksService.create(createTaskDto);
  }

  /**
   * Endpoint para obtener todas las tareas.
   * @returns {Promise<Task[]>} - Una lista de todas las tareas.
   */
  @Get("tasks")
  findAll() {
    return this.tasksService.findAll();
  }

  /**
   * Endpoint para obtener todas las relaciones entre tareas y estudiantes.
   * @returns {Promise<Task[]>} - Una lista de tareas con sus relaciones con estudiantes.
   */
  @Get("taskStudent")
  findTaskStudent() {
    return this.tasksService.findTaskStudent();
  }

  /**
   * Endpoint para obtener todas las relaciones entre tareas y archivos.
   * @returns {Promise<FileTask[]>} - Una lista de tareas con sus archivos relacionados.
   */
  @Get("FileTask")
  findFileTask() {
    return this.tasksService.findTaskFile();
  }

  /**
   * Endpoint para obtener una tarea específica por su ID.
   * @param {string} id - El ID de la tarea que se desea encontrar.
   * @returns {Promise<Task | null>} - La tarea encontrada o null si no existe.
   */
  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.tasksService.findOne(+id);
  }

  /**
   * Endpoint para actualizar una tarea específica por su ID.
   * @param {string} id - El ID de la tarea que se desea actualizar.
   * @param {UpdateTaskDto} updateTaskDto - Los nuevos datos para actualizar la tarea.
   * @returns {Promise<UpdateResult>} - El resultado de la actualización.
   */
  @Patch(":id")
  update(@Param("id") id: string, @Body() updateTaskDto: UpdateTaskDto) {
    return this.tasksService.update(+id, updateTaskDto);
  }

  /**
   * Endpoint para eliminar una tarea específica por su ID.
   * @param {string} id - El ID de la tarea que se desea eliminar.
   * @returns {Promise<DeleteResult>} - El resultado de la eliminación.
   */
  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.tasksService.remove(+id);
  }
}
