import { PickType } from "@nestjs/mapped-types";
import { Forum } from "../entities/forum.entity";

export class CreateForumDto extends PickType(Forum, [
  "nombre",
  "descripcion",
]) {}
