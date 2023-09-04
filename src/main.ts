import { NestFactory } from '@nestjs/core';
import { UtilsModule } from './utils/utils.module';
import {
  ExpressAdapter,
  NestExpressApplication,
} from '@nestjs/platform-express';
import * as express from 'express';
import * as functions from 'firebase-functions';

// async function bootstrap() {
//   const app = await NestFactory.create<NestExpressApplication>(UtilsModule);
//   await app.listen(3000);
// }

const server: express.Express = express();
export const createNestServer = async (expressInstance: express.Express) => {
  const adapter = new ExpressAdapter(expressInstance);
  const app = await NestFactory.create<NestExpressApplication>(
    UtilsModule,
    adapter,
    {},
  );
  app.enableCors();
  return app.init();
};
createNestServer(server)
  .then((v) => console.log('Nest Ready'))
  .catch((err) => console.error('Nest broken', err));
export const api: functions.HttpsFunction = functions.https.onRequest(server);

// if you want to use without firebasae function uncomment this line
// bootstrap();
