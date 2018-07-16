import { IOnlinejudgeAPI, ACResult } from './interface/online-judge-api';

export class AtcoderAPI implements IOnlinejudgeAPI {
  private static ENDPOINT = 'http://kenkoooo.com/atcoder/atcoder-api/results';

  fetchNewAC (users: String[], lastACEpoch: Number): ACResult[] {
    const ret: ACResult[] = [];

    const qparams: String[] = [];
    qparams.push(`user=${users[0]}`);
    if (users.length > 1) {
      qparams.push(`rivals=${users.slice(1).join()}`);
    }
    const url = AtcoderAPI.ENDPOINT + '?' + qparams.join('&');
    const response = UrlFetchApp.fetch(url).getContentText();
    let data = JSON.parse(response);

    data = data.filter(x => x.epoch_second > lastACEpoch);
    data = data.filter(x => x.result === 'AC');
    data.forEach(x => {
      ret.push({
        userId: x.user_id,
        problemName: x.problem_id,
        problemUrl: `https://beta.atcoder.jp/contests/${x.contest_id}/tasks/${x.problem_id}`,
        language: x.language,
        epoch: x.epoch_second
      });
    });

    return ret;
  }
}
