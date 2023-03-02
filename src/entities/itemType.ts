import { User } from './user';

export type itemStructure = {
  id: number | string;
  name: string;
  price: number;
  owner: User;
};
