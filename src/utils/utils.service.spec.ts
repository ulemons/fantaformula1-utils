import { Test, TestingModule } from '@nestjs/testing';
import { UtilsService } from './utils.service';
import axios from 'axios';
import { DRIVER_OF_DAY_RESPONSE } from '../stubs/driver-of-day.response';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('UtilsService', () => {
  let service: UtilsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UtilsService],
    }).compile();
    service = module.get<UtilsService>(UtilsService);
  });

  // it('should get the right result', async () => {
  //   mockedAxios.get.mockResolvedValue({ data: DRIVER_OF_DAY_RESPONSE });
  //   const response = await service.getDriverOfDay(2023, 1);
  //   expect(service).toBeDefined();
  //   expect(response.driver).toEqual('Fernando Alonso');
  // });

  // it('should throw error with the wrong param', async () => {
  //   mockedAxios.get.mockResolvedValue({ data: DRIVER_OF_DAY_RESPONSE });
  //   expect(service).toBeDefined();
  //   expect(service.getDriverOfDay(2023, 0)).rejects.toThrow();
  // });
});
