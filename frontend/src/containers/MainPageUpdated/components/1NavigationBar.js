import React from 'react';
import TranslatableText from "../../../components/LanguageProvider/LanguageTranslater";

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
                        <a href="#home">
                            <TranslatableText
                                dictionary={{
                                    russian: "Домой",
                                    english: "Home"
                                }}
                            />
                        </a>
                    </li>
                    <li className="">
                        <a href="#about">
                            <TranslatableText
                                dictionary={{
                                    russian: "О проекте",
                                    english: "About"
                                }}
                            />
                        </a>
                    </li>
                    <li className="">
                        <a href="#help">
                            <TranslatableText
                                dictionary={{
                                    russian: "Помощь",
                                    english: "Help"
                                }}
                            />
                        </a>
                    </li>
                    <li className="">
                        <a href="#statistic">
                            <TranslatableText
                                dictionary={{
                                    russian: "Статистика",
                                    english: "Statistics"
                                }}
                            />
                        </a>
                    </li>
                    <li className="">
                        <a href="#contact">
                            <TranslatableText
                                dictionary={{
                                    russian: "Контакты",
                                    english: "Contacts"
                                }}
                            />
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    </header>
);

export default NavigationBar;
