import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product, ProductObject } from './schemas/product.schema';
import { Model, Types } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Product.name) private productModel: Model<Product>,
  ) {}

  async create(createProductDto: CreateProductDto) {
    return this.productModel.create(createProductDto);
  }

  async createMany(createProductDto: CreateProductDto[]) {
    return this.productModel.insertMany(createProductDto);
  }

  async findAll(filter?: Partial<ProductObject>) {
    return this.productModel.find({ ...filter, deletedAt: null }).lean();
  }

  async findProductById(id: Types.ObjectId) {
    return this.productModel.findOne({ _id: id, deletedAt: null }).lean();
  }

  async updateProduct(id: Types.ObjectId, updateProductDto: UpdateProductDto) {
    return this.productModel.findByIdAndUpdate(id, updateProductDto, {
      returnDocument: 'after',
    });
  }

  async deleteProduct(id: Types.ObjectId) {
    return this.productModel.findByIdAndUpdate(
      id,
      { deletedAt: new Date(Date.now()).toISOString() },
      { returnDocument: 'after' },
    );
  }
}
