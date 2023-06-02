import React from 'react';
import { PopupWithForm } from './PopupWithForm';

export function EditProfilePopup(props) {
  function handleSubmit(e) {
    e.preventDefault();
    props.onUpdateUser({
      name: props.name,
      about: props.description,
    });
  }

  return (
    <PopupWithForm
      name='profile'
      title='Editar perfil'
      buttonText='Guardar'
      isPopupOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
    >
      <label className='input__field'>
        <input
          id='profile-name-input'
          name='name'
          onChange={props.onNameChange}
          required
          type='text'
          placeholder='Jaques Cousteau'
          className='input__form input__name'
          minLength='2'
          maxLength='40'
        />
        <span className='input__form-error profile-name-input-error'></span>
      </label>
      <label className='input__field'>
        <input
          id='profile-desc-input'
          name='about'
          onChange={props.onDescriptionChange}
          required
          type='text'
          placeholder='Explorador'
          className='input__form input__description'
          minLength='2'
          maxLength='200'
        />
        <span className='input__form-error profile-desc-input-error'></span>
      </label>
    </PopupWithForm>
  );
}
