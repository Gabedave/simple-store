import { Test, TestingModule } from '@nestjs/testing';
import { BadRequestException } from '@nestjs/common';
import { getModelToken } from '@nestjs/mongoose';
import { OrdersService } from './orders.service';
import { ProductsService } from '../products/products.service';
import { Order } from './schemas/order.schema';
import { OrderStatus } from './order.interface';
import { Model, Types } from 'mongoose';
import { CreateOrderDto } from './dto/create-order.dto';

describe('OrdersService', () => {
  let ordersService: OrdersService;
  let productsService: ProductsService;
  let orderModel: Model<Order>;

  beforeEach(async () => {
    class ProductServiceMock {
      create() {
        return jest.fn();
      }
      createMany() {
        return jest.fn();
      }
      findAll() {
        return jest.fn();
      }
      findProductById() {
        return jest.fn();
      }
      updateProduct() {
        return jest.fn();
      }
      deleteProduct() {
        return jest.fn();
      }
    }
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        OrdersService,
        {
          provide: ProductsService,
          useClass: ProductServiceMock,
        },
        {
          provide: getModelToken(Order.name),
          useValue: Model,
        },
      ],
    }).compile();

    ordersService = module.get<OrdersService>(OrdersService);
    productsService = module.get<ProductsService>(ProductsService);
    orderModel = module.get<Model<Order>>(getModelToken(Order.name));
  });

  describe('placeOrder', () => {
    it('should place an order successfully', async () => {
      const product1Id = new Types.ObjectId();
      const product2Id = new Types.ObjectId();
      const createOrderDto: CreateOrderDto = {
        user: 'user',
        products: [
          { productId: product1Id.toString(), quantity: 2 },
          { productId: product2Id.toString(), quantity: 3 },
        ],
      };

      const findAllSpy = jest
        .spyOn(productsService, 'findAll')
        .mockResolvedValue([
          {
            _id: product1Id,
            name: 'Product 1',
            quantity_available: 5,
            price: 10,
          },
          {
            _id: product2Id,
            name: 'Product 2',
            quantity_available: 4,
            price: 15,
          },
        ]);

      const orderId = new Types.ObjectId();
      const orderModelCreateSpy = jest
        .spyOn(orderModel, 'create')
        .mockResolvedValue({
          _id: orderId,
          ...createOrderDto,
        } as any);

      const result = await ordersService.placeOrder(createOrderDto);

      expect(findAllSpy).toHaveBeenCalledWith({
        _id: { $in: expect.arrayContaining([product1Id, product2Id]) },
      });
      expect(orderModelCreateSpy).toHaveBeenCalledWith({
        ...createOrderDto,
        totalAmount: 2 * 10 + 3 * 15,
      });
      expect(result).toEqual({ _id: orderId, ...createOrderDto });
    });

    it('should throw BadRequestException if any product quantity exceeds available quantity', async () => {
      const product1Id = new Types.ObjectId();
      const product2Id = new Types.ObjectId();
      const createOrderDto = {
        user: 'user',
        products: [
          { productId: product1Id.toString(), quantity: 2 },
          { productId: product2Id.toString(), quantity: 5 },
        ],
      };

      const findAllSpy = jest
        .spyOn(productsService, 'findAll')
        .mockResolvedValue([
          {
            _id: product1Id,
            name: 'Product 1',
            quantity_available: 5,
            price: 10,
          },
          {
            _id: product2Id,
            name: 'Product 2',
            quantity_available: 4,
            price: 15,
          },
        ]);

      await expect(ordersService.placeOrder(createOrderDto)).rejects.toThrow(
        BadRequestException,
      );
      await expect(ordersService.placeOrder(createOrderDto)).rejects.toThrow(
        `Failed to place order. The following products exceeded the available quantities [Product 2]`,
      );

      expect(findAllSpy).toHaveBeenCalledWith({
        _id: { $in: [expect.any(Object), expect.any(Object)] },
      });
    });
  });

  describe('updateOrderStatus', () => {
    it('should update the status of an order', async () => {
      const orderId = 'order1';
      const status: OrderStatus = 'cancelled';
      const orderModelFindByIdAndUpdateSpy = jest
        .spyOn(orderModel, 'findByIdAndUpdate')
        .mockReturnThis();

      await ordersService.updateOrderStatus(orderId, status);

      expect(orderModelFindByIdAndUpdateSpy).toHaveBeenCalledWith(orderId, {
        status,
        cancelledAt: expect.any(Date),
      });
    });
  });
});
