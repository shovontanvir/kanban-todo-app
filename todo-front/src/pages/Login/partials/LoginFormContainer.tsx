import React from 'react'
import { useForm, type SubmitHandler } from "react-hook-form"

import LoginForm from '../../../components/login-form'

interface FormInputs {
  email: string
  password: string
}

const LoginFormContainer: React.FC = () => {

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInputs>();
  
  const onSubmit: SubmitHandler<FormInputs> = (data) => console.log(data)

  return (
    <LoginForm register={register} handleSubmit={handleSubmit} errors={errors} onSubmit={onSubmit}  />
  )
}

export default LoginFormContainer