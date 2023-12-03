import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './schemas/user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async createUser(
    createUserDto: Pick<User, 'email' | 'name' | 'hashedPassword'>,
  ) {
    return this.userModel.create(createUserDto);
  }

  async getUser(partialUser: Partial<User> = {}) {
    return this.userModel.findOne(partialUser);
  }

  async findAll(): Promise<User[]> {
    return this.userModel.find();
  }
}
