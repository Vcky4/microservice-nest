import { INestApplication, Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    await this.$connect();
  }

  async enableShutdownHooks(app: INestApplication) {
    // Remove this since it's not applicable to the library engine in Prisma 5.0.0 and later
    // this.$on('beforeExit', async () => {
    //   await app.close();
    // });

    // Add your shutdown logic to the process directly
    process.on('beforeExit', async () => {
      await app.close();
    });
  }
}
