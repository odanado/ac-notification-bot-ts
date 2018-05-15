export type ACResult = {
  userId: String,
  problemName: String,
  problemUrl: String,
  language: String
};

export interface IOnlinejudgeAPI {
  fetchNewAC (users: String[], lastACEpoch: Number): Promise<ACResult[]>;
}
