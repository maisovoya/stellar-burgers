import { FC, SyntheticEvent, useState } from 'react';
import { LoginUI } from '@ui-pages';
import { useAppDispatch, useAppSelector } from '../../services/hooks';

import { Navigate } from 'react-router-dom';
import { loginAccount, selectAuthError, selectAuthLoading } from '../../services/slices/authSlice';
import { selectAccountState } from '../../services/slices/userSlice';


export const Login: FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useAppDispatch();

  const error = useAppSelector(selectAuthError);
  const isLoggingIn = useAppSelector(selectAuthLoading);
  const { currentUser } = useAppSelector(selectAccountState);

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    if (!email || !password) return;
    dispatch(loginAccount({ email, password }));
  };


  if (currentUser) {
    return <Navigate to="/" replace />;
  }

  return (
    <LoginUI
      errorText={error?.toString()}
      email={email}
      setEmail={setEmail}
      password={password}
      setPassword={setPassword}
      handleSubmit={handleSubmit}
    />
  );
};
