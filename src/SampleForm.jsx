import React from 'react';
import { useForm } from 'react-hook-form';
import { DevTool } from '@hookform/devtools';

const SampleForm = (props) => {
  const { register, control, handleSubmit, reset, formState } = useForm({
    defaultValues: {
      fullName: '',
      age: null,
      newsletter: false,
      language: 'en',
      rating: 'good',
      comments: '',
    },
    mode: 'onSubmit',
  });

  const {
    isSubmitSuccessful,
    isSubmitting,
    isSubmitted,
    errors,
    dirtyFields,
    touchedFields,
  } = formState;

  const submit = (data) => {
    console.log('form submitted', data);
  };

  const submissionError = (errors) => {
    console.log('submission errors', errors);
  };

  React.useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
    }
  }, [isSubmitSuccessful]);

  return (
    <>
      <h4>Sample Registration Form</h4>
      <form noValidate onSubmit={handleSubmit(submit, submissionError)}>
        <div className='from-group mb-3'>
          <label htmlFor='fullName' className='form-label'>
            Full Name
          </label>
          <input
            type='text'
            className='form-control'
            id='fullName'
            {...register('fullName', {
              required: 'Full name of the user is required',
              validate: {
                lettersOnly: (fv) => {
                  const regex = /^[A-Za-z ]*$/;
                  return regex.test(fv) || 'Full name should only be letters';
                },
              },
            })}
          />
          <p className='text-danger form-text'>{errors.fullName?.message}</p>
        </div>

        <div className='from-group mb-3'>
          <label htmlFor='age' className='form-label'>
            Age
          </label>
          <input
            type='number'
            className='form-control'
            id='age'
            step='1'
            {...register('age', {
              required: 'Age of the user is required',
              validate: {
                numbersOnly: (fv) => {
                  const regex = /^[1-9][0-9]?$|^100$/;
                  return regex.test(fv) || 'Age should be numbers (1-100)';
                },
              },
            })}
          />
          <p className='text-danger form-text'>{errors.age?.message}</p>
        </div>

        <div className='form-check mb-3'>
          <input
            className='form-check-input'
            type='checkbox'
            value=''
            id='newsletter'
            {...register('newsletter')}
          />
          <label className='form-check-label' htmlFor='newsletter'>
            {' '}
            Newsletter{' '}
          </label>
        </div>

        <div className='from-group mb-3'>
          <label htmlFor='language' className='form-label'>
            Language
          </label>
          <select
            className='form-select'
            id='language'
            {...register('language')}
          >
            <option value='en'>English</option>
            <option value='fr'>French</option>
            <option value='de'>German</option>
          </select>
        </div>

        <div className='from-group mb-3'>
          <label className='form-label'>Rating</label>
          <div className='form-check'>
            <input
              className='form-check-input'
              type='radio'
              name='rating'
              id='good'
              value='good'
              {...register('rating')}
            />
            <label className='form-check-label' htmlFor='good'>
              {' '}
              Good{' '}
            </label>
          </div>
          <div className='form-check'>
            <input
              className='form-check-input'
              type='radio'
              name='rating'
              id='okay'
              value='okay'
              {...register('rating')}
            />
            <label className='form-check-label' htmlFor='okay'>
              {' '}
              Okay{' '}
            </label>
          </div>
          <div className='form-check'>
            <input
              className='form-check-input'
              type='radio'
              name='rating'
              id='should-improve'
              value='should-improve'
              {...register('rating')}
            />
            <label className='form-check-label' htmlFor='should-improve'>
              Should improve
            </label>
          </div>
        </div>

        <div className='form-group mb-3'>
          <label htmlFor='comments' className='form-label'>
            Comments
          </label>
          <textarea
            className='form-control'
            id='comments'
            rows='3'
            {...register('comments', {
              maxLength: 50,
              minLength: 5,
            })}
          ></textarea>
          <p className='text-danger form-text'>{errors.comments?.message}</p>
        </div>

        <button className='btn btn-primary btn-sm'>Submit</button>
      </form>
      <DevTool control={control} />
    </>
  );
};

export default SampleForm;
