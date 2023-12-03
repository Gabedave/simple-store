import { Type } from 'class-transformer';
import {
  ArrayNotEmpty,
  IsByteLength,
  IsNotEmpty,
  IsNumber,
  IsPositive,
  ValidateNested,
} from 'class-validator';

class OrderProduct {
  @IsNotEmpty()
  productId: string;

  @IsNumber()
  @IsPositive({ message: 'Product quantity must be greater than zero' })
  quantity: number;
}

export class CreateOrderDto {
  @IsByteLength(12)
  user: string;

  @ArrayNotEmpty({ message: 'Products array must not be empty' })
  @ValidateNested({ each: true })
  @Type(() => OrderProduct)
  products: Array<OrderProduct>;
}
