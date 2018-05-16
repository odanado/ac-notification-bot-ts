import * as Slack from 'typed-slack';
import { INotification } from './interface/notification';

export class SlackNotification implements INotification {
  private slack: Slack.IncomingWebhook;
  constructor (
    private readonly WEBHOOK_URL: string,
    private readonly CHANNEL: String,
    private readonly EMOJI: String) {
    this.slack = new Slack.IncomingWebhook(this.WEBHOOK_URL);
  }
  public notify (text: String): void {
    const options = {
      text,
      channel: this.CHANNEL,
      icon_emoji: this.EMOJI

    } as Slack.IncomingWebhookOptions;
    this.slack.send(options);
  }
}
