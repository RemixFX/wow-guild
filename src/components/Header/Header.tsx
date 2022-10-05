import React from 'react';
import { NavLink } from 'react-router-dom';
const logo_sirus = require('../../images/logo_sirus1.png');
const guild_logo = require('../../images/guild_name2.png');

const Header: React.FC = () => {
  return (
    <header className="header">
      <div className='header__container'>
        <ul className='header__left-titles'>
          <li className='header__title'>
            <NavLink end to='/' className={({ isActive }) =>
              isActive ? "active" : "header__link"}>Главная страница</NavLink>
          </li>
          <li className='header__title'>
            <NavLink to='info' className={({ isActive }) =>
              isActive ? "active" : "header__link"}>Информация гильдии</NavLink>
          </li>
          <li className='header__title'>
            <NavLink to='invite' className={({ isActive }) =>
              isActive ? "active" : "header__link"}>Оставить заявку</NavLink>
          </li>
        </ul>
        <img className="header__logo-sirus" src={logo_sirus} alt="" />
        <ul className='header__right-titles'>
          <li className='header__title'>
            <NavLink to='info' className={({ isActive }) =>
              isActive ? "active" : "header__link"}>Составы 10ок</NavLink>
          </li>
          <li className='header__title'>
            <NavLink to='info' className={({ isActive }) =>
              isActive ? "active" : "header__link"}>Составы 25ок</NavLink>
          </li>
          <li className='header__title'>
            <NavLink to='info' className={({ isActive }) =>
              isActive ? "active" : "header__link"}>Расписание РТ</NavLink>
          </li>
        </ul>
        <img className='header__guild-logo' src={guild_logo} alt="" />
      </div>

    </header>
  )
}

export default Header;
