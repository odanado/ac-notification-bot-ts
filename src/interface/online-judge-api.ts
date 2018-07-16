export type ACResult = {
  userId: String,
  problemName: String,
  problemUrl: String,
  language: String,
  epoch: Number
};

export interface IOnlinejudgeAPI {
  fetchNewAC (users: String[], lastACEpoch: Number): ACResult[];
}
