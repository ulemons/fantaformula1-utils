import axios from 'axios';
import { JSDOM } from 'jsdom';
import { QualiRaceResult, QualiToRace, Mode } from './utils.models';

export class UtilsHelper {
  public static async getResultsRace(
    year: number,
    selectedRace: string,
  ): Promise<QualiRaceResult[]> {
    const tBody: NodeListOf<Element> = await UtilsHelper.getAllSelector(
      `https://www.formula1.com/en/results.html/${year}/races/${selectedRace}/race-result.html`,
      '.resultsarchive-table',
    );
    let result: QualiRaceResult[] = [];

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
  ): Promise<QualiRaceResult[]> {
    const tBody: NodeListOf<Element> = await UtilsHelper.getAllSelector(
      `https://www.formula1.com/en/results.html/${year}/races/${selectedRace}/qualifying.html`,
      '.resultsarchive-table',
    );
    let result: QualiRaceResult[] = [];

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
    race: QualiRaceResult[],
    quali: QualiRaceResult[],
  ): QualiToRace {
    let result: QualiToRace = {};
    let qualiMap = quali.reduce((result, item) => {
      result[item.driver] = item.pos;
      return result;
    }, {});
    let index = 0;

    for (let driver of race) {
      if (driver.pos == 'NC') {
        result[driver.driver] = driver.completedLaps == 0 ? -4 : -2;
        continue;
      }
      result[driver.driver] = parseInt(qualiMap[driver.driver]) - parseInt(driver.pos);
      index++;
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
    if (filtered.includes('DNF') || filtered.includes('NC')) {
      return 'NC';
    }
    return filtered[0];
  }
}
