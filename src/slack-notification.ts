import axios from 'axios'
import { INotification } from './interface';

export default class SlackNotification implements INotification {
  constructor (
    private readonly WEBHOOK_URL: string,
    private readonly CHANNEL: String,
    private readonly EMOJI: String) {
  }
  public async notify (text: String): Promise<void> {
    const payload = {
      'username': 'notice-ac-bot',
      'channel': this.CHANNEL,
      'text': text,
      'icon_emoji': this.EMOJI
    };

    axios.post(this.WEBHOOK_URL, payload)
  }
}
