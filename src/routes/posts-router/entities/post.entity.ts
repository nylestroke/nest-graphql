import { ObjectType, Field } from '@nestjs/graphql';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { UserEntity } from '../../users-router/entities/user.entity';

@Entity()
@ObjectType()
export class PostEntity {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String, { description: 'Identification number of post' })
  id: string;

  @Column()
  @Field(() => String, { description: 'Post title' })
  title: string;

  @Column()
  @Field(() => String, { description: 'Post content' })
  content: string;

  @Column({ nullable: true, type: 'jsonb' })
  @Field(() => [String], { description: 'Post tags' })
  tags: string[];

  @Column({ nullable: false })
  @ManyToOne(() => UserEntity, (user) => user.identificationNumber)
  @Field(() => String, { description: 'Post author' })
  author: string;
}
