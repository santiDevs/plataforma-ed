import { Injectable } from "@nestjs/common";
import { CreateEvaluationDto } from "./dto/create-evaluation.dto";
import { UpdateEvaluationDto } from "./dto/update-evaluation.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Evaluation } from "./entities/evaluation.entity";
import { Repository } from "typeorm";

@Injectable()
export class EvaluationService {
  constructor(
    @InjectRepository(Evaluation)
    private evaluationRepository: Repository<Evaluation>,
  ) {}

  async create(createEvaluationDto: CreateEvaluationDto) {
    const newEvaluation =
      await this.evaluationRepository.save(createEvaluationDto);
    return newEvaluation.id;
  }

  findAll() {
    return this.evaluationRepository.find();
  }

  findOne(id: number) {
    return this.evaluationRepository.findOne({
      where: { id },
      relations: ["course"],
    });
  }

  update(id: number, updateEvaluationDto: UpdateEvaluationDto) {
    return this.evaluationRepository.update(id, updateEvaluationDto);
  }

  remove(id: number) {
    return this.evaluationRepository.delete(id);
  }
}
