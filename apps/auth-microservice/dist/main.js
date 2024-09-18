"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const auth_module_1 = require("./src/auth/auth.module");
const microservices_1 = require("@nestjs/microservices");
async function bootstrap() {
    const app = await core_1.NestFactory.createMicroservice(auth_module_1.AuthModule, {
        transport: microservices_1.Transport.TCP,
        options: {
            host: '127.0.0.1',
            port: 3001,
        },
    });
    await app.listen();
}
bootstrap();
//# sourceMappingURL=main.js.map