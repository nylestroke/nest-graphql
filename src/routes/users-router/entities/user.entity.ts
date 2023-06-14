import { ObjectType, Field } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
@ObjectType()
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String, { description: 'Identification number of user' })
  identificationNumber: string;

  @Column()
  @Field(() => String, { description: 'User`s first name' })
  firstName: string;

  @Column()
  @Field(() => String, { description: 'User`s last name' })
  lastName: string;

  @Column()
  @Field(() => String, { description: 'User email' })
  email: string;

  @Column({ nullable: true })
  @Field(() => String, { description: 'User role' })
  role: string;
}
