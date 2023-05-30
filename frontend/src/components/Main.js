import React, { useContext } from 'react';
import { Card } from './Card';
import { Test } from './Test';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

export function Main(props) {
  const currentUserContext = useContext(CurrentUserContext);
  return (
    <>
      <section className="profile">
        <div className="profile__user">
          <img
            className="profile__pic"
            src={currentUserContext.avatar}
            alt="Foto de perfil"
          />
          <button
            id="avatar-btn"
            onClick={props.handleEditAvatarClick}
            className="profile__avatar-btn"
          ></button>
        </div>
        <div className="profile__info">
          <h1 className="profile__name">{currentUserContext.name}</h1>
          <button
            id="profile-btn"
            onClick={props.handleEditProfileClick}
            className="profile__info profile__edit-button"
          ></button>
          <p className="profile__description">{currentUserContext.about}</p>
        </div>
        <button
          id="add-card-btn"
          onClick={props.handleAddPlaceClick}
          className="profile__add-button"
        ></button>
      </section>

      <section className="elements">
        { !props.cards || !props.cards.length ? <Test/> :
          props.cards.map((card) => {
            return (
              <Card
                key={card._id}
                data={card}
                onCardClick={props.handleCardClick}
                onEraseClick={props.handleEraseCardClick}
                onCardLike={props.onCardLike}
              />
            );
          })
        }
      </section>
    </>
  );
}
