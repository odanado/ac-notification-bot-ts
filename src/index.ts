import { SpreadSheetDatastore } from './spreadsheet-datastore';
import { SlackNotification } from './slack-notification';
import { AtcoderAPI } from './atcoder-api';

global.slack = () => {
  const webhookUrl = PropertiesService.getScriptProperties().getProperty('webhook_url');
  Logger.log(`webhook url = ${webhookUrl}`);
  const datastore = new SpreadSheetDatastore();
  const notification = new SlackNotification(
    webhookUrl!,
    'notice-ac',
    ':ac:');
  const api = new AtcoderAPI();

  let lastACEpoch = datastore.loadLastACEpoch();
  if (lastACEpoch === -1) {
    lastACEpoch = Date.now() / 1000 - 60 * 10;
  }
  Logger.log(`last ac epoch = ${lastACEpoch}`);

  const users = datastore.loadUsers();
  Logger.log(`users = ${users}`);

  const acResults = api.fetchNewAC(users, lastACEpoch);

  acResults.forEach(result => {
    const url = `<${result.problemUrl}|${result.problemName}>`;
    notification.notify(`${result.userId} が ${url} を ${result.language} でACしたよ！`);
  });

  if (acResults.length > 0) {
    lastACEpoch = Math.max(...acResults.map(x => x.epoch as number));

    datastore.saveLastACEpoch(lastACEpoch);
  }

};
