<<<<<<< HEAD
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
    isLoading,
    fetchError,
    currentOrders,
    totalCompleted,
    completedToday
  } = useAppSelector(selectCurrentOrders);

  const readyOrders = getOrders(currentOrders, 'done');
  const pendingOrders = getOrders(currentOrders, 'pending');

  const feed = {
    orders: currentOrders,
    total: totalCompleted,
    totalToday: completedToday
  };

  return (
    <FeedInfoUI
      readyOrders={readyOrders}
      pendingOrders={pendingOrders}
      feed={feed}
    />
  );
};
=======
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
    isLoading,
    fetchError,
    currentOrders,
    totalCompleted,
    completedToday
  } = useAppSelector(selectCurrentOrders);

  const readyOrders = getOrders(currentOrders, 'done');
  const pendingOrders = getOrders(currentOrders, 'pending');

  const feed = {
    orders: currentOrders,
    total: totalCompleted,
    totalToday: completedToday
  };

  return (
    <FeedInfoUI
      readyOrders={readyOrders}
      pendingOrders={pendingOrders}
      feed={feed}
    />
  );
};
>>>>>>> review-an
