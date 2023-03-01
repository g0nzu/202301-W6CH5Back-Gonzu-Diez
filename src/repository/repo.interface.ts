export interface Repo<T> {
  read(): Promise<T[]>;
  create(_data: Partial<T>): Promise<T>;
  search(query: { key: string; value: unknown }): Promise<T[]>;
  edit(_data: Partial<T>): Promise<T>;
  delete(_id: string): Promise<void>;
}
