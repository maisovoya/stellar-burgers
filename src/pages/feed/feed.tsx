import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { TOrder } from '@utils-types';

import { FC, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../services/hooks';

import {
  selectCurrentOrders,
  fetchCurrentOrders
} from '../../services/slices/currentOrdersSlice';

export const Feed: FC = () => {
  const dispatch = useAppDispatch();
  const { currentOrders: orders, isLoading } =
    useAppSelector(selectCurrentOrders);

  useEffect(() => {
    dispatch(fetchCurrentOrders());
  }, [dispatch]);

  if (isLoading) {
    return <Preloader />;
  }
  if (!orders.length) {
    return <p>Нет заказов для отображения</p>;
  }

  return (
    <FeedUI
      orders={orders}
      handleGetFeeds={() => dispatch(fetchCurrentOrders())}
    />
  );
};
