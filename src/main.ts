import { NestFactory } from '@nestjs/core';
import { UtilsModule } from './utils/utils.module';
import {
  ExpressAdapter,
  NestExpressApplication,
} from '@nestjs/platform-express';
import * as express from 'express';
import * as functions from 'firebase-functions';
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

// if you want to use without firebasae function uncomment this line
bootstrap();

// const server: express.Express = express();
// export const createNestServer = async (expressInstance: express.Express) => {
//   const adapter = new ExpressAdapter(expressInstance);
//   const app = await NestFactory.create<NestExpressApplication>(
//     UtilsModule,
//     adapter,
//     {},
//   );
//   app.enableCors();
//   return app.init();
// };
// createNestServer(server)
//   .then((v) => console.log('Nest Ready'))
//   .catch((err) => console.error('Nest broken', err));
// export const api: functions.HttpsFunction = functions.https.onRequest(server);
