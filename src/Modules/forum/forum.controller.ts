import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from "@nestjs/common";
import { ForumService } from "./forum.service";
import { CreateForumDto } from "./dto/create-forum.dto";
import { UpdateForumDto } from "./dto/update-forum.dto";
import { Forum } from "./entities/forum.entity";
import { ForumMessage } from "./entities/forum-message.entity";
import { UpdateResult } from "typeorm";
import { DeleteResult } from "typeorm";

/**
 * Controlador que maneja las solicitudes HTTP relacionadas con los foros.
 * Proporciona los endpoints para crear, leer, actualizar y eliminar foros.
 */
@Controller("forum")
export class ForumController {
  constructor(private readonly forumService: ForumService) {}

  /**
   * Crea un nuevo foro.
   * @param {CreateForumDto} createForumDto - Objeto que contiene los datos necesarios para crear un foro.
   * @returns {Promise<Forum>} - El foro creado.
   */
  @Post()
  create(@Body() createForumDto: CreateForumDto) {
    return this.forumService.create(createForumDto);
  }

  /**
   * Obtiene todos los foros disponibles.
   * @returns {Promise<Forum[]>} - Una lista de todos los foros.
   */
  @Get("forums")
  findAll() {
    return this.forumService.findAll();
  }

  /**
   * Obtiene todos los mensajes de un foro específico.
   * @param {string} id - El ID del foro cuyos mensajes se desean obtener.
   * @returns {Promise<ForumMessage[]>} - Una lista de todos los mensajes del foro.
   */
  @Get("message/:id")
  findAllMessages(@Param("id") id: string) {
    return this.forumService.findAllMessages(+id);
  }

  /**
   * Obtiene un foro específico por su ID.
   * @param {string} id - El ID del foro que se desea obtener.
   * @returns {Promise<Forum | null>} - El foro encontrado o null si no existe.
   */
  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.forumService.findOne(+id);
  }

  /**
   * Actualiza un foro existente por su ID.
   * @param {string} id - El ID del foro que se desea actualizar.
   * @param {UpdateForumDto} updateForumDto - Objeto que contiene los datos actualizados del foro.
   * @returns {Promise<UpdateResult>} - El resultado de la actualización.
   */
  @Patch(":id")
  update(@Param("id") id: string, @Body() updateForumDto: UpdateForumDto) {
    return this.forumService.update(+id, updateForumDto);
  }

  /**
   * Elimina un foro existente por su ID.
   * @param {string} id - El ID del foro que se desea eliminar.
   * @returns {Promise<DeleteResult>} - El resultado de la eliminación.
   */
  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.forumService.remove(+id);
  }
}
