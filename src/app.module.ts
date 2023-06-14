import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './routes/users-router/users.module';
import { ApolloDriver } from '@nestjs/apollo';
import { PostsModule } from './routes/posts-router/posts.module';
import * as process from 'process';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        API_PORT: Joi.number().default(3000),
        DEV_MODE: Joi.boolean().default(false),
        CFG: Joi.string().required(),
      }),
    }),
    GraphQLModule.forRoot({
      driver: ApolloDriver,
      autoSchemaFile: './schema.gql',
      playground: true,
      debug: true,
    }),
    TypeOrmModule.forRoot({
      keepConnectionAlive: true,
      autoLoadEntities: true,
      synchronize: true,
      ...JSON.parse(process.env.CFG).db,
    }),
    UsersModule,
    PostsModule,
  ],
})
export class AppModule {}
