import type { ReactNode } from 'react';
import { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import api from '../api/axios';
import { useAppDispatch } from '../hooks/useAppDispatch';
import { logout, setUser } from '../features/auth/authSlice';

interface Props {
  children: ReactNode;
}

const fetchMe = async () => {
  const res = await api.get('/auth/me');
  return res.data;
};

export default function AuthInitializer({ children }: Props) {
  const dispatch = useAppDispatch();
  const token = localStorage.getItem('accessToken');

  const { data, isError, isSuccess } = useQuery({
    queryKey: ['auth-me'],
    queryFn: fetchMe,
    enabled: !!token,
    retry: false,
    staleTime: 5 * 60 * 1000,
  });

  useEffect(() => {
    if (isSuccess && data) {
      dispatch(setUser(data));
    }
  }, [isSuccess, data, dispatch]);

  useEffect(() => {
    if (isError && token) {
      dispatch(logout());
    }
  }, [isError, token, dispatch]);

  return children;
} 