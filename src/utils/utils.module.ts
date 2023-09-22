import { Module } from '@nestjs/common';
import { UtilsController } from './utils.controller';
import { UtilsService } from './utils.service';
import { DRIVER_OF_DAY_RESPONSE } from 'src/stubs/driver-of-day.response';

@Module({
  controllers: [UtilsController],
  providers: [
    UtilsService,
    // {
    //   provide: 'DRIVER_OF_DAY_RESPONSE',
    //   useValue: DRIVER_OF_DAY_RESPONSE,
    // },
  ],
})
export class UtilsModule {}
