import logo from '../images/Vector.png';
import line from '../images/Line.png';
import React from 'react';
import { Navigate } from 'react-router-dom';

export function Header(props) {
  function signOut() {
    props.handleLogoutClick();
    localStorage.removeItem('jwt');
  }
  function logIn() {
    <Navigate to='/login' />;
  }
  return (
    <header className='header'>
      <img className='header__logo' src={logo} alt='Around the US' />
      <button
        onClick={props.isOpen ? props.onClose : props.handleMenuClick}
        className={
          props.isOpen ? 'header__menu header__menu_active' : 'header__menu'
        }
      ></button>
      <div
        className={
          props.isOpen
            ? 'header__user-stat header__user-stat_active'
            : 'header__user-stat'
        }
      >
        <p className='header__user'>{props.email}</p>
        <button
          onClick={props.loggedIn ? signOut : logIn}
          className='header__log-btn'
        >
          {props.loggedIn ? 'Log Out' : 'Sign In'}
        </button>
      </div>
      <img className='header__line' src={line} alt='underline' />
    </header>
  );
}
