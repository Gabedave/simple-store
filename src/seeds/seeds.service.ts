import { Injectable } from '@nestjs/common';
import { Command } from 'nestjs-command';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
import { Product } from 'src/products/schemas/product.schema';
import { ProductsService } from 'src/products/products.service';
import { Order } from 'src/orders/schemas/order.schema';
import { Types } from 'mongoose';
import { OrdersService } from 'src/orders/orders.service';

@Injectable()
export class SeedsService {
  constructor(
    private readonly userService: UsersService,
    private readonly productService: ProductsService,
    private readonly orderService: OrdersService,
  ) {}

  @Command({ command: 'seed:user', describe: 'create a user' })
  async seedUser() {
    const foundUsers = await this.userService.getAllUsers();
    if (foundUsers && foundUsers.length) {
      return;
    }
    await this.userService.createUser({
      _id: new Types.ObjectId('656bf64e1075052df7353fb6'),
      name: 'David Gabriel',
      email: 'test@test.com',
      hashedPassword: await bcrypt.hash('test_password', 10),
    } as any);
  }

  @Command({ command: 'seed:products', describe: 'create few products' })
  async seedProducts() {
    const foundProducts = await this.productService.findAll();
    if (foundProducts && foundProducts.length) {
      return;
    }
    const products: Product[] = [
      {
        _id: new Types.ObjectId('656c057af8a4931348a6bd6f'),
        name: 'Product 1',
        price: 100,
        description: 'Product 1 description',
        quantity_available: 20,
        category: ['bench', 'cabinet'],
      },
      {
        _id: new Types.ObjectId('656c057af8a4931348a6bd70'),
        name: 'Product 2',
        price: 130,
        description: 'Product 2 description',
        quantity_available: 30,
        category: ['other'],
      },
      {
        _id: new Types.ObjectId('656c057af8a4931348a6bd71'),
        name: 'Product 3',
        price: 150,
        description: 'Product 3 description',
        quantity_available: 50,
      },
    ] as unknown as Product[];

    await this.productService.createMany(products);
  }

  @Command({ command: 'seed:orders', describe: 'create few orders' })
  async seedOrders() {
    const foundOrders = await this.orderService.findAll();
    if (foundOrders && foundOrders.length) {
      return;
    }
    const orders: Order[] = [
      {
        user: new Types.ObjectId('656bf64e1075052df7353fb6'),
        products: [
          {
            productId: new Types.ObjectId('656c057af8a4931348a6bd6f'),
            quantity: 10,
          },
        ],
        totalAmount: 14000,
        status: 'pending',
      },
      {
        user: new Types.ObjectId('656bf64e1075052df7353fb6'),
        products: [
          {
            productId: new Types.ObjectId('656c057af8a4931348a6bd70'),
            quantity: 100,
          },
        ],
        totalAmount: 7000,
        status: 'pending',
      },
    ];

    await this.orderService.seedMany(orders);
  }

  @Command({
    command: 'seed:all',
    describe: 'create user, products, and orders',
  })
  async seedAll() {
    await this.seedUser();
    await this.seedProducts();
    await this.seedOrders();
  }
}
