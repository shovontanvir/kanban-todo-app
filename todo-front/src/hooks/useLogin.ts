import { postApiData } from '../apiServices/apiServices';
import { useMutation } from '@tanstack/react-query';
import type { LoginFormInputs } from '../types/login';

export const useLogin = () => {

    const {mutate} = useMutation({
        mutationFn: (loginData: LoginFormInputs) => postApiData('/login', loginData, {}),
        onError: (error) => {
        console.error('Login failed:', error); // will replace this log with toast later
        alert('Login failed. Please check your credentials and try again.');
        },
        onSuccess: (data) => {
        console.log('Login successful:', data); // will replace this log with toast later
        localStorage.setItem('access_token', data?.data?.accessToken);
        }
    });

    return {mutate};
}
  