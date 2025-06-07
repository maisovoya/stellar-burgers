import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAppSelector } from '../../services/hooks';

import { Preloader } from '../ui/preloader';
import { selectAuthLoading, selectIsLoggedIn } from '../../services/slices/authSlice';
import { selectAccountState } from '../../services/slices/userSlice';

type ProtectRouteProps = {
  onlyUnAuth?: boolean;
};

export const ProtectRoute = ({ onlyUnAuth }: ProtectRouteProps) => {
  const location = useLocation();

  
  const isLoggedIn = useAppSelector(selectIsLoggedIn);
  const { isLoading: userLoading } = useAppSelector(selectAccountState);
  const isAuthLoading = useAppSelector(selectAuthLoading);

  const hasCheckedAuth = !isAuthLoading && !userLoading;

  if (onlyUnAuth && isLoggedIn) {
    const from = location.state?.from || { pathname: '/' };
    return <Navigate replace to={from} />;
  }

  if (hasCheckedAuth) {
    return <Preloader />;
  }

  return <Outlet />;
};