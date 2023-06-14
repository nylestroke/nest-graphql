import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostEntity } from './entities/post.entity';
import { PostsResolver } from './posts.resolver';
import { PostsService } from './posts.service';
import { UsersModule } from '../users-router/users.module';

@Module({
  imports: [TypeOrmModule.forFeature([PostEntity]), UsersModule],
  providers: [PostsResolver, PostsService],
})
export class PostsModule {}
