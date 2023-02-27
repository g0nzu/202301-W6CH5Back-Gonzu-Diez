export interface Repo<T> {
  read(): Promise<T[]>;
  write(_data: Partial<T>): Promise<T>;
  edit(_data: Partial<T>, _newData: Partial<T>): Promise<T>;
  delete(_id: string): Promise<void>;
}
