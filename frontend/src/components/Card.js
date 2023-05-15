import React, { useContext } from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

export function Card(props) {
  const currentUserContext = useContext(CurrentUserContext);

  const isOwn = props.data.owner._id === currentUserContext._id;
  const cardDeleteButtonClassName = `${
    isOwn ? 'element__erase' : 'element__erase_disabled'
  }`;

  const isLiked = props.data.likes.some(
    (i) => i._id === currentUserContext._id
  );
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
