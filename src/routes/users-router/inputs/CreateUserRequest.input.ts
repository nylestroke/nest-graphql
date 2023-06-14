import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateUserInput {
  @Field(() => String, { description: 'User`s first name' })
  firstName: string;

  @Field(() => String, { description: 'User`s last name' })
  lastName: string;

  @Field(() => String, { description: 'User email' })
  email: string;

  @Field(() => String, { description: 'User role' })
  role: string;
}
