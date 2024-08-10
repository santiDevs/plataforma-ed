import { PartialType } from "@nestjs/mapped-types";
import { CreateEvaluationDto } from "./create-evaluation.dto";

/**
 *  Clase que actualiza un usuario
 */
export class UpdateEvaluationDto extends PartialType(CreateEvaluationDto) {}
