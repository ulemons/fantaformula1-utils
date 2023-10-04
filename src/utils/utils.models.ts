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

export class TotalRaceNumber {
  raceNumber: number;
}

export class QualiToRace {
  [key: string]: number;
}

export class DriverResult {
  driver: string;
  pos: string;
  completedLaps?: number;
}

export type Mode = 'qualifying' | 'race-result' | 'starting-grid';
