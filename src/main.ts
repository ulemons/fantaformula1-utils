import { NestFactory } from '@nestjs/core';
import { UtilsModule } from './utils/utils.module';

async function bootstrap() {
  const app = await NestFactory.create(UtilsModule);
  await app.listen(3000);
}
bootstrap();
