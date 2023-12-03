import { Injectable } from '@nestjs/common';
import { Command } from 'nestjs-command';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
import { Product } from 'src/products/schemas/product.schema';
import { ProductsService } from 'src/products/products.service';

@Injectable()
export class SeedsService {
  constructor(
    private readonly userService: UsersService,
    private readonly productService: ProductsService,
  ) {}

  @Command({ command: 'seed:user', describe: 'create a user' })
  async seedUser() {
    await this.userService.createUser({
      name: 'David Gabriel',
      email: 'test@test.com',
      hashedPassword: await bcrypt.hash('test_password', 10),
    });
  }

  @Command({ command: 'seed:products', describe: 'create few products' })
  async seedProducts() {
    const products: Product[] = [
      {
        name: 'Product 1',
        price: 100,
        description: 'Product 1 description',
        quantity_available: 20,
        category: ['bench', 'cabinet'],
      },
      {
        name: 'Product 2',
        price: 130,
        description: 'Product 2 description',
        quantity_available: 30,
        category: ['other'],
      },
      {
        name: 'Product 3',
        price: 150,
        description: 'Product 3 description',
        quantity_available: 50,
      },
    ];

    await this.productService.createMany(products);
  }
}
