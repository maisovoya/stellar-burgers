import { FC, memo } from 'react';
import { useLocation } from 'react-router-dom';
import { TBurgerIngredientProps } from './type';
import { BurgerIngredientUI } from '@ui';
import { addItem } from '../../services/slices/burgerCreationSlice';
import { useDispatch } from 'react-redux';

export const BurgerIngredient: FC<TBurgerIngredientProps> = memo(
  ({ ingredient, count }) => {
    const dispatch = useDispatch();
    const location = useLocation();

    const handleAdd = () => {
      dispatch(addItem(ingredient));
    };

    return (
      <BurgerIngredientUI
        count={count}
        ingredient={ingredient}
        locationState={{ background: location }}
        handleAdd={handleAdd}
      />
    );
  }
);
