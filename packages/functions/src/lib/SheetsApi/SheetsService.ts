import { google, sheets_v4 } from 'googleapis';

const GOOGLE_SERVICE_ACCOUNT_EMAIL =
  process.env['GOOGLE_SERVICE_ACCOUNT_EMAIL']!;
const GOOGLE_PRIVATE_KEY = process.env['GOOGLE_PRIVATE_KEY']!.replace(
  /\\n/g,
  '\n'
);
const GOOGLE_SHEET_ID = process.env['GOOGLE_SHEET_ID']!;
const SCOPES = 'https://www.googleapis.com/auth/spreadsheets';

export default class SheetsService {
  private sheets: sheets_v4.Sheets | null = null;
  private range: string | null = null;
  private colChar: string | null = null;
  private sheetName: string | null = null;

  constructor(sheetName: string, colChar: string, rowCount: number) {
    this.colChar = colChar;
    this.sheetName = sheetName;
    this.range = `${sheetName}!A1:${colChar}${rowCount}`;
  }

  public async getInstance(isReadonly = false): Promise<sheets_v4.Sheets> {
    if (!this.sheets) {
      const auth = new google.auth.GoogleAuth({
        credentials: {
          client_email: GOOGLE_SERVICE_ACCOUNT_EMAIL,
          private_key: GOOGLE_PRIVATE_KEY,
        },
        scopes: [`${SCOPES}${isReadonly ? '.readonly' : ''}`],
      });

      const client = await auth.getClient();
      this.sheets = google.sheets({ version: 'v4', auth: client as any });
    }

    return this.sheets;
  }

  public async getSheets() {
    if (!this.range) return;
    await this.getInstance();
    const response = await this.sheets?.spreadsheets.values.get({
      spreadsheetId: GOOGLE_SHEET_ID,
      range: this.range,
    });

    return response;
  }

  public async updateSheets(data: string[][], isClearBeforeUpdate = false) {
    if (!this.range) return;
    await this.getInstance();
    if (isClearBeforeUpdate) {
      await this.clearSheets();
    }
    const response = await this.sheets?.spreadsheets.values.update({
      spreadsheetId: GOOGLE_SHEET_ID,
      range: this.range,
      valueInputOption: 'RAW',
      requestBody: {
        values: data,
      },
    });

    return response;
  }

  public async clearSheets() {
    if (!this.range) return;
    await this.getInstance();
    await this.sheets?.spreadsheets.values.clear({
      spreadsheetId: GOOGLE_SHEET_ID,
      range: this.range,
    });
  }

  public async removeSheets(numberOfRows: number) {
    if (!this.sheetName || !this.colChar) return;
    await this.getInstance();
    return this.sheets?.spreadsheets.values.clear({
      spreadsheetId: GOOGLE_SHEET_ID,
      range: `${this.sheetName}!A${numberOfRows}:${this.colChar}${numberOfRows}`,
    });
  }

  public async appendSheets(data: string[]) {
    if (!this.range) return;
    await this.getInstance();
    return this.sheets?.spreadsheets.values.append({
      spreadsheetId: GOOGLE_SHEET_ID,
      range: this.range,
      valueInputOption: 'RAW',
      requestBody: {
        values: [data],
      },
    });
  }
}
