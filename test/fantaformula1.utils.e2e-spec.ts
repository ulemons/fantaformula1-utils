import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { UtilsModule } from '../src/utils/utils.module';

describe('UtilsController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [UtilsModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/fantaformula1/fastest-lap/2023/1')
      .expect(200)
      .then((res) => {
        const { race, time, driver } = res.body;
        expect(race).toEqual('Bahrain');
        expect(time).toEqual('1:33.996');
        expect(driver).toEqual('Zhou Guanyu');
      });
  });
});
