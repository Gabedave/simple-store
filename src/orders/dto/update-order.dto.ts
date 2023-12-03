import { IsEnum, IsNotEmpty } from 'class-validator';
import { OrderStatusEnum } from '../order.interface';

export class UpdateOrderDto {
  @IsNotEmpty()
  @IsEnum(OrderStatusEnum)
  status: OrderStatusEnum;
}
