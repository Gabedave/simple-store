import {
  IsArray,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { ProductCategoryType } from '../products.interface';

export class CreateProductDto {
  @IsNotEmpty()
  name: string;

  @IsString()
  description?: string;

  @IsNumber()
  price: number;

  @IsOptional()
  @IsString()
  image?: string;

  @IsNumber()
  quantity_available: number;

  @IsArray()
  @IsEnum(ProductCategoryType, { each: true })
  category?: Array<ProductCategoryType>;
}
