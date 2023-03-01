import { model, Schema } from 'mongoose';
import { itemStructure } from '../entities/itemType.js';

const shopSchema = new Schema<itemStructure>({
  name: {
    type: String,
    require: false,
  },
  price: {
    type: Number,
    min: 0,
  },
});

shopSchema.set('toJSON', {
  transform(_document, returnedObject) {
    delete returnedObject.__v;
    delete returnedObject.id;
  },
});

export const ItemModel = model('Item', shopSchema, 'Items');
