import { ProfileOrdersUI } from '@ui-pages';
import { FC, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../services/hooks';
import {
  fetchUserOrders,
  selectOrdersState
} from '../../services/slices/ordersSlice';
import { fetchCurrentOrders } from '../../services/slices/currentOrdersSlice';
import { Preloader } from '@ui';

export const ProfileOrders: FC = () => {
  const { personalOrders, isLoading } = useAppSelector(selectOrdersState);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchUserOrders());
    dispatch(fetchCurrentOrders());
  }, []);

  if (isLoading) {
    return <Preloader />;
  }

  return <ProfileOrdersUI orders={personalOrders} />;
};
