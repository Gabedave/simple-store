import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { ProductCategoryType } from '../products.interface';

export type UserDocument = HydratedDocument<Product>;

@Schema({ timestamps: true, toObject: { transform: true } })
export class Product {
  @Prop({ required: true })
  name: string;

  @Prop()
  description?: string;

  @Prop({ required: true })
  price: number;

  @Prop()
  image?: string;

  @Prop({ required: true })
  quantity_available: number;

  @Prop()
  category?: ProductCategoryType[];

  @Prop()
  deletedAt?: Date;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
