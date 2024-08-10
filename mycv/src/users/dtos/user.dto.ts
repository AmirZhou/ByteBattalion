import { Expose } from 'class-transformer';

export class UserDto {
  @Expose()
  id: number;

  @Expose()
  email: string;

  @Expose()
  gender: string; // this will forced to be undefine, because entity no such thing.
}
