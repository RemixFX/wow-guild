import React from 'react';
const logo_sirus = require('../../images/logo_sirus1.png');
const guild_logo = require('../../images/guild_name2.png');

const Header: React.FC = () => {
  return (
    <header className="header">
      <div className='header__container'>
        <ul className='header__left-titles'>
          <li className='header__title'>Главная страница</li>
          <li className='header__title'>Информация гильдии</li>
          <li className='header__title'>Оставить заявку</li>
        </ul>
        <img className="header__logo-sirus" src={logo_sirus} alt="" />
        <ul className='header__right-titles'>
          <li className='header__title'>Составы 10ок</li>
          <li className='header__title'>Составы 25ок</li>
          <li className='header__title'>Расписание РТ</li>
        </ul>
        <img className='header__guild-logo' src={guild_logo} alt="" />
      </div>

    </header>
  )
}

export default Header;
