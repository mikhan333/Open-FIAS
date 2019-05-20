import React from 'react';
// import UserInfo from '../../../components/Header/UserInfo';

const NavigationBar = (props) => (
    <header id="topnav" className="defaultscroll fixed-top sticky">
        <div className="container">
            <div>
                <a href="/" className="logo text-uppercase">
                    Open-FIAS
                </a>
            </div>
            <div className="menu-extras">
                <div className="menu-item">
                    <button className="navbar-toggle">
                        <div className="lines">
                            <span></span>
                            <span></span>
                            <span></span>
                        </div>
                    </button>
                </div>
            </div>
            <div id="navigation">
                <ul className="navigation-menu">
                    <li className="active">
                        <a href="#home">Домой</a>
                    </li>
                    <li className="">
                        <a href="#about">О проекте</a>
                    </li>
                    <li className="">
                        <a href="#help">Помощь</a>
                    </li>
                    <li className="">
                        <a href="#statistic">Статистика</a>
                    </li>
                    <li className="">
                        <a href="#contact">Контакты</a>
                    </li>
                </ul>
            </div>
            {/* <div> 
                <UserInfo />
            </div> */}
        </div>
    </header>
);

export default NavigationBar;
