import { Module } from '@nestjs/common';
import { SeedsService } from './seeds.service';
import { UsersModule } from 'src/users/users.module';
import { ProductsModule } from 'src/products/products.module';
import { OrdersService } from 'src/orders/orders.service';
import { OrdersModule } from 'src/orders/orders.module';

@Module({
  imports: [UsersModule, ProductsModule, OrdersModule],
  providers: [SeedsService],
})
export class SeedsModule {}
