import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { TOrder } from '@utils-types';

import { FC, useEffect, useCallback } from 'react';
import { useAppDispatch, useAppSelector } from '../../services/hooks';

import {
  selectCurrentOrders,
  fetchCurrentOrders
} from '../../services/slices/currentOrdersSlice';

export const Feed: FC = () => {
  const dispatch = useAppDispatch();
  const {
    currentOrders: orders,
    isLoading,
    fetchError
  } = useAppSelector(selectCurrentOrders);

  useEffect(() => {
    dispatch(fetchCurrentOrders());
  }, [dispatch]);

  const handleGetFeeds = useCallback(() => {
    if (!isLoading) {
      dispatch(fetchCurrentOrders());
    }
  }, [dispatch, isLoading]);

  if (isLoading) {
    return <Preloader />;
  }

  if (fetchError) {
    return <div>Error: {fetchError}</div>;
  }

  return <FeedUI orders={orders} handleGetFeeds={handleGetFeeds} />;
};
