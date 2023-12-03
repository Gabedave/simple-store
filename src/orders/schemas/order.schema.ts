import { Prop, Schema, SchemaFactory, raw } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { Product } from 'src/products/schemas/product.schema';
import { User } from 'src/users/schemas/user.schema';
import { OrderStatus } from '../order.interface';

export type OrderDocument = HydratedDocument<Order>;

@Schema({ timestamps: true, toObject: { transform: true } })
export class Order {
  @Prop({ required: true, type: Types.ObjectId, ref: 'User' })
  user: Types.ObjectId;

  @Prop({
    required: true,
    type: [
      {
        productId: { type: Types.ObjectId, ref: 'Product' },
        quantity: { type: Number },
      },
    ],
  })
  products: { productId: Types.ObjectId; quantity: number }[];

  @Prop({ required: true })
  totalAmount: number;

  @Prop({ default: 'pending' })
  status: OrderStatus;

  @Prop()
  cancelledAt?: Date;
}

export const OrderSchema = SchemaFactory.createForClass(Order);
