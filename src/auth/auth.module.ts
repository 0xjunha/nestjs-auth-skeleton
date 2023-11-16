import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtService } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { SupabaseStrategy } from './supabase/supabase.strategy';
import { PassportModule } from '@nestjs/passport';
import { UsersModule } from 'src/users/users.module';

// here, we register JWT module just for the TEST LOGIN PURPOSE
@Module({
  imports: [PassportModule, UsersModule],
  providers: [AuthService, JwtService, SupabaseStrategy],
  exports: [AuthService, JwtService, SupabaseStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
