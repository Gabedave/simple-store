import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { User, UserDocument, UserObject } from './schemas/user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async createUser(
    createUserDto: Pick<User, 'email' | 'name' | 'hashedPassword'>,
  ) {
    return (await this.userModel.create(createUserDto)).toObject();
  }

  async getUser(partialUser: Partial<User> = {}): Promise<UserObject> {
    return await this.userModel.findOne(partialUser).lean();
  }

  async getAllUsers(): Promise<User[]> {
    return (await this.userModel.find().lean())?.map(this.sanitizeUser);
  }

  async getCleanUser(partialUser: Partial<User> = {}) {
    return this.sanitizeUser(await this.getUser(partialUser));
  }

  private sanitizeUser(user: User) {
    if (!user) {
      return null;
    }

    const { hashedPassword, ...sanitizedUser } = user;
    return sanitizedUser as UserObject;
  }
}
