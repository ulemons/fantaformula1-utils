import { BadRequestException, Injectable } from '@nestjs/common';
import { DriverOfDay, FastestLap, QualiToRace, TotalRaceNumber } from './utils.models';
import { DRIVER_OF_DAY_INDEX } from './constants';
import { UtilsHelper } from './utils.helper';

@Injectable()
export class UtilsService {
  async getFastestLap(year: string, raceNumber: number): Promise<FastestLap> {
    const tBody: NodeListOf<Element> = await UtilsHelper.getAllSelector(
      `https://www.formula1.com/en/results.html/${year}/fastest-laps.html`,
      '.resultsarchive-table',
    );
    for (const [index, row] of tBody[0].querySelectorAll('tr').entries()) {
      if (index == raceNumber) {
        const filtered = row.textContent
          .split('\n')
          .map((str) => str.replace(/\s/g, ''))
          .filter((str) => str.length > 0);
        return {
          race: filtered[0],
          time: filtered[5],
          driver: `${filtered[1]} ${filtered[2]}`,
        };
      }
    }
    throw new BadRequestException(`Error finding the result with index: ${raceNumber}`);
  }

  async getDriverOfDay(year: number, raceNumber: number): Promise<DriverOfDay> {
    const articles: NodeListOf<Element> = await UtilsHelper.getAllSelector(
      `https://www.formula1.com/en/latest/${DRIVER_OF_DAY_INDEX[year]}.html`,
      '.f1-article--rich-text',
    );
    const drivers = [];
    for (const article of articles) {
      const filtered = article.textContent
        .split('\n')
        .filter((str) => str.replace(/\s/g, '').length > 0)
        .map((str) => str.replace('–', '-'));
      if (filtered.length > 1) {
        drivers.push(filtered[1]);
      }
    }
    const totRaceFound = drivers.length;
    if (raceNumber > totRaceFound) {
      throw new BadRequestException(
        `Error finding driver of the day for race ${raceNumber}, only ${totRaceFound} races found`,
      );
    }
    // The article page is ordered in the opposite order
    const [driver, score] = drivers.reverse()[raceNumber - 1].split(' -');
    return {
      driver,
      score: score.trim(),
    };
  }

  async getTotalRaceNumber(year: number): Promise<TotalRaceNumber> {
    const races: NodeListOf<Element> = await UtilsHelper.getAllSelector(
      `https://www.formula1.com/en/results.html/${year}/races.html`,
      '.resultsarchive-filter-form-select',
    );
    return {
      raceNumber: Object.keys(races[2]).length - 1,
    };
  }

  async getQualiToRace(year: number, raceNumber: number): Promise<QualiToRace> {
    const elements: NodeListOf<Element> = await UtilsHelper.getAllSelector(
      `https://www.formula1.com/en/results.html/${year}/races.html`,
      '.resultsarchive-filter-form-select',
    );
    const optionElements = elements[elements.length - 1].querySelectorAll('option');
    const allOptionValues = Array.from(optionElements).map((option) => option.value);
    const selectedRace = allOptionValues[raceNumber];
    console.log(`Selected Race: ${selectedRace}`);
    const qualification = UtilsHelper.getResultsQuali(year, selectedRace);
    const race = UtilsHelper.getResultsRace(year, selectedRace);
    const [qualiResult, raceResult] = await Promise.all([qualification, race]);
    return UtilsHelper.getDiferenceRaceQuali(raceResult, qualiResult);
  }
}
