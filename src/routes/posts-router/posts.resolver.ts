import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { PostsService } from './posts.service';
import { UpdatePostRequestInput } from './inputs/UpdatePostRequest.input';
import { CreatePostRequestInput } from './inputs/CreatePostRequest.input';
import { PostEntity } from './entities/post.entity';

@Resolver(() => PostEntity)
export class PostsResolver {
  constructor(private readonly postsService: PostsService) {}

  @Mutation(() => PostEntity)
  createPost(@Args('createPostRequest') request: CreatePostRequestInput) {
    return this.postsService.create(request);
  }

  @Query(() => [PostEntity], { name: 'posts' })
  findAll() {
    return this.postsService.findAll();
  }

  @Query(() => PostEntity, { name: 'post' })
  findOne(@Args('id', { type: () => String }) id: string) {
    return this.postsService.findOne(id);
  }

  @Mutation(() => PostEntity)
  updatePost(@Args('updatePostRequest') request: UpdatePostRequestInput) {
    return this.postsService.update(request.id, request);
  }

  @Mutation(() => PostEntity)
  removePost(@Args('id', { type: () => String }) id: string) {
    return this.postsService.remove(id);
  }
}
