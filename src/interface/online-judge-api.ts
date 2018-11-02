export interface ACResult {
  userId: String;
  problemName: String;
  problemUrl: String;
  language: String;
  epoch: Number;
};

export interface IOnlinejudgeAPI {
  fetchNewAC (users: String[], lastACEpoch: Number): Promise<ACResult[]>;
}
