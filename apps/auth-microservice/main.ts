import { NestFactory } from '@nestjs/core';
import { AuthModule } from './src/auth/auth.module';
import { Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.createMicroservice(AuthModule, {
    transport: Transport.TCP,
    options: {
      host: '127.0.0.1',
      port: 3001,
    },
  });

  await app.listen();
}
bootstrap();
