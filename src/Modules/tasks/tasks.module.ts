import { Module } from "@nestjs/common";
import { TasksService } from "./tasks.service";
import { TasksController } from "./tasks.controller";
import { Task } from "./entities/task.entity";
import { TypeOrmModule } from "@nestjs/typeorm";
import { TaskStudent } from "./entities/task-student.entity";
import { File } from "./entities/file.entity";
import { FileTask } from "./entities/file-task.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Task, TaskStudent, File, FileTask])],

  controllers: [TasksController],
  providers: [TasksService],
})
export class TasksModule {}
