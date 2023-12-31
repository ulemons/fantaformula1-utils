import { BadRequestException, Controller, Get, Param } from '@nestjs/common';
import { UtilsService } from './utils.service';
import { DriverOfDay, FastestLap, QualiToRace, TotalRaceNumber } from './utils.models';
import { DRIVER_OF_DAY_SUPPORTED_YEAR, RACE_NUMBER_SUPPORTED_YEAR } from './constants';
import { ApiCreatedResponse, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('fantaformula1')
@Controller('/fantaformula1')
export class UtilsController {
  constructor(private utilsService: UtilsService) {}

  @ApiResponse({
    status: 400,
    description: 'Wrong combination of parameters for research',
  })
  @Get('/fastest-lap/:year/:raceNumber')
  async getFastestLap(
    @Param('year') year: string,
    @Param('raceNumber') raceNumber: number,
  ): Promise<FastestLap> {
    console.log(`Retrieving the fastest lap for race ${raceNumber} and year ${year}`);
    return await this.utilsService.getFastestLap(year, raceNumber);
  }

  @ApiResponse({
    status: 400,
    description: 'Wrong combination of parameters for research',
  })
  @Get('/driver-of-day/:year/:raceNumber')
  @ApiCreatedResponse({
    description: 'The combination of parmaeters has found a result.',
    type: DriverOfDay,
  })
  async getDriverOfDay(
    @Param('year') year: number,
    @Param('raceNumber') raceNumber: number,
  ): Promise<DriverOfDay> {
    console.log(
      `Retrieving the driver of the day for race ${raceNumber} and year ${year}`,
    );
    if (year < DRIVER_OF_DAY_SUPPORTED_YEAR) {
      throw new BadRequestException(`No data before ${DRIVER_OF_DAY_SUPPORTED_YEAR}`);
    }
    return await this.utilsService.getDriverOfDay(year, raceNumber);
  }

  @ApiResponse({
    status: 400,
    description: 'Wrong combination of parameters for research',
  })
  @Get('/total-race-number/:year')
  @ApiCreatedResponse({
    description: 'The combination of parmaeters has found a result.',
    type: TotalRaceNumber,
  })
  async getTotalRaceNumber(@Param('year') year: number): Promise<TotalRaceNumber> {
    console.log(`Retrieving the total number of races for year ${year}`);
    if (year < RACE_NUMBER_SUPPORTED_YEAR) {
      throw new BadRequestException(`No data before ${RACE_NUMBER_SUPPORTED_YEAR}`);
    }
    return await this.utilsService.getTotalRaceNumber(year);
  }

  @ApiResponse({
    status: 400,
    description: 'Wrong combination of parameters for research',
  })
  @Get('/quali-to-race/:year/:raceNumber')
  @ApiCreatedResponse({
    description: 'The combination of parmaeters has found a result.',
    type: QualiToRace,
  })
  async getQualiToRace(
    @Param('year') year: number,
    @Param('raceNumber') raceNumber: number,
  ): Promise<QualiToRace> {
    return await this.utilsService.getQualiToRace(year, raceNumber);
  }
}
