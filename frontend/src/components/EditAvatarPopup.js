import React from 'react';
import { PopupWithForm } from './PopupWithForm';

export function EditAvatarPopup(props) {
  const avatarRef = React.useRef();

  function handleSubmit(e) {
    e.preventDefault();
    props.onUpdateAvatar({
      avatar: avatarRef.current.value,
    });
  }

  return (
    <PopupWithForm
      name='avatar'
      title='Cambiar foto de perfil'
      buttonText='Guardar'
      isPopupOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
    >
      <label className='input__field'>
        <input
          required
          id='avatar-url-input'
          name='link'
          ref={avatarRef}
          type='url'
          placeholder='URL de la imagen'
          className='input__form input__description input__description_gallery'
        />
        <span className='input__form-error avatar-url-input-error'></span>
      </label>
    </PopupWithForm>
  );
}
