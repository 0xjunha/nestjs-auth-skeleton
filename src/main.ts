// src/main.ts

import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { SupabaseAuthGuard } from './auth/supabase/supabase.auth.guard';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const reflector = app.get(Reflector);
  app.useGlobalGuards(new SupabaseAuthGuard(reflector));

  const config = new DocumentBuilder()
    .setTitle('Nest Backend API')
    .setDescription('Nest Backend API')
    .setVersion('0.1')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(8000);
}
bootstrap();
