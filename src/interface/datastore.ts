
export interface IDatastore {
  loadLastACEpoch (): Number;
  saveLastACEpoch (lastACEpoch: Number);
  loadUsers (): String[];
}
