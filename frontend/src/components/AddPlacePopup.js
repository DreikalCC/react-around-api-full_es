import React from 'react';
import { PopupWithForm } from './PopupWithForm';

export function AddPlacePopup(props) {
  function handleSubmit(e) {
    e.preventDefault();
    props.onAddPlace({
      name: props.location,
      link: props.link,
    });
  }

  return (
    <PopupWithForm
      name='gallery'
      title='Nuevo lugar'
      buttonText='Crear'
      isPopupOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
    >
      <label className='input__field'>
        <input
          required
          id='card-name-input'
          name='location'
          onChange={props.onNameChange}
          type='text'
          placeholder='Título'
          className='input__form input__name input__name_gallery'
          minLength='2'
          maxLength='30'
        />
        <span className='input__form-error card-name-input-error'></span>
      </label>
      <label className='input__field'>
        <input
          required
          id='card-url-input'
          name='link'
          onChange={props.onLinkChange}
          type='url'
          placeholder='URL de la imagen'
          className='input__form input__description'
        />
        <span className='input__form-error card-url-input-error'></span>
      </label>
    </PopupWithForm>
  );
}
