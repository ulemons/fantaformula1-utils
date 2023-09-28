import axios from 'axios';
import { JSDOM } from 'jsdom';
import { QualiRaceResult, QualiToRace, Mode } from './utils.models';

export class UtilsHelper {
  public static async getResults(
    year: number,
    selectedRace: string,
    mode: Mode,
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
      console.log(filtered[4]);
      console.log(filtered);
      result.push({
        driver: filtered[4],
        pos: this.getPosition(filtered, mode),
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
      result[driver.driver] = parseInt(qualiMap[driver.driver]) - parseInt(driver.pos);
      index++;
    }

    return result;
  }

  private static getPosition(filtered: string[], mode: Mode) {
    if (mode == 'qualifying') {
      if (filtered[0] != 'NC') {
        return filtered[0];
      } else {
        // TODO BUG ALERT: IF THE DRIVER DO NO TAKE PLACE TO THE QUALIFY IS SEND TO THE LAST POSITION
        // WHAT IF WE HAVE 2 DRIVERS DOING THAT ?
        return '20';
      }
    }
    if (filtered.includes('DNF') || filtered.includes('NC')) {
      return 'NC';
    }
    return filtered[0];
  }
}
