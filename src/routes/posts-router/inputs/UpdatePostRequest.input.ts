import { Field, InputType, PartialType } from '@nestjs/graphql';
import { CreatePostRequestInput } from './CreatePostRequest.input';

@InputType()
export class UpdatePostRequestInput extends PartialType(CreatePostRequestInput) {
  @Field(() => String, { description: 'Identification number of post' })
  id: string;
}
