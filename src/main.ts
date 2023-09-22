import { NestFactory } from '@nestjs/core';
import { UtilsModule } from './utils/utils.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(UtilsModule);
  const config = new DocumentBuilder()
    .setTitle('FantaFormula1 Utils')
    .setDescription('The api to support the fantaformula1 game')
    .setVersion('3.0')
    .addTag('fantaformula1')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  await app.listen(3000);
}

bootstrap();
