import { Controller, Get, Post, Param, Body } from '@nestjs/common';
import {
  ApiOkResponse,
  ApiResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { Public } from './auth.decorator';
import { UserEntity } from 'src/users/entities/user.entity';
import { HttpStatus } from '@nestjs/common';
import { LoginDto } from './dto/auth.dto';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('test/:email')
  @Public()
  @ApiOperation({
    summary:
      '[주의: 백엔드 테스트용] 유저 이메일에 해당하는 supabase uid를 포함한 access_token을 발급',
  })
  @ApiOkResponse()
  async testLogin(@Param('email') email: string) {
    return await this.authService.testLogin(email);
  }

  @Post('authenticate')
  @Public()
  @ApiOperation({
    summary:
      '[Supabase 회원가입/로그인 뒤에 항상 가장 먼저 호출] 회원가입 또는 로그인 - Supabase에서 유저 정보를 불러와 저장한다.',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: '회원가입 또는 로그인된 유저 정보',
    type: UserEntity,
  })
  async authenticate(@Body() loginDto: LoginDto) {
    // async authenticate(@Body() loginDto: LoginDto): Promise<UserEntity> {
    return await this.authService.loginOrRegister(loginDto);
  }
}
