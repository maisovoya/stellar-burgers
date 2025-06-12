<<<<<<< HEAD
import { FC, useMemo } from 'react';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { useAppDispatch, useAppSelector } from '../../services/hooks';
import { useNavigate } from 'react-router-dom';

import {
  clearOrderDetails,
  selectBurgerBuilder,
  toggleOrderRequest,
  submitBurgerOrder
} from '../../services/slices/burgerCreationSlice';

import { selectAccountState } from '../../services/slices/userSlice';

export const BurgerConstructor: FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { creationData, orderDetails, ordering, loading, error } =
    useAppSelector(selectBurgerBuilder);

  const { currentUser } = useAppSelector(selectAccountState);
  const isLoggedIn = Boolean(currentUser);

  const fillingIds = creationData.filling.map((item) => item._id);
  let ingredientIds: string[] = [];

  if (creationData.selectedBun) {
    const bunId = creationData.selectedBun._id;
    ingredientIds = [bunId, ...fillingIds, bunId];
  }

  const onOrderClick = () => {
    if (!isLoggedIn) {
      navigate('/login');
      return;
    }
    if (creationData.selectedBun) {
      dispatch(toggleOrderRequest(true));
      dispatch(submitBurgerOrder(ingredientIds));
    }
  };

  const closeOrderModal = () => {
    dispatch(toggleOrderRequest(false));
    dispatch(clearOrderDetails());
  };

  const totalPrice = useMemo(() => {
    const bunPrice = creationData.selectedBun?.price ?? 0;
    const fillingsPrice = creationData.filling.reduce(
      (sum: number, item: TConstructorIngredient) => sum + item.price,
      0
    );
    return bunPrice * 2 + fillingsPrice;
  }, [creationData]);

  return (
    <BurgerConstructorUI
      price={totalPrice}
      orderRequest={ordering}
      constructorItems={creationData}
      orderModalData={orderDetails}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};
=======
import { FC, useMemo } from 'react';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { useAppDispatch, useAppSelector } from '../../services/hooks';
import { useNavigate } from 'react-router-dom';

import {
  clearOrderDetails,
  selectBurgerBuilder,
  toggleOrderRequest,
  submitBurgerOrder
} from '../../services/slices/burgerCreationSlice';

import { selectAccountState } from '../../services/slices/userSlice';

export const BurgerConstructor: FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { creationData, orderDetails, ordering, loading, error } =
    useAppSelector(selectBurgerBuilder);

  const { currentUser } = useAppSelector(selectAccountState);
  const isLoggedIn = Boolean(currentUser);

  const fillingIds = creationData.filling.map((item) => item._id);
  let ingredientIds: string[] = [];

  if (creationData.selectedBun) {
    const bunId = creationData.selectedBun._id;
    ingredientIds = [bunId, ...fillingIds, bunId];
  }

  const onOrderClick = () => {
    if (!isLoggedIn) {
      navigate('/login');
      return;
    }
    if (creationData.selectedBun) {
      dispatch(toggleOrderRequest(true));
      dispatch(submitBurgerOrder(ingredientIds));
    }
  };

  const closeOrderModal = () => {
    dispatch(toggleOrderRequest(false));
    dispatch(clearOrderDetails());
  };

  const totalPrice = useMemo(() => {
    const bunPrice = creationData.selectedBun?.price ?? 0;
    const fillingsPrice = creationData.filling.reduce(
      (sum: number, item: TConstructorIngredient) => sum + item.price,
      0
    );
    return bunPrice * 2 + fillingsPrice;
  }, [creationData]);

  return (
    <BurgerConstructorUI
      price={totalPrice}
      orderRequest={ordering}
      constructorItems={creationData}
      orderModalData={orderDetails}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};
>>>>>>> review-an
