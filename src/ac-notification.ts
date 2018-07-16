import { IOnlinejudgeAPI } from './interface/online-judge-api';
// import { INotification } from './interface/notification';
// import { IDatastore } from './interface/datastore';

export class ACNotification {
  constructor (public readonly onlinejudgeAPI: IOnlinejudgeAPI) {
  }
}
