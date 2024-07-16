import { IsEmail, IsEnum, IsInt, IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsInt()
  age: number;

  @IsEmail()
  email: string;

  @IsEnum(['SED', 'INTERN', 'ADMIN'], { message: 'Invalid Role' })
  role: 'SDE' | 'INTERN' | 'ADMIN';
}
