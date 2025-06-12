import { OrderStatusUI } from '@ui';
import { OrderStatusProps } from './type';
import { FC } from 'react';

const STATUS_TEXT: Record<string, string> = {
  created: 'Создан',
  done: 'Выполнен',
  pending: 'Готовится'
};

const STATUS_COLOR: Record<string, string> = {
  created: '#F2F2F3',
  done: '#00CCCC',
  pending: '#E52B1A'
};

export const OrderStatus: FC<OrderStatusProps> = ({ status }) => {
  const textStyle = STATUS_COLOR[status] || '#F2F2F3';
  const text = STATUS_TEXT[status] || 'Неизвестен';

  return <OrderStatusUI textStyle={textStyle} text={text} />;
};
