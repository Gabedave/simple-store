import { MaxLength, IsNotEmpty, IsEmail } from 'class-validator';

export class CreateUserDto {
  @MaxLength(50)
  @IsNotEmpty()
  name: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  password: string;
}
