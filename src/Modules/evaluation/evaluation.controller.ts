import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from "@nestjs/common";
import { EvaluationService } from "./evaluation.service";
import { CreateEvaluationDto } from "./dto/create-evaluation.dto";
import { UpdateEvaluationDto } from "./dto/update-evaluation.dto";
import { Evaluation } from "./entities/evaluation.entity";

/**
 *
 */
@Controller("evaluation")
export class EvaluationController {
  constructor(private readonly evaluationService: EvaluationService) {}

  /**
   * Crea una nueva evaluación.
   * @param {CreateEvaluationDto} createEvaluationDto - Datos para la nueva evaluación.
   * @returns {Promise<number>} El ID de la evaluación creada.
   */
  @Post("createEvaluation")
  create(@Body() createEvaluationDto: CreateEvaluationDto) {
    return this.evaluationService.create(createEvaluationDto);
  }

  /**
   * Obtiene todas las evaluaciones.
   * @returns {Promise<Evaluation[]>} Una lista de todas las evaluaciones.
   */
  @Get("evaluations")
  findAll() {
    return this.evaluationService.findAll();
  }

  /**
   * Obtiene una evaluación específica por su ID.
   * @param {string} id - El ID de la evaluación.
   * @returns {Promise<Evaluation | null>} La evaluación encontrada o null si no existe.
   */
  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.evaluationService.findOne(+id);
  }

  /**
   * Actualiza una evaluación existente.
   * @param {string} id - El ID de la evaluación que se desea actualizar.
   * @param {UpdateEvaluationDto} updateEvaluationDto - Los nuevos datos para la evaluación.
   * @returns {Promise<void>} Indica si la operación de actualización fue exitosa.
   */
  @Patch(":id")
  update(
    @Param("id") id: string,
    @Body() updateEvaluationDto: UpdateEvaluationDto,
  ) {
    return this.evaluationService.update(+id, updateEvaluationDto);
  }

  /**
   * Elimina una evaluación específica.
   * @param {string} id - El ID de la evaluación que se desea eliminar.
   * @returns {Promise<void>} Indica si la operación de eliminación fue exitosa.
   */
  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.evaluationService.remove(+id);
  }
}
