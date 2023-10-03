import { Test, TestingModule } from '@nestjs/testing';
import { UtilsService } from './utils.service';
import axios from 'axios';
import { DRIVER_OF_DAY_RESPONSE } from '../stubs/driver-of-day.response';

// jest.mock('axios');
// const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('Driver of the day', () => {
  let service: UtilsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UtilsService],
    }).compile();
    service = module.get<UtilsService>(UtilsService);
  });

  it('should get the right result for race: 1', async () => {
    // mockedAxios.get.mockResolvedValue({ data: DRIVER_OF_DAY_RESPONSE });
    const response = await service.getDriverOfDay(2023, 1);
    expect(service).toBeDefined();
    expect(response.driver).toEqual('Fernando Alonso');
  });

  it('should get the right result for race: 2', async () => {
    const response = await service.getDriverOfDay(2023, 2);
    expect(service).toBeDefined();
    expect(response.driver).toEqual('Max Verstappen');
  });

  it('should get the right result for race: 3', async () => {
    const response = await service.getDriverOfDay(2023, 3);
    expect(service).toBeDefined();
    expect(response.driver).toEqual('Sergio Perez');
  });

  it('should get the right result for race: 4', async () => {
    const response = await service.getDriverOfDay(2023, 4);
    expect(service).toBeDefined();
    expect(response.driver).toEqual('Sergio Perez');
  });

  it('should get the right result for race: 5', async () => {
    const response = await service.getDriverOfDay(2023, 5);
    expect(service).toBeDefined();
    expect(response.driver).toEqual('Max Verstappen');
  });

  // it('should throw error with the wrong param', async () => {
  //   mockedAxios.get.mockResolvedValue({ data: DRIVER_OF_DAY_RESPONSE });
  //   expect(service).toBeDefined();
  //   expect(service.getDriverOfDay(2023, 0)).rejects.toThrow();
  // });
});

describe('Fastest lap', () => {
  let service: UtilsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UtilsService],
    }).compile();
    service = module.get<UtilsService>(UtilsService);
  });

  it('should get the right result for race: 1', async () => {
    const response = await service.getFastestLap('2023', 1);
    expect(service).toBeDefined();
    expect(response.driver).toEqual('Zhou Guanyu');
  });

  it('should get the right result for race: 2', async () => {
    const response = await service.getFastestLap('2023', 2);
    expect(service).toBeDefined();
    expect(response.driver).toEqual('Max Verstappen');
  });

  it('should get the right result for race: 3', async () => {
    const response = await service.getFastestLap('2023', 3);
    expect(service).toBeDefined();
    expect(response.driver).toEqual('Sergio Perez');
  });

  it('should get the right result for race: 4', async () => {
    const response = await service.getFastestLap('2023', 4);
    expect(service).toBeDefined();
    expect(response.driver).toEqual('George Russell');
  });

  it('should get the right result for race: 5', async () => {
    const response = await service.getFastestLap('2023', 5);
    expect(service).toBeDefined();
    expect(response.driver).toEqual('Max Verstappen');
  });

  // it('should throw error with the wrong param', async () => {
  //   mockedAxios.get.mockResolvedValue({ data: DRIVER_OF_DAY_RESPONSE });
  //   expect(service).toBeDefined();
  //   expect(service.getDriverOfDay(2023, 0)).rejects.toThrow();
  // });
});

describe('Race Number', () => {
  let service: UtilsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UtilsService],
    }).compile();
    service = module.get<UtilsService>(UtilsService);
  });

  it('should get the right result for year: 2023', async () => {
    const response = await service.getTotalRaceNumber(2023);
    expect(service).toBeDefined();
    expect(response.raceNumber).toEqual(23);
  });

  it('should get the right result for year: 2022', async () => {
    const response = await service.getTotalRaceNumber(2022);
    expect(service).toBeDefined();
    expect(response.raceNumber).toEqual(22);
  });

  it('should get the right result for year: 2021', async () => {
    const response = await service.getTotalRaceNumber(2021);
    expect(service).toBeDefined();
    expect(response.raceNumber).toEqual(22);
  });

  it('should get the right result for year: 2020', async () => {
    const response = await service.getTotalRaceNumber(2020);
    expect(service).toBeDefined();
    expect(response.raceNumber).toEqual(17);
  });

  it('should get the right result for year: 2019', async () => {
    const response = await service.getTotalRaceNumber(2019);
    expect(service).toBeDefined();
    expect(response.raceNumber).toEqual(21);
  });

  // it('should throw error with the wrong param', async () => {
  //   mockedAxios.get.mockResolvedValue({ data: DRIVER_OF_DAY_RESPONSE });
  //   expect(service).toBeDefined();
  //   expect(service.getDriverOfDay(2023, 0)).rejects.toThrow();
  // });
});
