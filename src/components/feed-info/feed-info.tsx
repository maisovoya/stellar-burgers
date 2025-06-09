import { FC, useEffect } from 'react';

import { TOrder } from '@utils-types';
import { FeedInfoUI } from '../ui/feed-info';
import { useAppSelector } from '../../services/hooks';
import {
  fetchCurrentOrders,
  selectCurrentOrders
} from '../../services/slices/currentOrdersSlice';
import { useAppDispatch } from '../../services/hooks';

const getOrders = (orders: TOrder[], status: string): number[] =>
  orders
    .filter((item) => item.status === status)
    .map((item) => item.number)
    .slice(0, 20);

export const FeedInfo: FC = () => {
  const dispatch = useAppDispatch();

  const {
    currentOrders,
    totalCompleted,
    completedToday,
    isLoading,
    fetchError
  } = useAppSelector(selectCurrentOrders);

  // useEffect(() => {
  //   dispatch(fetchCurrentOrders());
  // }, [dispatch]);

  const readyOrders = getOrders(currentOrders, 'done');

  const pendingOrders = getOrders(currentOrders, 'pending');

  const feed = {
    totalToday: completedToday,
    total: totalCompleted,
    orders: currentOrders
  };

  return (
    <FeedInfoUI
      readyOrders={readyOrders}
      pendingOrders={pendingOrders}
      feed={feed}
    />
  );
};
