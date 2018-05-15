import axios from 'axios';
import { injectable } from 'inversify';
import 'reflect-metadata';

import { IOnlinejudgeAPI, ACResult } from './interface/online-judge-api';

@injectable()
export class AtcoderAPI implements IOnlinejudgeAPI {
  private static ENDPOINT = 'http://kenkoooo.com/atcoder/atcoder-api/results';

  async fetchNewAC (users: String[], lastACEpoch: Number): Promise<ACResult[]> {
    const ret: ACResult[] = [];
    const params = {
      'user': users[0],
      'rivals': users.slice(1).join()
    };
    const response = await axios.get(AtcoderAPI.ENDPOINT, {
      params: params
    });
    let { data } = response;

    data = data.filter(x => x.epoch_second > lastACEpoch);
    data = data.filter(x => x.result === 'AC');
    data.forEach(x => {
      ret.push({
        userId: x.user_id,
        problemName: x.problem_id,
        problemUrl: `https://beta.atcoder.jp/contests/${x.contest_id}/tasks/${x.problem_id}`,
        language: x.language
      });
    });

    return Promise.resolve(ret);
  }
}
