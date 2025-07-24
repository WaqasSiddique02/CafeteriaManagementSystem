"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const swagger_1 = require("@nestjs/swagger");
const response_interceptor_1 = require("./interceptors/response/response.interceptor");
const exception_interceptor_1 = require("./interceptors/exception/exception.interceptor");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.enableCors();
    const config = new swagger_1.DocumentBuilder()
        .setTitle('Cafeteria Management API')
        .setDescription('Cafeteria Management System API Documentation')
        .setVersion('1.0')
        .addBearerAuth()
        .build();
    const documentFactory = () => swagger_1.SwaggerModule.createDocument(app, config);
    swagger_1.SwaggerModule.setup('docs', app, documentFactory);
    app.useGlobalFilters(new exception_interceptor_1.AllExceptionsFilter());
    app.useGlobalInterceptors(new response_interceptor_1.ResponseInterceptor());
    await app.listen(process.env.PORT ?? 3000).then(() => {
        console.log(`Application is running on: http://localhost:${process.env.PORT ?? 3000}`);
    });
}
bootstrap();
//# sourceMappingURL=main.js.map