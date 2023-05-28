import React, { useContext } from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

export function Card(props) {
  const currentUser = useContext(CurrentUserContext);
  console.log('props data de las cards   ', props);
  //console.log('owner y current user', props.data.owner[0], currentUserContext._id);
  const isOwn = props.data.owner[0] === currentUser._id;
  const cardDeleteButtonClassName = `${
    isOwn ? 'element__erase' : 'element__erase_disabled'
  }`;
  const card = props.data
  const isLiked = card.likes.some(i => i._id === currentUser._id);
  
  console.log('comparacion de usuarios de la card', card.likes.some(i => i._id === currentUser._id));
  console.log('usuarios de la card', card.likes);
  console.log('usuarios actual segun la card', currentUser._id);
  console.log('liked de la card????', isLiked);

  const cardLikeButtonClassName = `element__like ${
    isLiked ? 'element__liked' : ''
  }`;

  return (
    <div className="element">
      <img
        className="element__image"
        onClick={props.onCardClick}
        src={props.data.link}
        alt={props.data.name}
      />
      <button
        id="erase-btn"
        className={cardDeleteButtonClassName}
        onClick={() => {
          props.onEraseClick(props.data);
        }}
      ></button>
      <div className="element__group">
        <h3 className="element__location">{props.data.name}</h3>
        <div className="element__like-area">
          <button
            className={cardLikeButtonClassName}
            onClick={() => {
              props.onCardLike(props.data);
            }}
          ></button>
          <span className="element__counter">{props.data.likes.length}</span>
        </div>
      </div>
    </div>
  );
}
