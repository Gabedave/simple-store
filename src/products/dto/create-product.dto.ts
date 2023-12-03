import { IsEnum, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { ProductCategoryType } from '../products.interface';

export class CreateProductDto {
  @IsNotEmpty()
  name: string;

  @IsString()
  description?: string;

  @IsNumber()
  price: number;

  @IsString()
  image?: string;

  @IsNumber()
  quantity_available: number;

  @IsEnum([
    'table',
    'chair',
    'sofa',
    'bed',
    'bench',
    'toilet',
    'kitchen',
    'dining_table',
    'cabinet',
    'other',
  ])
  category?: ProductCategoryType[];
}
