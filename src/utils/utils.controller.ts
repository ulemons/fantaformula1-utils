import {
  BadRequestException,
  Controller,
  Get,
  NotFoundException,
  Param,
} from '@nestjs/common';
import { UtilsService } from './utils.service';
import { DriverOfDay, FastestLap } from './utils.models';
import { DRIVER_OF_DAY_SUPPORTED_YEAR } from './constants';
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
    console.log(
      `Retrieving the fastest lap for race ${raceNumber} and year ${year}`,
    );
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
      throw new BadRequestException(
        `No data before ${DRIVER_OF_DAY_SUPPORTED_YEAR}`,
      );
    }
    return await this.utilsService.getDriverOfDay(year, raceNumber);
  }
}
