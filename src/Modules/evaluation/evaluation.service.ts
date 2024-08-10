import { Injectable } from "@nestjs/common";
import { CreateEvaluationDto } from "./dto/create-evaluation.dto";
import { UpdateEvaluationDto } from "./dto/update-evaluation.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Evaluation } from "./entities/evaluation.entity";
import { Repository } from "typeorm";

/**
 * Servicio para manejar las operaciones relacionadas con las evaluaciones.
 */
@Injectable()
export class EvaluationService {
  constructor(
    @InjectRepository(Evaluation)
    private evaluationRepository: Repository<Evaluation>,
  ) {}

  /**
   * Crea una nueva evaluación en la base de datos.
   * @param {CreateEvaluationDto} createEvaluationDto - Datos para crear la evaluación.
   * @returns {Promise<number>} El ID de la evaluación creada.
   */
  async create(createEvaluationDto: CreateEvaluationDto) {
    const newEvaluation =
      await this.evaluationRepository.save(createEvaluationDto);
    return newEvaluation.id;
  }

  /**
   * Obtiene todas las evaluaciones de la base de datos.
   * @returns {Promise<Evaluation[]>} Una lista de todas las evaluaciones.
   */
  findAll() {
    return this.evaluationRepository.find();
  }

  /**
   * Obtiene una evaluación específica por su ID.
   * @param {number} id - El ID de la evaluación que se desea obtener.
   * @returns {Promise<Evaluation | null>} La evaluación encontrada o null si no existe.
   */
  findOne(id: number) {
    return this.evaluationRepository.findOne({
      where: { id },
      relations: ["course"],
    });
  }

  /**
   * Actualiza una evaluación existente.
   * @param {number} id - El ID de la evaluación que se desea actualizar.
   * @param {UpdateEvaluationDto} updateEvaluationDto - Los nuevos datos para la evaluación.
   * @returns {Promise<void>} Indica si la operación de actualización fue exitosa.
   */
  update(id: number, updateEvaluationDto: UpdateEvaluationDto) {
    return this.evaluationRepository.update(id, updateEvaluationDto);
  }

  /**
   * Elimina una evaluación de la base de datos.
   * @param {number} id - El ID de la evaluación que se desea eliminar.
   * @returns {Promise<void>} Indica si la operación de eliminación fue exitosa.
   */
  remove(id: number) {
    return this.evaluationRepository.delete(id);
  }
}
