import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Order } from './schemas/order.schema';
import { Model, Types } from 'mongoose';
import { OrderStatus } from './order.interface';
import { ProductsService } from '../products/products.service';

@Injectable()
export class OrdersService {
  constructor(
    @InjectModel(Order.name) private orderModel: Model<Order>,
    private readonly productService: ProductsService,
  ) {}

  async placeOrder(createOrderDto: CreateOrderDto) {
    const productObjectIds = createOrderDto.products.map(
      (_p) => new Types.ObjectId(_p.productId),
    );
    const allProducts = await this.productService.findAll({
      _id: { $in: productObjectIds } as any,
    });

    const excessOrderedProductNames = [];
    let totalAmount = 0;
    for (const product of createOrderDto.products) {
      const dbProduct = allProducts.find(
        (_p) => _p._id.toString() === product.productId,
      );
      if (dbProduct && product.quantity > dbProduct?.quantity_available) {
        excessOrderedProductNames.push(dbProduct.name);
      }
      totalAmount += product.quantity * dbProduct.price;
    }

    if (excessOrderedProductNames.length) {
      throw new BadRequestException(
        `Failed to place order. The following products exceeded the available quantities [${excessOrderedProductNames.join(
          ', ',
        )}]`,
      );
    }

    return this.orderModel.create({ ...createOrderDto, totalAmount });
  }

  async findAll() {
    return this.orderModel.find().lean();
  }

  async findAllOrdersForUser(userId: string) {
    return this.orderModel.find({ user: userId }).lean();
  }

  async findOrderById(id: string) {
    return this.orderModel.findById(id).lean();
  }

  async updateOrderStatus(id: string, status: OrderStatus) {
    return this.orderModel.findByIdAndUpdate(id, {
      status,
      cancelledAt: status === 'cancelled' ? new Date(Date.now()) : undefined,
    });
  }

  // access to repository method directly in order to seed the database
  async seedMany(orders: any) {
    return this.orderModel.insertMany(orders);
  }
}
