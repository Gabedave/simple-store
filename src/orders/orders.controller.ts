import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
} from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { AuthGuard } from '../auth/auth.guard';

@Controller('orders')
@UseGuards(AuthGuard)
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  async placeOrder(@Body() createOrderDto: CreateOrderDto) {
    return this.ordersService.placeOrder(createOrderDto);
  }

  @Get()
  async getAllOrders(@Request() req) {
    return this.ordersService.findAllOrdersForUser(req.sub);
  }

  @Get(':id')
  async getOrder(@Param('id') id: string) {
    return this.ordersService.findOrderById(id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateOrderDto: UpdateOrderDto,
  ) {
    return this.ordersService.updateOrderStatus(id, updateOrderDto.status);
  }
}
