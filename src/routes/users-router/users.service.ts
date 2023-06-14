import { Injectable, NotFoundException, UseGuards } from '@nestjs/common';
import { UserEntity } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserInput } from './inputs/CreateUserRequest.input';
import { UpdateUserInput } from './inputs/UpdateUserRequest.input';
import { SuccessDto } from '../../shared/dto/Success.dto';
import { AuthGuard } from '../../auth/auth.guard';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async create(request: CreateUserInput): Promise<UserEntity> {
    const user = this.userRepository.create(request);
    return this.userRepository.save(user);
  }

  async findAll(): Promise<Array<UserEntity>> {
    return this.userRepository.find();
  }

  async findOne(identificationNumber: string): Promise<UserEntity> {
    const user = await this.userRepository.findOne({ where: { identificationNumber } });

    if (!user) {
      throw new NotFoundException({
        error: 'Not Found',
        message: `User #${identificationNumber} not found`,
        statusCode: 404,
      });
    }

    return Promise.resolve(user);
  }

  async update(identificationNumber: string, request: UpdateUserInput): Promise<UserEntity> {
    const user = await this.userRepository.preload({
      identificationNumber,
      ...request,
    });

    if (!user) {
      throw new NotFoundException({
        error: 'Not Found',
        message: `User #${identificationNumber} not found`,
        statusCode: 404,
      });
    }

    return this.userRepository.save(user);
  }

  async remove(identificationNumber: string): Promise<SuccessDto> {
    const user = await this.findOne(identificationNumber);
    await this.userRepository.remove(user);

    return Promise.resolve({
      message: 'User deleted successfully',
      statusCode: 200,
    });
  }
}
