import axios from 'axios';
import { JSDOM } from 'jsdom';
import { QualiRaceResult, QualiToRace } from './utils.models';

export class UtilsHelper {
  public static async getResults(
    year: number,
    selectedRace: string,
    mode: string,
  ): Promise<QualiRaceResult[]> {
    const response = await axios.get(
      `https://www.formula1.com/en/results.html/${year}/races/${selectedRace}/${mode}.html`,
    );
    const { window } = new JSDOM(response.data);
    let result: QualiRaceResult[] = [];
    const tBody = window.document.querySelectorAll('.resultsarchive-table');

    for (const [index, row] of tBody[0].querySelectorAll('tr').entries()) {
      if (index == 0) continue;
      const filtered = row.textContent
        .split('\n')
        .filter((str) => str.replace(/\s+/g, '').length > 0)
        .map((str) => str.replace(/\s+/g, ''));
      let completedLaps;
      if (mode == 'race-result') {
        completedLaps = parseInt(filtered[6]);
      }
      result.push({
        driver: filtered[4],
        pos: filtered[7] == 'DNF' ? 'NC' : filtered[0],
        completedLaps,
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
      result[driver.driver] =
        parseInt(qualiMap[driver.driver]) - parseInt(driver.pos);
      index++;
    }

    return result;
  }
}
