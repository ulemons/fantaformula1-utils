import { Test, TestingModule } from '@nestjs/testing';
import { UtilsService } from './utils.service';
import { assert } from 'console';

describe('UtilsHelper', () => {
  let service: UtilsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UtilsService],
    }).compile();
    service = module.get<UtilsService>(UtilsService);
  });

  it('should map correctly the race 1 of year 2023 ', async () => {
    const resp = await service.getQualiToRace(2023, 1);
    expect(resp['BOT']).toEqual(4);
    expect(resp['HAM']).toEqual(2);
    expect(resp['STR']).toEqual(2);
    expect(resp['GAS']).toEqual(11);
    expect(resp['ALO']).toEqual(2);
    expect(resp['ZHO']).toEqual(-3);
    expect(resp['RUS']).toEqual(-1);
    expect(resp['HUL']).toEqual(-5);
    expect(resp['NOR']).toEqual(-6);
  });

  it('should map correctly the race 2 of year 2023 ', async () => {
    const resp = await service.getQualiToRace(2023, 2);
    expect(resp['BOT']).toEqual(-4);
    expect(resp['HAM']).toEqual(3);
    expect(resp['STR']).toEqual(-2);
    expect(resp['GAS']).toEqual(1);
    expect(resp['ALO']).toEqual(0);
    expect(resp['ZHO']).toEqual(-1);
    expect(resp['RUS']).toEqual(0);
    expect(resp['HUL']).toEqual(-1);
    expect(resp['NOR']).toEqual(2);
  });

  it('should map correctly the race 3 of year 2023 ', async () => {
    const resp = await service.getQualiToRace(2023, 3);
    expect(resp['BOT']).toEqual(8);
    expect(resp['HAM']).toEqual(1);
    expect(resp['STR']).toEqual(2);
    expect(resp['GAS']).toEqual(-2);
    expect(resp['ALO']).toEqual(1);
    expect(resp['ZHO']).toEqual(8);
    expect(resp['RUS']).toEqual(-2);
    expect(resp['HUL']).toEqual(3);
    expect(resp['NOR']).toEqual(7);
  });

  it('should map correctly the race 4 of year 2023 ', async () => {
    const resp = await service.getQualiToRace(2023, 4);
    expect(resp['BOT']).toEqual(-4);
    expect(resp['HAM']).toEqual(-1);
    expect(resp['STR']).toEqual(2);
    expect(resp['GAS']).toEqual(5);
    expect(resp['ALO']).toEqual(2);
    expect(resp['ZHO']).toEqual(-2);
    expect(resp['RUS']).toEqual(3);
    expect(resp['HUL']).toEqual(0);
    expect(resp['NOR']).toEqual(-2);
  });

  it('should map correctly the race 5 of year 2023 ', async () => {
    const resp = await service.getQualiToRace(2023, 5);
    expect(resp['BOT']).toEqual(-3);
    expect(resp['HAM']).toEqual(7);
    expect(resp['STR']).toEqual(6);
    expect(resp['GAS']).toEqual(-3);
    expect(resp['ALO']).toEqual(-1);
    expect(resp['ZHO']).toEqual(-2);
    expect(resp['RUS']).toEqual(2);
    expect(resp['HUL']).toEqual(-3);
    expect(resp['NOR']).toEqual(-1);
  });

  // race 6 of the year was skipped, monza did not take place

  it('should map correctly the race 7 of year 2023 ', async () => {
    const resp = await service.getQualiToRace(2023, 7);
    expect(resp['BOT']).toEqual(4);
    expect(resp['HAM']).toEqual(2);
    expect(resp['STR']).toEqual(-2);
    expect(resp['GAS']).toEqual(0);
    expect(resp['ALO']).toEqual(0);
    expect(resp['ZHO']).toEqual(6);
    expect(resp['RUS']).toEqual(3);
    expect(resp['HUL']).toEqual(1);
    expect(resp['NOR']).toEqual(1);
  });

  it('should map correctly the race 8 of year 2023 ', async () => {
    const resp = await service.getQualiToRace(2023, 8);
    expect(resp['BOT']).toEqual(-3);
    expect(resp['HAM']).toEqual(3);
    expect(resp['STR']).toEqual(0);
    expect(resp['GAS']).toEqual(-6);
    expect(resp['ALO']).toEqual(2);
    expect(resp['ZHO']).toEqual(4);
    expect(resp['RUS']).toEqual(9);
    expect(resp['HUL']).toEqual(-7);
    expect(resp['NOR']).toEqual(-14);
  });

  it('should map correctly the race 9 of year 2023 ', async () => {
    const resp = await service.getQualiToRace(2023, 9);
    expect(resp['BOT']).toEqual(5);
    expect(resp['HAM']).toEqual(1);
    expect(resp['STR']).toEqual(4);
    expect(resp['GAS']).toEqual(5);
    expect(resp['ALO']).toEqual(1);
    expect(resp['ZHO']).toEqual(4);
    expect(resp['RUS']).toEqual(-2);
    expect(resp['HUL']).toEqual(-13);
    expect(resp['NOR']).toEqual(-6);
  });

  it('should map correctly the race 10 of year 2023 ', async () => {
    const resp = await service.getQualiToRace(2023, 10);
    expect(resp['BOT']).toEqual(-1);
    expect(resp['HAM']).toEqual(-3);
    expect(resp['STR']).toEqual(-3);
    expect(resp['GAS']).toEqual(-1);
    expect(resp['ALO']).toEqual(2);
    expect(resp['ZHO']).toEqual(5);
    expect(resp['RUS']).toEqual(4);
    expect(resp['HUL']).toEqual(-2);
    expect(resp['NOR']).toEqual(0);
  });

  it('should map correctly the race 11 of year 2023 ', async () => {
    const resp = await service.getQualiToRace(2023, 11);
    expect(resp['BOT']).toEqual(3);
    expect(resp['HAM']).toEqual(4);
    expect(resp['STR']).toEqual(-2);
    expect(resp['GAS']).toEqual(-2);
    expect(resp['ALO']).toEqual(2);
    expect(resp['ZHO']).toEqual(3);
    expect(resp['RUS']).toEqual(1);
    expect(resp['HUL']).toEqual(-2);
    expect(resp['NOR']).toEqual(0);
  });

  it('should map correctly the race 12 of year 2023 ', async () => {
    const resp = await service.getQualiToRace(2023, 12);
    expect(resp['BOT']).toEqual(-5);
    expect(resp['HAM']).toEqual(-3);
    expect(resp['STR']).toEqual(4);
    expect(resp['GAS']).toEqual(-2);
    expect(resp['ALO']).toEqual(-1);
    expect(resp['ZHO']).toEqual(-11);
    expect(resp['RUS']).toEqual(12);
    expect(resp['HUL']).toEqual(-4);
    expect(resp['NOR']).toEqual(1);
  });

  it('should map correctly the race 13 of year 2023 ', async () => {
    const resp = await service.getQualiToRace(2023, 13);
    expect(resp['BOT']).toEqual(2);
    expect(resp['HAM']).toEqual(0);
    expect(resp['STR']).toEqual(1);
    expect(resp['GAS']).toEqual(1);
    expect(resp['ALO']).toEqual(4);
    expect(resp['ZHO']).toEqual(4);
    expect(resp['RUS']).toEqual(2);
    expect(resp['HUL']).toEqual(2);
    expect(resp['NOR']).toEqual(0);
  });

  it('should map correctly the race 14 of year 2023 ', async () => {
    const resp = await service.getQualiToRace(2023, 14);
    expect(resp['BOT']).toEqual(5);
    expect(resp['HAM']).toEqual(7);
    expect(resp['STR']).toEqual(0);
    expect(resp['GAS']).toEqual(9);
    expect(resp['ALO']).toEqual(3);
    expect(resp['ZHO']).toEqual(-2);
    expect(resp['RUS']).toEqual(-14);
    expect(resp['HUL']).toEqual(3);
    expect(resp['NOR']).toEqual(-5);
  });

  it('should map correctly the race 15 of year 2023 ', async () => {
    const resp = await service.getQualiToRace(2023, 15);
    expect(resp['BOT']).toEqual(4);
    expect(resp['HAM']).toEqual(2);
    expect(resp['STR']).toEqual(4);
    expect(resp['GAS']).toEqual(2);
    expect(resp['ALO']).toEqual(1);
    expect(resp['ZHO']).toEqual(2);
    expect(resp['RUS']).toEqual(-1);
    expect(resp['HUL']).toEqual(-4);
    expect(resp['NOR']).toEqual(1);
  });

  it('should map correctly the race 16 of year 2023 ', async () => {
    const resp = await service.getQualiToRace(2023, 16);
    expect(resp['BOT']).toEqual(-2);
    expect(resp['HAM']).toEqual(2);
    expect(resp['GAS']).toEqual(6);
    expect(resp['ALO']).toEqual(-8);
    expect(resp['ZHO']).toEqual(7);
    expect(resp['RUS']).toEqual(-2);
    expect(resp['HUL']).toEqual(-4);
    expect(resp['NOR']).toEqual(2);
  });

  it('should map correctly the race 17 of year 2023 ', async () => {
    const resp = await service.getQualiToRace(2023, 17);
    expect(resp['BOT']).toEqual(-2);
    expect(resp['HAM']).toEqual(2);
    expect(resp['STR']).toEqual(-2);
    expect(resp['GAS']).toEqual(2);
    expect(resp['ALO']).toEqual(2);
    expect(resp['ZHO']).toEqual(6);
    expect(resp['RUS']).toEqual(1);
    expect(resp['HUL']).toEqual(4);
    expect(resp['NOR']).toEqual(1);
  });
});
