export enum OrderStatusEnum {
  Pending = 'pending',
  Processing = 'processing',
  Shipped = 'shipped',
  Delivered = 'delivered',
  Cancelled = 'cancelled',
}

export type OrderStatus = `${OrderStatusEnum}`;
