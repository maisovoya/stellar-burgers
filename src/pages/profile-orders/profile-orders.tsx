import { ProfileOrdersUI } from '@ui-pages';
import { FC, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../services/hooks';
import {
  selectAccountState
} from '../../services/slices/userSlice';
import {
  fetchUserOrders,
} from '../../services/slices/ordersSlice';
import { selectCurrentOrders } from '../../services/slices/currentOrdersSlice';
import { Preloader } from '@ui';


export const ProfileOrders: FC = () => {
  /** TODO: взять переменную из стора */
  const dispatch = useAppDispatch();
  const orders = useAppSelector(state => selectCurrentOrders(state).currentOrders);
  const isLoading = useAppSelector(state => selectCurrentOrders(state).isLoading);

  useEffect(() => {
    dispatch(fetchUserOrders());
  }, [dispatch]);

  if (isLoading) {
    return <Preloader />;
  }

  return <ProfileOrdersUI orders={orders} />;
};
