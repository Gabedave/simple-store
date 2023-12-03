import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { Order } from 'src/orders/entities/order.entity';

export type UserDocument = HydratedDocument<User>;

@Schema({ timestamps: true, toObject: { transform: true } })
export class User {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  hashedPassword: string;

  @Prop({ type: [{ type: Types.ObjectId, ref: 'Order' }] })
  orders?: Order[];
}

export type UserObject = User & { _id: Types.ObjectId };

export const UserSchema = SchemaFactory.createForClass(User);
