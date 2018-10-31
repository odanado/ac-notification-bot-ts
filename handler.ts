import { APIGatewayEvent, Callback, Context, Handler } from 'aws-lambda';

import { Bot, SpreadSheetDatastore, SlackNotification, AtCoderAPI } from './src';

const WEBHOOK_URL = process.env.WEBHOOK_URL;
const CHANNEL = process.env.CHANNEL;
const EMOJI = process.env.EMOJI;

const KEY_FILE = process.env.KEY_FILE;
const SPREADSHEET_ID = process.env.SPREADSHEET_ID;
const SHEET_RANGE_USERS = process.env.SHEET_RANGE_USERS;
const SHEET_RANGE_LAST_AC_EPOCH = process.env.SHEET_RANGE_LAST_AC_EPOCH;



export const hello: Handler = async (event: APIGatewayEvent, context: Context, cb: Callback) => {
  const response = {
    statusCode: 200,
    body: JSON.stringify({
      message: 'Go Serverless Webpack (Typescript) v1.0! Your function executed successfully!',
      input: event,
    }),
  };

  cb(null, response);
}

export const acNotification: Handler = async () => {
  console.log('poyo')
  const store = new SpreadSheetDatastore(KEY_FILE, SPREADSHEET_ID, SHEET_RANGE_USERS, SHEET_RANGE_LAST_AC_EPOCH);
  const slack = new SlackNotification(WEBHOOK_URL, CHANNEL, EMOJI)

  const api = new AtCoderAPI();

  const bot = new Bot(store, slack, api);

  await bot.run();
}
