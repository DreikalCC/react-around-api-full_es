import React from 'react';
import { Link } from 'react-router-dom';

export function Credentials({
  title,
  buttonText,
  linkText,
  link,
  handlePasswordChange,
  HandleEmailChange,
  onSubmit,
}) {
  return (
    <>
      <form className='credentials__form' to='/main' onSubmit={onSubmit}>
        <h3 className='credentials__title'>{title}</h3>
        <fieldset className='input'>
          <input
            required
            name='email'
            type='email'
            placeholder='Email'
            className='input__form input__form_credentials'
            onChange={HandleEmailChange}
          />
          <input
            required
            name='password'
            type='password'
            placeholder='Password'
            className='input__form input__form_credentials'
            onChange={handlePasswordChange}
          />
          <button
            type='submit'
            className='edit__submit-btn edit__submit-btn_log'
          >
            {buttonText}
          </button>
        </fieldset>
      </form>
      <Link className='credentials__link' to={link}>
        {linkText}
      </Link>
    </>
  );
}
