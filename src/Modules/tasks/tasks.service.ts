import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateTaskDto } from "./dto/create-task.dto";
import { UpdateTaskDto } from "./dto/update-task.dto";
import { FileTask } from "./entities/file-task.entity";
import { TaskStudent } from "./entities/task-student.entity";
import { Task } from "./entities/task.entity";

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

  create(createTaskDto: CreateTaskDto) {
    return this.taskRepository.save(createTaskDto);
  }

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

  findOne(id: number) {
    return this.taskRepository.findOne({ where: { id } });
  }

  update(id: number, updateTaskDto: UpdateTaskDto) {
    return this.taskRepository.update(id, updateTaskDto);
  }

  remove(id: number) {
    return this.taskRepository.delete(id);
  }

  findTaskStudent() {
    return this.taskRepository.find({ relations: ["taskStudents"] });
  }

  findTaskFile() {
    return this.fileTaskRepository.find({ relations: ["task", "file"] });
  }
}
