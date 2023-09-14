import { ApiExtension, ApiProperty } from '@nestjs/swagger';

export interface FastestLap {
  time: string;
  race: string;
  driver: string;
}

export class DriverOfDay {
  @ApiProperty()
  driver: string;

  @ApiProperty()
  score: string;
}
