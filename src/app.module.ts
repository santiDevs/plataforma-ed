import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ForumModule } from './modules/forum/forum.module';
import { UserModule } from './modules/user/user.module';
import { CourseModule } from './modules/course/course.module';
import { Course } from './modules/course/entities/course.entity';
import { User } from './modules/user/entities/user.entity';
import { UserType } from './modules/user/entities/user-type.entity';
import { Forum } from './Modules/forum/entities/forum.entity';
import { ForumMessage } from './Modules/forum/entities/forum-message.entity';
// import { TeacherCourse } from './modules/course/entities/teacher-course.entity';
import { TasksModule } from './modules/tasks/tasks.module';
import { EvaluationModule } from './modules/evaluation/evaluation.module';


@Module({
  imports: [
    UserModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'eduline', 
      autoLoadEntities: true, 
    }),
    ForumModule,
    CourseModule,
    TasksModule,
    EvaluationModule
  ],
  controllers: [AppController],
  providers: [AppService],
})

export class AppModule {}



