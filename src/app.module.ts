import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ForumModule } from "./modules/forum/forum.module";
import { UserModule } from "./modules/user/user.module";
import { CourseModule } from "./modules/course/course.module";
import { TasksModule } from "./modules/tasks/tasks.module";
import { EvaluationModule } from "./modules/evaluation/evaluation.module";
import { AuthModule } from "./modules/auth/auth.module";

/**
 *
 */
@Module({
  imports: [
    UserModule,
    TypeOrmModule.forRoot({
      type: "mysql",
      host: "localhost",
      port: 3306,
      username: "root",
      password: "",
      database: "eduline",
      autoLoadEntities: true,
    }),
    ForumModule,
    CourseModule,
    TasksModule,
    EvaluationModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
