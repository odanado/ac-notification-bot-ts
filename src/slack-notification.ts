
import { INotification } from './interface/notification';

export class SlackNotification implements INotification {
  constructor (
    private readonly WEBHOOK_URL: string,
    private readonly CHANNEL: String,
    private readonly EMOJI: String) {
  }
  public notify (text: String): void {
    const payload = {
      'username': 'notice-ac-bot',
      'channel': this.CHANNEL,
      'text': text,
      'icon_emoji': this.EMOJI
    };
    const options = {
      'method': 'post',
      'contentType': 'application/json',
      'payload': JSON.stringify(payload)
    } as GoogleAppsScript.URL_Fetch.URLFetchRequestOptions;
    UrlFetchApp.fetch(this.WEBHOOK_URL, options);
  }
}
