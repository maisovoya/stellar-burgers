import { FC, useEffect } from 'react';
import { Preloader } from '../ui/preloader';
import { IngredientDetailsUI } from '../ui/ingredient-details';
import { useParams } from 'react-router-dom';
import { useAppSelector } from '../../services/hooks';

import {
  selectInventoryState,
  fetchInventory
} from '../../services/slices/ingredientCatalogSlice';
import { useAppDispatch } from '../../services/hooks';

export const IngredientDetails: FC = () => {
  const dispatch = useAppDispatch();
  const { id } = useParams<{ id: string }>();

  const { inventoryItems, isLoading, fetchError } =
    useAppSelector(selectInventoryState);

  useEffect(() => {
    if (inventoryItems.length === 0 && !isLoading) {
      dispatch(fetchInventory());
    }
  }, [dispatch, inventoryItems.length, isLoading]);

  const ingredientData = inventoryItems.find(
    (item: { _id: string | undefined }) => item._id === id
  );

  if (isLoading) {
    return <Preloader />;
  }

  if (fetchError) {
    return <div>Ошибка загрузки: {fetchError}</div>;
  }

  if (!ingredientData) {
    return <div>Ингредиент не найден</div>;
  }

  return <IngredientDetailsUI ingredientData={ingredientData} />;
};
