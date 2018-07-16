import { IDatastore } from './interface/datastore';

export class SpreadSheetDatastore implements IDatastore {
  private readonly sheet: GoogleAppsScript.Spreadsheet.Sheet;
  constructor () {
    this.sheet = SpreadsheetApp.getActiveSheet();
    this.sheet.getRange(1, 1, 1, 1).setValue('ユーザー');
    this.sheet.getRange(1, 2, 1, 1).setValue('Last AC Epoch');
  }
  loadLastACEpoch (): Number {
    const epoch = String(this.getLastACEpochRange().getValue());
    return epoch === '' ? -1 : Number(epoch);
  }
  saveLastACEpoch (lastACEpoch: Number) {
    this.getLastACEpochRange().setValue(lastACEpoch);
  }
  loadUsers (): String[] {
    return this.sheet.getRange(2, 1, this.sheet.getLastRow(), 1).getValues().map(x => String(x[0]));
  }

  private getLastACEpochRange (): GoogleAppsScript.Spreadsheet.Range {
    return this.sheet.getRange(2, 2, 1, 1);
  }
}
