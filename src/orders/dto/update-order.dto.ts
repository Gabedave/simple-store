import { PartialType } from '@nestjs/mapped-types';
import { CreateOrderDto } from './create-order.dto';
import { IsEnum } from 'class-validator';
import { OrderStatus } from '../order.interface';

export class UpdateOrderDto {
  @IsEnum(['pending', 'processing', 'shipped', 'delivered', 'cancelled'])
  status: OrderStatus;
}
