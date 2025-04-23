import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

// Define Zod schema
const schema = z.object({
  firstName: z
    .string()
    .min(3, '[Zod] You must have a length of at least 3')
    .startsWith('A', "[Zod] First name must start with 'A'"),
  lastName: z
    .string()
    .min(3, '[Zod] You must have a length of at least 3')
    .startsWith('A', "[Zod] First name must start with 'A'"),
});

function FormInput({ label, name, register, error, type = 'text' }) {
  console.log({ name });
  return (
    <div>
      <label htmlFor={name}>{label}</label>
      <input id={name} type={type} {...register(name)} />
      <p>{error?.message}</p>
    </div>
  );
}

export default function App() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    mode: 'onChange',
  });

  const onSubmit = (data) => console.log(data);

  console.log('main render');

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h2>react hook form</h2>
      <FormInput
        label='First Name'
        name='firstName'
        register={register('firstName', {})}
        error={errors.firstName}
      />

      <FormInput
        label='Last Name'
        name='lastName'
        register={register}
        error={errors.lastName}
      />

      <button type='submit'>Submit</button>
    </form>
  );
}
