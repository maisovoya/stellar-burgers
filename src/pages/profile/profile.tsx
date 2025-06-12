import { ProfileUI } from '@ui-pages';
import { FC, SyntheticEvent, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../services/hooks';
import {
  currentUserFetch,
  selectAccountState,
  accountUpdateInfo
} from '../../services/slices/userSlice';
import { Preloader } from '@ui';

export const Profile: FC = () => {
  const { currentUser, isLoading } = useAppSelector(selectAccountState);
  const dispatch = useAppDispatch();

  const [formValue, setFormValue] = useState({
    email: '',
    name: '',
    password: ''
  });

  useEffect(() => {
    if (!currentUser) {
      dispatch(currentUserFetch());
    }
  }, [dispatch, currentUser]);

  useEffect(() => {
    if (currentUser) {
      setFormValue((prevState) => ({
        ...prevState,
        name: currentUser.name || '',
        email: currentUser.email || '',
        password: ''
      }));
    }
  }, [currentUser]);

  const isFormChanged =
    formValue.name !== currentUser?.name ||
    formValue.email !== currentUser?.email ||
    !!formValue.password;

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    dispatch(accountUpdateInfo(formValue));
  };

  const handleCancel = (e: SyntheticEvent) => {
    e.preventDefault();
    setFormValue({
      name: currentUser?.name || '',
      email: currentUser?.email || '',
      password: ''
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormValue((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }));
  };

  if (isLoading && !currentUser) {
    return <Preloader />;
  }

  return (
    <ProfileUI
      formValue={formValue}
      isFormChanged={isFormChanged}
      handleCancel={handleCancel}
      handleSubmit={handleSubmit}
      handleInputChange={handleInputChange}
    />
  );
};
