import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UserDocument, UserObject } from 'src/users/schemas/user.schema';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async login(username: string, pass: string): Promise<any> {
    const user = await this.usersService.getUser({ email: username });
    if (!user) {
      throw new UnauthorizedException('User does not exist');
    }

    if (!(await this.comparePasswords(pass, user.hashedPassword))) {
      throw new UnauthorizedException('Invalid login details');
    }

    return this.generateAuthToken(user);
  }

  async verifyAuthToken(token: string) {
    return await this.jwtService.verifyAsync(token, {
      secret: this.configService.get('jwtConstants.secret'),
    });
  }

  async signUp(createUserDto: CreateUserDto) {
    const foundUser = await this.usersService.getUser({
      email: createUserDto.email,
    });
    if (foundUser) {
      throw new BadRequestException('User with email already exists');
    }

    const { password, ...newUserObject } = {
      ...createUserDto,
      hashedPassword: await this.hashPassword(createUserDto.password),
    };

    const user = await this.usersService.createUser(newUserObject);
    return this.generateAuthToken(user);
  }

  private async generateAuthToken(user: UserObject) {
    const payload = { sub: user._id, username: user.email };

    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  private async hashPassword(pass: string) {
    return await bcrypt.hash(pass, 10);
  }

  private async comparePasswords(pass: string, hash: string): Promise<boolean> {
    return await bcrypt.compare(pass, hash);
  }
}
