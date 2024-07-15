import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ForumService } from './forum.service';
import { CreateForumDto } from './dto/create-forum.dto';
import { UpdateForumDto } from './dto/update-forum.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Forum } from './entities/forum.entity';
import { ForumMessage } from './entities/forum-message.entity';
import { Repository } from 'typeorm';

@Controller('forum')
export class ForumController {
  constructor(private readonly forumService: ForumService) {}
  

  @Post()
  create(@Body() createForumDto: CreateForumDto) {
    return this.forumService.create(createForumDto);
  }

  @Get("Forums")
  findAll() {
    return this.forumService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.forumService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateForumDto: UpdateForumDto) {
    return this.forumService.update(+id, updateForumDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.forumService.remove(+id);
  }
}
