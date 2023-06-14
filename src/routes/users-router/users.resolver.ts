import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { UserEntity } from './entities/user.entity';
import { CreateUserInput } from './inputs/CreateUserRequest.input';
import { UpdateUserInput } from './inputs/UpdateUserRequest.input';
import {UseGuards} from "@nestjs/common";
import {AuthGuard} from "../../auth/auth.guard";

@Resolver(() => UserEntity)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(AuthGuard)
  @Mutation(() => UserEntity)
  createUser(@Args('createUserInput') request: CreateUserInput) {
    return this.usersService.create(request);
  }

  @Query(() => [UserEntity], { name: 'users' })
  findAll() {
    return this.usersService.findAll();
  }

  @Query(() => UserEntity, { name: 'user' })
  findOne(@Args('identificationNumber', { type: () => String }) identificationNumber: string) {
    return this.usersService.findOne(identificationNumber);
  }

  @UseGuards(AuthGuard)
  @Mutation(() => UserEntity)
  updateUser(@Args('updateUserInput') request: UpdateUserInput) {
    return this.usersService.update(request.identificationNumber, request);
  }

  @UseGuards(AuthGuard)
  @Mutation(() => UserEntity)
  removeUser(@Args('identificationNumber', { type: () => String }) identificationNumber: string) {
    return this.usersService.remove(identificationNumber);
  }
}
