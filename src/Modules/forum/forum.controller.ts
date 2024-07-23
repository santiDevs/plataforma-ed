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

@Controller("forum")
export class ForumController {
  constructor(private readonly forumService: ForumService) {}

  @Post()
  create(@Body() createForumDto: CreateForumDto) {
    return this.forumService.create(createForumDto);
  }

  @Get("forums")
  findAll() {
    return this.forumService.findAll();
  }

  @Get("message/:id")
  findAllMessages(@Param("id") id: string) {
    return this.forumService.findAllMessages(+id);
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.forumService.findOne(+id);
  }

  @Patch(":id")
  update(@Param("id") id: string, @Body() updateForumDto: UpdateForumDto) {
    return this.forumService.update(+id, updateForumDto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.forumService.remove(+id);
  }
}
