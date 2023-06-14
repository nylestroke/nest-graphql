import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PostEntity } from './entities/post.entity';
import { SuccessDto } from '../../shared/dto/Success.dto';
import { UpdatePostRequestInput } from './inputs/UpdatePostRequest.input';
import { CreatePostRequestInput } from './inputs/CreatePostRequest.input';
import { UsersService } from '../users-router/users.service';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(PostEntity) private readonly postsRepository: Repository<PostEntity>,
    private readonly usersService: UsersService,
  ) {}

  async create(request: CreatePostRequestInput): Promise<PostEntity> {
    const userExist = await this.usersService.findOne(request.author);

    if (!userExist) {
      throw new NotFoundException({
        error: 'Not Found',
        message: `User #${request.author} not found`,
        statusCode: 404,
      });
    }

    const post = this.postsRepository.create(request);
    return this.postsRepository.save(post);
  }

  async findAll(): Promise<Array<PostEntity>> {
    return this.postsRepository.find();
  }

  async findOne(id: string): Promise<PostEntity> {
    const post = await this.postsRepository.findOne({ where: { id } });

    if (!post) {
      throw new NotFoundException({
        error: 'Not Found',
        message: `Post #${id} not found`,
        statusCode: 404,
      });
    }

    return Promise.resolve(post);
  }

  async update(id: string, request: UpdatePostRequestInput): Promise<PostEntity> {
    const post = await this.postsRepository.preload({
      id,
      ...request,
    });

    if (!post) {
      throw new NotFoundException({
        error: 'Not Found',
        message: `Post #${id} not found`,
        statusCode: 404,
      });
    }

    return this.postsRepository.save(post);
  }

  async remove(id: string): Promise<SuccessDto> {
    const post = await this.findOne(id);
    await this.postsRepository.remove(post);

    return Promise.resolve({
      message: 'Post deleted successfully',
      statusCode: 200,
    });
  }
}
