import { Injectable } from '@nestjs/common';
import { CreateForumDto } from './dto/create-forum.dto';
import { UpdateForumDto } from './dto/update-forum.dto';
import { Forum } from './entities/forum.entity';
import { ForumMessage } from './entities/forum-message.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ForumService {

  constructor(
    @InjectRepository(Forum)
    private readonly forumRepository: Repository<Forum>,
    
    @InjectRepository(ForumMessage)
    private readonly forumMessageRepository: Repository<ForumMessage>
  ) {}

  async create(createForumDto: CreateForumDto) {
    const newForum = await this.forumRepository.save(createForumDto)

    return newForum.id
  }

  findAll() {
    return this.forumRepository.find();
  }

  findOne(id: number) {
    return this.forumRepository.findOne({where: {id}});
  }

  update(id: number, updateForumDto: UpdateForumDto) {
    return this.forumRepository.update(id, updateForumDto);
  }

  remove(id: number) {
    return this.forumRepository.delete(id);
  }
}
