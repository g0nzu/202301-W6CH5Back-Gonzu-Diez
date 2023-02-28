import mongoose from 'mongoose';
import { config } from '../config';

const { user, password, cluster } = config;

export const dbConnect = () => {
  const uri = `mongodb+srv://${user}:${password}@${cluster}/?retryWrites=true&w=majority`;
  debugger;
  console.log(uri);
  return mongoose.connect(uri);
};
