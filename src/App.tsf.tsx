import React from 'react';
import { useForm } from '@tanstack/react-form';
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

function FormInput({ field, label, type = 'text' }) {
  console.log({ name: field.name });
  return (
    <div>
      <label htmlFor={field.name}>{label}</label>
      <input
        id={field.name}
        type={type}
        value={field.state.value || ''}
        onChange={(e) => field.handleChange(e.target.value)}
        onBlur={field.handleBlur}
      />
      {field.state.meta.errors[0] && (
        <p>{field.state.meta.errors[0].message}</p>
      )}
    </div>
  );
}

export default function App() {
  const form = useForm({
    defaultValues: { firstName: '', lastName: '' },
    validators: {
      onChange: schema,
    },
    onSubmit: async (values) => {
      console.log(values);
    },
  });

  console.log('main render');

  return (
    <div className='p-4'>
      <h2>Tanstack</h2>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          form.handleSubmit();
        }}
      >
        <form.Field name='firstName'>
          {(field) => <FormInput field={field} label='First Name' />}
        </form.Field>

        <form.Field name='lastName'>
          {(field) => <FormInput field={field} label='Last Name' />}
        </form.Field>

        <form.Subscribe
          selector={(state) => [state.canSubmit, state.isSubmitting]}
        >
          {([canSubmit, isSubmitting]) => (
            <button
              type='submit'
              disabled={!canSubmit}
              className='bg-blue-500 text-white p-2 rounded disabled:opacity-50'
            >
              {isSubmitting ? 'Submitting...' : 'Submit'}
            </button>
          )}
        </form.Subscribe>
      </form>
    </div>
  );
}
