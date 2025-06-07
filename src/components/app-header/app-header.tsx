import { FC } from 'react';
import { AppHeaderUI } from '@ui';
import { useAppSelector } from '../../services/hooks';

export const AppHeader: FC = () => {
  // Получаем пользователя из userSlice
  const currentUser = useAppSelector((state) => state.user.currentUser);

  return <AppHeaderUI userName={currentUser?.name || ''} />;
};
