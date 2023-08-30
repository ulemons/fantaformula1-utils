import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { JSDOM } from 'jsdom';
import { DriverOfDay, FastestLap } from './utils.models';
import { DRIVER_OF_DAY_INDEX } from 'src/constants';

@Injectable()
export class UtilsService {
  async getFastestLap(year: string, raceNumber: number): Promise<FastestLap> {
    const response = await axios.get(
      `https://www.formula1.com/en/results.html/${year}/fastest-laps.html`,
    );

    const { window } = new JSDOM(response.data);
    const tBody = window.document.querySelectorAll('.resultsarchive-table');

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
    throw Error(`Error finding the result with index: ${raceNumber}`);
  }

  async getDriverOfDay(year: number, raceNumber: number): Promise<DriverOfDay> {
    const response = await axios.get(
      `https://www.formula1.com/en/latest/${DRIVER_OF_DAY_INDEX[year]}.html`,
    );

    const { window } = new JSDOM(response.data);
    const articles = window.document.querySelectorAll('.f1-article--rich-text');
    const drivers = [];
    for (const article of articles) {
      const filtered = article.textContent
        .split('\n')
        .filter((str) => str.replace(/\s/g, '').length > 0);
      if (filtered[1]) {
        drivers.push(filtered[1].split('-')[0].slice(0, -1));
      }
    }
    // The article page is ordered in the opposite order
    return {
      driver: drivers.reverse()[raceNumber - 1],
    };
  }
}
