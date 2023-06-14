import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreatePostRequestInput {
  @Field(() => String, { description: 'Post title' })
  title: string;

  @Field(() => String, { description: 'Post content' })
  content: string;

  @Field(() => [String], { description: 'Post tags' })
  tags: string[];

  @Field(() => String, { description: 'Post author' })
  author: string;
}
