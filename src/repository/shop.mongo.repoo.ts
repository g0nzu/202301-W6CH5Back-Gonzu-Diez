import { model, Schema } from 'mongoose';
import { SchemaTypes } from 'mongoose';
import { itemStructure } from '../models/itemType';

const shopSchema = new Schema<itemStructure>({
  name: {
    type: SchemaTypes.String,
    require: false,
  },
  price: {
    type: SchemaTypes.Number,
    min: 0,
  },
});

export const ItemModel = model('Item', shopSchema);
