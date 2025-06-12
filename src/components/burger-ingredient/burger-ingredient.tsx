import { FC, memo } from 'react';
import { useLocation } from 'react-router-dom';
import { TBurgerIngredientProps } from './type';
import { BurgerIngredientUI } from '@ui';
import { useAppDispatch } from '../../services/hooks';
import { addItem } from '../../services/slices/burgerCreationSlice';

export const BurgerIngredient: FC<TBurgerIngredientProps> = memo(
  ({ ingredient, count }) => {
    const location = useLocation();
    const dispatch = useAppDispatch();

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
