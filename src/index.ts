
import SpreadSheetDatastore from './spreadsheet-datastore';
import SlackNotification from './slack-notification';
import AtCoderAPI from './atcoder-api';

const WEBHOOK_URL = process.env.WEBHOOK_URL;
const CHANNEL = process.env.CHANNEL;
const EMOJI = process.env.EMOJI;

const KEY_FILE = process.env.KEY_FILE;
const SPREADSHEET_ID = process.env.SPREADSHEET_ID;
const SHEET_RANGE_USERS = process.env.SHEET_RANGE_USERS;
const SHEET_RANGE_LAST_AC_EPOCH = process.env.SHEET_RANGE_LAST_AC_EPOCH;


export default async function run() {
  const store = new SpreadSheetDatastore(KEY_FILE, SPREADSHEET_ID, SHEET_RANGE_USERS, SHEET_RANGE_LAST_AC_EPOCH);
  const slack = new SlackNotification(WEBHOOK_URL, CHANNEL, EMOJI)

  const api = new AtCoderAPI();

  await store.connect();

  const lastACEpoch: Number = await store.loadLastACEpoch();
  const users: String[] = await store.loadUsers();

  const acResults = await api.fetchNewAC(users, lastACEpoch);

  const texts: String[] = [];
  acResults.forEach(result => {
    const url = `<${result.problemUrl}|${result.problemName}>`;
    texts.push(`${result.userId} が ${url} を ${result.language} でACしたよ！`);
  });


  // slack.notify(texts.join('\n'));
  console.log(texts.join('\n'))

  if (acResults.length > 0) {
    const nextLastACEpoch = Math.max(...acResults.map(x => x.epoch as number));

    // await store.saveLastACEpoch(nextLastACEpoch);
  }
}

run();
