export interface INotification {
  notify (text: String): Promise<void>;
}
