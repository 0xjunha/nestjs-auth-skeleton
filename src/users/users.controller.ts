import { Controller, Get, Request } from '@nestjs/common';
import { UsersService } from './users.service';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { UserEntity } from './entities/user.entity';

@Controller('users')
@ApiTags('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @ApiBearerAuth()
  @ApiOkResponse({ type: UserEntity })
  async getUser(@Request() req) {
    console.log('>>> req.user: ', req.user);
    return await this.usersService.findOne(req.user.sub);
  }
}
