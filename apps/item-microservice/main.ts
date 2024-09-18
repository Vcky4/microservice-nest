import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import { ItemModule } from './src/item/item.module';

async function bootstrap() {
    const app = await NestFactory.createMicroservice(ItemModule, {
        transport: Transport.TCP,
        options: {
            host: '127.0.0.1',
            port: 3002,
        },
    });

    await app.listen();
}
bootstrap();
