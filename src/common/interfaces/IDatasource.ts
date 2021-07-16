export interface IDatasource {
  connect(): Promise<void>;
  disconnect(): Promise<void>;
}
