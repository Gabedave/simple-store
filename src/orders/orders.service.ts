import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Order } from './schemas/order.schema';
import { Model } from 'mongoose';
import { OrderStatus } from './order.interface';

@Injectable()
export class OrdersService {
  constructor(@InjectModel(Order.name) private orderModel: Model<Order>) {}

  async create(createOrderDto: CreateOrderDto) {
    return this.orderModel.create(createOrderDto);
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
}
