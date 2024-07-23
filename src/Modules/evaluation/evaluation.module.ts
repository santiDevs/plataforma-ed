import { Module } from "@nestjs/common";
import { EvaluationService } from "./evaluation.service";
import { EvaluationController } from "./evaluation.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Evaluation } from "./entities/evaluation.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Evaluation])],

  controllers: [EvaluationController],
  providers: [EvaluationService],
})
export class EvaluationModule {}
