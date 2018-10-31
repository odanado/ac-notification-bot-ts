import { IDatastore, INotification, IOnlinejudgeAPI } from './interface';

export class Bot {
  constructor(
    private store: IDatastore,
    private notification: INotification,
    private api: IOnlinejudgeAPI
  ) {

  }

  async connect(): Promise<void> {
    await this.store.connect();
  }

  async run(): Promise<void> {
    await this.connect();

    console.log('load data from store');
    const lastACEpoch: Number = await this.store.loadLastACEpoch();
    const users: String[] = await this.store.loadUsers();

    console.log(`users: ${users}`);
    console.log(`lastACEpoch: ${lastACEpoch}`);

    console.log('fetch new ac');
    const acResults = await this.api.fetchNewAC(users, lastACEpoch);

    const texts: String[] = [];
    acResults.forEach(result => {
      const url = `<${result.problemUrl}|${result.problemName}>`;
      texts.push(`${result.userId} が ${url} を ${result.language} でACしたよ！`);
    });

    if (texts) {
      this.notification.notify(texts.join('\n'));
      console.log(texts.join('\n'))
    }


    if (acResults.length > 0) {
      const nextLastACEpoch = Math.max(...acResults.map(x => x.epoch as number));

      await this.store.saveLastACEpoch(nextLastACEpoch);
    }
  }
}
