import { IsArray, IsByteLength, IsNumber } from 'class-validator';

export class CreateOrderDto {
  @IsByteLength(12, 12)
  user: string;

  @IsArray()
  products: { productId: string; quantity: number }[];
}
