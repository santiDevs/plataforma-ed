import { Injectable } from "@nestjs/common";
import { CreateForumDto } from "./dto/create-forum.dto";
import { UpdateForumDto } from "./dto/update-forum.dto";
import { Forum } from "./entities/forum.entity";
import { ForumMessage } from "./entities/forum-message.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { UpdateResult } from "typeorm";

/**
 * Servicio que maneja la lógica de negocio para los foros y los mensajes de los foros.
 */
@Injectable()
export class ForumService {
  constructor(
    @InjectRepository(Forum)
    private readonly forumRepository: Repository<Forum>,

    @InjectRepository(ForumMessage)
    private readonly forumMessageRepository: Repository<ForumMessage>,
  ) {}

  /**
   * Crea un nuevo foro.
   * @param {CreateForumDto} createForumDto - DTO que contiene los datos necesarios para crear un foro.
   * @returns {Promise<number>} - Devuelve el ID del foro recién creado.
   */
  async create(createForumDto: CreateForumDto) {
    const newForum = await this.forumRepository.save(createForumDto);
    return newForum.id;
  }

  /**
   * Obtiene todos los foros, incluyendo sus mensajes relacionados.
   * @returns {Promise<Forum[]>} - Devuelve una lista de foros con sus mensajes.
   */
  findAll() {
    return this.forumRepository.find({ relations: ["messages"] });
  }

  /**
   * Obtiene un foro específico por su ID.
   * @param {number} id - El ID del foro que se desea obtener.
   * @returns {Promise<Forum | null>} - Devuelve el foro encontrado o null si no existe.
   */
  findOne(id: number) {
    return this.forumRepository.findOne({ where: { id } });
  }

  /**
   *
   * @param {number} id - El ID del foro que se desea actualizar.
   * @param {UpdateForumDto} updateForumDto - DTO que contiene los datos para actualizar un usuario
   * @returns {Promise<UpdateResult>} - Devuelve el resultado de la actualizacion
   */
  update(id: number, updateForumDto: UpdateForumDto) {
    return this.forumRepository.update(id, updateForumDto);
  }

  /**
   * Elimina un foro existente por su ID.
   * @param {number} id - El ID del foro que se desea eliminar.
   * @returns {Promise<void>} - Devuelve una promesa que se resuelve cuando la eliminación se completa.
   */
  remove(id: number) {
    return this.forumRepository.delete(id);
  }

  /**
   * Obtiene todos los mensajes de un foro específico por su ID.
   * @param {number} forumId - El ID del foro cuyos mensajes se desean obtener.
   * @returns {Promise<ForumMessage[]>} - Devuelve una lista de mensajes asociados con el foro.
   */
  findAllMessages(forumId: number) {
    return this.forumMessageRepository.find({
      where: { forum: { id: forumId } },
      relations: ["forum"],
    });
  }
}
