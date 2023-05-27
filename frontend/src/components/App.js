import React from 'react';
import { useCallback } from 'react';
import { Route, Routes, useNavigate, Navigate } from 'react-router-dom';
import { Header } from './Header';
import { Footer } from './Footer';
import { Main } from './Main';
import { ImagePopup } from './ImagePopup';
import api from '../utils/api';
import * as auth from '../utils/auth';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import { EditProfilePopup } from './EditProfilePopup';
import { EditAvatarPopup } from './EditAvatarPopup';
import { AddPlacePopup } from './AddPlacePopup';
import { DeleteCardPopup } from './DeleteCardPopup';
import { ProtectedRoute } from './ProtectedRoute';
import { Login } from './Login';
import { Register } from './Register';
import { InfoTooltip } from './InfoTooltip';
import { Test } from './Test';

export default function App() {
  const navigate = useNavigate();
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] =
    React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] =
    React.useState(false);
  const [isEraseCardPopupOpen, setEraseCardPopupOpen] = React.useState(false);
  const [isImagePopupOpen, setIsImagePopupOpen] = React.useState(false);
  const [isTooltipOpen, setIsTooltipOpen] = React.useState(false);
  const [isMenuOn, setIsMenuOn] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({
    name: '',
    link: '',
  });
  const [cards, setCards] = React.useState([]);
  const [currentUser, setCurrentUser] = React.useState('');
  const [deletableCard, setDeletableCard] = React.useState('');
  const [location, setLocation] = React.useState('');
  const [link, setLink] = React.useState('');
  const [name, setName] = React.useState('');
  const [description, setDescription] = React.useState('');
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [email, setEmail] = React.useState('');
  const [success, setSuccess] = React.useState(false);
  const [token, setToken] = React.useState(localStorage.getItem('jwt'));
  //const [userId, setUserId] = React.useState('');
  const handleTokenCheckMemo = useCallback((token)=>{
    console.log('log del jwt token ', token);
    auth.checkToken(token).then((res) => {
      console.log('log del jwt token despues de check ', res);
      if (res) {
        setLoggedIn(true);
        navigate('/main');
      }
    });
    
  },[])

  React.useEffect(() => {
    handleTokenCheckMemo(token);
    userPromise();
  }, [handleTokenCheckMemo]);

  function userPromise() {
    if(token){
      console.log('el token del userprom para tarjetas y usuario', token);
    Promise.all([api.getUserInfo(token), api.getInitialCards(token)])
      .then(([user, serverCards]) => {
        setCurrentUser(user);
        setCards(serverCards);
      })
      .catch((err) => {
        console.log(err);
      });
    }
  }
  ////card functions
  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i._id === currentUser._id);
    api.changeLikeCardStatus(card._id, isLiked, token).then((newCard) => {
      setCards((state) => {
        return state.map((c) => (c._id === card._id ? newCard : c));
      });
    });
  }
  function handleCardDelete(card) {
    api
      .deleteCard(card._id, token)
      .then(
        setCards((state) => {
          const remainingCards = state.filter((c) => c._id !== card._id);
          return remainingCards.map((c) => c);
        })
      )
      .finally(closeAllPopups());
  }
  function handleCardClick(e) {
    setSelectedCard({ name: e.target.alt, link: e.target.src });
    setIsImagePopupOpen(true);
  }
  ////edition functions
  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }
  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }
  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }
  function handleEraseCardClick(card) {
    setDeletableCard(card);
    setEraseCardPopupOpen(true);
  }
  function handleMenuClick() {
    setIsMenuOn(true);
  }
  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setEraseCardPopupOpen(false);
    setIsImagePopupOpen(false);
    setIsTooltipOpen(false);
    setIsMenuOn(false);
    setSelectedCard({ name: '', link: '' });
  }
  ////updaters
  function handleUpdateUser({ name, about }) {
    api
      .postUserInfo(name, about, token)
      .then((res) => {
        setCurrentUser(res);
      })
      .finally(closeAllPopups());
  }
  function handleUpdateAvatar({ avatar }) {
    api
      .postUserAvatar(avatar, token)
      .then((res) => {
        setCurrentUser(res);
      })
      .finally(closeAllPopups());
  }
  function handleAddPlaceSubmit({ name, link }) {
    api
      .postCard(name, link, token)
      .then((newCard) => {
        console.log('despies del postcard en app',newCard);
        setCards([newCard, ...cards])
      })
      .finally(closeAllPopups());
  }
  ////registry
  function handleLoginSubmit({ email, password }) {
    auth
      .authorize(email, password)
      .then((data) => {
        console.log('adata despues del auth de front ',data);
        setToken(data.token);
        //setUserId(data.user._id)
        setCurrentUser(data.user.name);
        setLoggedIn(true);
        setEmail(data.user.email);
        navigate('/main');
        userPromise();
      })
      .catch((err) => {
        console.log(err);
      });
  }
  function handleLogout() {
    setLoggedIn(false);
    navigate('/login');
    localStorage.removeItem('jwt');
    setEmail('');
  }
  function handleSignupSubmit({ email, password }) {
    auth
      .register(email, password)
      .then((res) => {
        navigate('/login');
      })
      .then(() => {
        setSuccess(true);
        setIsTooltipOpen(true);
      })
      .catch((err) => {
        setSuccess(false);
        setIsTooltipOpen(true);
        console.log(err);
      });
  }
  
  ////events handlers
  function handleLocationChange(e) {
    setLocation(e.target.value);
  }
  function handleLinkChange(e) {
    setLink(e.target.value);
  }
  function handleNameChange(e) {
    setName(e.target.value);
  }
  function handleDescriptionChange(e) {
    setDescription(e.target.value);
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className='page'>
        <Header
          isOpen={isMenuOn}
          onClose={closeAllPopups}
          handleMenuClick={handleMenuClick}
          handleLogoutClick={handleLogout}
          loggedIn={loggedIn}
          email={email}
        />
        <Routes>
          <Route path='/test' element={<Test/>} />
          <Route
            path='/main'
            element={
              <ProtectedRoute
                loggedIn={loggedIn}
                element={
                  <Main
                    cards={cards}
                    onCardLike={handleCardLike}
                    handleCardClick={handleCardClick}
                    handleEditAvatarClick={handleEditAvatarClick}
                    handleEditProfileClick={handleEditProfileClick}
                    handleAddPlaceClick={handleAddPlaceClick}
                    handleEraseCardClick={handleEraseCardClick}
                  />
                }
              />
            }
          />
          <Route
            path='/login'
            element={<Login onLoginSubmit={handleLoginSubmit} />}
          />

          <Route
            path='/signup'
            element={<Register onSignupSubmit={handleSignupSubmit} />}
          />
          <Route
            path='/'
            element={
              loggedIn ? <Navigate to='/main' /> : <Navigate to='/login' />
            }
          />
        </Routes>
        <ImagePopup
          image={selectedCard}
          isPopupOpen={isImagePopupOpen}
          onClose={closeAllPopups}
        />
        <InfoTooltip
          isTooltipOpen={isTooltipOpen}
          onClose={closeAllPopups}
          isSuccess={success}
        />
        <EditProfilePopup
          onUpdateUser={handleUpdateUser}
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onNameChange={handleNameChange}
          onDescriptionChange={handleDescriptionChange}
          name={name}
          description={description}
        />
        <AddPlacePopup
          onAddPlace={handleAddPlaceSubmit}
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onNameChange={handleLocationChange}
          onLinkChange={handleLinkChange}
          link={link}
          location={location}
        />
        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
        />
        <DeleteCardPopup
          isOpen={isEraseCardPopupOpen}
          onClose={closeAllPopups}
          onDeleteCard={handleCardDelete}
          card={deletableCard}
          onConfirm={handleCardDelete}
        />
        <Footer />
      </div>
    </CurrentUserContext.Provider>
  );
}
