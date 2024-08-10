import { OmitType } from "@nestjs/mapped-types";
import { Evaluation } from "../entities/evaluation.entity";

/**
 *  Crea un usuario
 */
export class CreateEvaluationDto extends OmitType(Evaluation, [
  "createdDay",
  "updatedDay",
  "course",
]) {}
