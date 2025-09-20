import React from 'react';
import { useForm, type SubmitHandler } from "react-hook-form";
import type { LoginFormInputs } from '../../../types/login';

import LoginForm from '../../../components/login-form'
import { useLogin } from '../../../hooks/useLogin';



const LoginFormContainer: React.FC = () => {

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>();

  const {mutate} = useLogin();

  
  const onSubmit: SubmitHandler<LoginFormInputs> = (data) => mutate(data);

  return (
    <LoginForm register={register} handleSubmit={handleSubmit} errors={errors} onSubmit={onSubmit}  />
  )
}

export default LoginFormContainer