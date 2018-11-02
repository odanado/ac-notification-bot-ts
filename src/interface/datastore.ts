export interface IDatastore {
  connect(): Promise<void>;
  loadLastACEpoch (): Promise<Number>;
  saveLastACEpoch (lastACEpoch: Number): Promise<void>;
  loadUsers (): Promise<String[]>;
}
