import { OmitType } from "@nestjs/mapped-types";
import { Evaluation } from "../entities/evaluation.entity";

export class CreateEvaluationDto extends OmitType(Evaluation, ['createdDay', 'updatedDay', 'course']) {}
