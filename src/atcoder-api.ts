import { AtCoderAPI as Client } from '@odanado/atcoder-api'
import { IOnlinejudgeAPI, ACResult } from './interface';

const sleep = msec => new Promise(resolve => setTimeout(resolve, msec));

export class AtCoderAPI implements IOnlinejudgeAPI {
  private client: Client;
  constructor() {
    this.client = new Client()
  }

  async fetchNewAC (users: String[], lastACEpoch: Number): Promise<ACResult[]> {
    const ret: ACResult[] = [];

    for (const user of users) {
      console.log(`fetch user: ${user}`)
      const subs = await this.client.submissions(user as string);
      await sleep(1000)
      const latestACList = subs
        .filter(sub => sub.epoch_second > lastACEpoch)
        .filter(sub => sub.result === 'AC')
      const formatedLatestACList: ACResult[] = latestACList.map(ac => ({
        userId: ac.user_id,
        problemName: ac.problem_id,
        problemUrl: `https://beta.atcoder.jp/contests/${ac.contest_id}/tasks/${ac.problem_id}`,
        language: ac.language,
        epoch: ac.epoch_second
      }))
      formatedLatestACList.forEach(ac => ret.push(ac))
    }

    return ret;
  }
}
