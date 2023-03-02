import { itemStructure } from './itemType.js';

export type User = {
  id: string;
  email: string;
  passwd: string;
  items: itemStructure[];
};
