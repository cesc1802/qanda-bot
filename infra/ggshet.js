import { google } from 'googleapis';
import fs from 'fs';

class GoogleSheetService {
    constructor(sheetId) {
        this.sheetId = sheetId;
        this.auth = this.authenticate();
    }

    authenticate() {
        const credentials = JSON.parse(fs.readFileSync('token.json', 'utf8'));
        const oauth2Client = new google.auth.OAuth2(
            process.env.CLIENT_ID,
            process.env.CLIENT_SECRET,
            'http://localhost'
        );
        oauth2Client.setCredentials(credentials);
        return oauth2Client;
    }

    async getSheetsInstance() {
        return google.sheets({ version: 'v4', auth: this.auth });
    }

    async readRange(range) {
        const sheets = await this.getSheetsInstance();
        const response = await sheets.spreadsheets.values.get({
            spreadsheetId: this.sheetId,
            range: range
        });
        return response.data.values;
    }

    async writeRange(range, values) {
        const sheets = await this.getSheetsInstance();
        const response = await sheets.spreadsheets.values.update({
            spreadsheetId: this.sheetId,
            range: range,
            valueInputOption: 'RAW',
            requestBody: { values }
        });
        return response.data;
    }
}

export default GoogleSheetService;
