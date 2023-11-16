import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty()
  uid: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  provider: string;

  @ApiProperty({ required: false })
  name?: string;
}
