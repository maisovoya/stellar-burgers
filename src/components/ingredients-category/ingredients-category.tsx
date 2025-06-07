import { forwardRef, useMemo } from 'react';
import { TIngredientsCategoryProps } from './type';
import { IngredientsCategoryUI } from '../ui/ingredients-category';

import { useAppSelector } from '../../services/hooks';
import { selectBurgerBuilder } from '../../services/slices/burgerCreationSlice';

export const IngredientsCategory = forwardRef<
  HTMLUListElement,
  TIngredientsCategoryProps
>(({ title, titleRef, ingredients }, ref) => {
  const { creationData } = useAppSelector(selectBurgerBuilder);

  const ingredientsCounters = useMemo(() => {
    const counters: { [key: string]: number } = {};

    creationData.filling.forEach((ingredient) => {
      counters[ingredient._id] = (counters[ingredient._id] || 0) + 1;
    });

    if (creationData.selectedBun) {
      counters[creationData.selectedBun._id] = 2;
    }

    // Чтобы count в BurgerIngredient всегда был числом, даже если нет ингредиента
    ingredients.forEach((ingredient) => {
      if (!counters[ingredient._id]) counters[ingredient._id] = 0;
    });

    return counters;
  }, [creationData, ingredients]);

  return (
    <IngredientsCategoryUI
      title={title}
      titleRef={titleRef}
      ingredients={ingredients}
      ingredientsCounters={ingredientsCounters}
      ref={ref}
    />
  );
});
