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
import { ConfigModule, ConfigService } from "@nestjs/config";

/**
 *
 */
@Module({
  imports: [
    UserModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        type: "mysql",
        host: configService.get<string>("DATABASE_HOST"),
        port: configService.get<number>("DATABASE_PORT"),
        username: configService.get<string>("DATABASE_USER"),
        password: configService.get<string>("DATABASE_PASSWORD"),
        database: configService.get<string>("DATABASE_NAME"),
        autoLoadEntities: true,
      }),
      inject: [ConfigService],
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
