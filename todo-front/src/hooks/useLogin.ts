import { postApiData } from '../apiServices/apiServices';
import { useMutation } from '@tanstack/react-query';
import type { LoginFormInputs } from '../types/login';
import { useAuth } from './useAuth';
import { useNavigate } from 'react-router';

export const useLogin = () => {
    const {handleLogin} = useAuth();

    const navigate = useNavigate();

    const {mutate} = useMutation({
        mutationFn: (loginData: LoginFormInputs) => postApiData('/login', loginData, {}),
        onError: (error) => {
            console.error('Login failed:', error); // will replace this log with toast later
            alert('Login failed. Please check your credentials and try again.');
        },
        onSuccess: (data) => {
            localStorage.setItem('access_token', data?.data?.accessToken);
            handleLogin(data?.data?.user?._id);
            navigate('/');
        }
    });

    return {mutate};
}
  