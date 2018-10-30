import * as google from 'googleapis';
import { GoogleAuth, JWT } from 'google-auth-library';

import { IDatastore } from './interface/datastore';

export default class SpreadSheetDatastore implements IDatastore {
  private auth: GoogleAuth;
  private client: JWT;
  private scopes = ['https://www.googleapis.com/auth/spreadsheets'];
  private sheets: google.sheets_v4.Sheets;
  private spreadsheetId: string;
  private rangeUsers: string;
  private rangeLastACEpoch: string;

  constructor(keyFile: string, spreadsheetId: string, rangeUsers: string, rangeLastACEpoch: string) {
    this.auth = new GoogleAuth({
      keyFile,
      scopes: this.scopes,
    });
    this.spreadsheetId = spreadsheetId;
    this.rangeUsers = rangeUsers;
    this.rangeLastACEpoch = rangeLastACEpoch;
  }

  async connect(): Promise<void> {
    this.client = await this.auth.getClient() as JWT;
    this.sheets = new google.sheets_v4.Sheets({
      auth: this.client,
    });
  }

  private async getValues(range: string): Promise<any[][]> {
    const { data } = await this.sheets.spreadsheets.values.get({
      spreadsheetId: this.spreadsheetId,
      range,
    });
    return data.values;
  }

  private async setValues(range: string, values: any[][]): Promise<void> {
    await this.sheets.spreadsheets.values.update({
      spreadsheetId: this.spreadsheetId,
      range,
      valueInputOption: 'RAW',
      requestBody: {
        values,
      },
    })
  }

  async loadUsers(): Promise<String[]> {
    const values = await this.getValues(this.rangeUsers);
    return values.map(x => x[0] as String);
  }
  async loadLastACEpoch(): Promise<Number> {
    const values = await this.getValues(this.rangeLastACEpoch);
    return values[0][0] as Number;
  }
  async saveLastACEpoch(lastACEpoch: Number): Promise<void> {
    await this.setValues(this.rangeLastACEpoch, [[ String(lastACEpoch) ]]);
  }
}
