import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { JwtSignOptions } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { LoginDto } from './dto/auth.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configSerivce: ConfigService,
    private readonly usersService: UsersService,
  ) {}

  // [TEST PURPOSE ONLY]
  async testLogin(email: string) {
    const uid = await this.usersService.getUserIdByEmail(email);
    if (!uid) {
      return { error: 'User not found' };
    }
    const payload = { sub: uid };

    const jwtSignOptions: JwtSignOptions = {
      secret: this.configSerivce.get<string>('SUPABASE_JWT_SECRET'),
    };

    return {
      access_token: await this.jwtService.signAsync(payload, jwtSignOptions),
    };
  }

  /**
   * Login or register the user with the access token
   * Steps
   * 1. get user info from the access token (JWT uid)
   * 2. verify the JWT with supabase secret key
   * 3. check if the user exists in the database
   * 4. if not, create a new user to sync service db with supabase
   * 5. return the user info
   * */
  async loginOrRegister(loginDto: LoginDto) {
    // TODO: additional verification & sign in logic

    const jwtSignOptions: JwtSignOptions = {
      secret: this.configSerivce.get<string>('SUPABASE_JWT_SECRET'),
    };

    // verified and decoded token
    // const decoded = await this.jwtService.decode(loginDto.accessToken);
    const verifiedToken = await this.jwtService.verifyAsync(
      loginDto.accessToken,
      jwtSignOptions,
    );

    // console.log('>>> verified token: ', verifiedToken);

    // user fields
    const uid = verifiedToken.sub;
    const email = verifiedToken.email;
    const name = verifiedToken.user_metadata.full_name; // TODO: name?
    const provider = verifiedToken.app_metadata.provider;

    // console.log('>>> uid: ', verifiedToken.sub);

    // check if the user exists in the database

    let user = await this.usersService.findOne(uid);

    if (!user) {
      user = await this.usersService.create({
        uid,
        email,
        name,
        provider,
      });
    }

    return user;
  }
}
