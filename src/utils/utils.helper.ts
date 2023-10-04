import axios from 'axios';
import { JSDOM } from 'jsdom';
import { QualiToRace, DriverResult } from './utils.models';

export class UtilsHelper {
  public static async getResultsRace(
    year: number,
    selectedRace: string,
  ): Promise<DriverResult[]> {
    const tBody: NodeListOf<Element> = await UtilsHelper.getAllSelector(
      `https://www.formula1.com/en/results.html/${year}/races/${selectedRace}/race-result.html`,
      '.resultsarchive-table',
    );
    let result: DriverResult[] = [];

    for (const [index, row] of tBody[0].querySelectorAll('tr').entries()) {
      if (index == 0) continue;
      const filtered = row.textContent
        .split('\n')
        .filter((str) => str.replace(/\s+/g, '').length > 0)
        .map((str) => str.replace(/\s+/g, ''));
      let completedLaps = parseInt(filtered[6]);
      result.push({
        driver: filtered[4],
        pos: this.getPosition(filtered),
        completedLaps,
      });
    }
    return result;
  }

  public static async getResultsQuali(
    year: number,
    selectedRace: string,
  ): Promise<DriverResult[]> {
    const tBody: NodeListOf<Element> = await UtilsHelper.getAllSelector(
      `https://www.formula1.com/en/results.html/${year}/races/${selectedRace}/qualifying.html`,
      '.resultsarchive-table',
    );
    let result: DriverResult[] = [];

    for (const [index, row] of tBody[0].querySelectorAll('tr').entries()) {
      if (index == 0) continue;
      const filtered = row.textContent
        .split('\n')
        .filter((str) => str.replace(/\s+/g, '').length > 0)
        .map((str) => str.replace(/\s+/g, ''));
      result.push({
        driver: filtered[4],
        pos: index.toString(),
      });
    }
    return result;
  }

  public static getDiferenceRaceQuali(
    race: DriverResult[],
    qualification: DriverResult[],
  ): QualiToRace {
    let result: QualiToRace = {};
    const qualiMap = qualification.reduce((result, item) => {
      result[item.driver] = item.pos;
      return result;
    }, {});

    for (let driver of race) {
      let score = 0;
      if (driver.pos == 'NC') {
        score = driver.completedLaps == 0 ? -4 : -2;
      } else {
        score = parseInt(qualiMap[driver.driver]) - parseInt(driver.pos);
      }
      result[driver.driver] = score;
    }
    return result;
  }

  public static async getAllSelector(
    url: string,
    selectorName: string,
  ): Promise<NodeListOf<Element>> {
    const response = await axios.get(url);
    let { window } = new JSDOM(response.data);
    const elements = window.document.querySelectorAll(selectorName);
    return elements;
  }

  private static getPosition(filtered: string[]) {
    return filtered.includes('DNF') || filtered.includes('NC') ? 'NC' : filtered[0];
  }
}
