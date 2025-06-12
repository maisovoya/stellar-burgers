import { FC } from 'react';
import { AppHeaderUI } from '@ui';
import { useAppSelector } from '../../services/hooks';
import { selectAccountState } from '../../services/slices/userSlice';

export const AppHeader: FC = () => {
  const user = useAppSelector((state) => selectAccountState(state).currentUser);
  const displayName = user?.name ?? '';

  return <AppHeaderUI userName={displayName} />;
};
