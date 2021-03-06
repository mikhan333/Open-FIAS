import React, { Component } from 'react';
import * as actionCreators from "../../store/actions/statsActions";
import { connect } from "react-redux";

import AddAnonimPointsModal from './AddAnonimPointsModal'
import NavigationBar from "./components/1NavigationBar";
import MainList from "./components/2MainList";
import AboutList from "./components/3AboutList";
import HelpList from "./components/4HelpList";
import StatisticList from "./components/5StatisticList";
import ContactList from "./components/6ContactList";
import TranslatableText from "../../components/LanguageProvider/LanguageTranslater";

class MainPageUpdated extends Component {
    componentDidMount() {
        // eslint-disable-next-line
        $.ToldApp.init();
    }

    componentDidUpdate() {
        // eslint-disable-next-line
        $.AddApp.init();
    }

    render() {
        return (
            <>
                <div id="preloader">
                    <div id="status">
                        <div className="spinner">
                            <TranslatableText
                                dictionary={{
                                    russian: "Загрузка...",
                                    english: "Loading..."
                                }}
                            />
                        </div>
                    </div>
                </div>

                <NavigationBar />

                <section className="home-section" id="home">
                    <MainList history={ this.props.history }/>
                </section>


                <section className="section bg-light" id="about">
                    <AboutList history={ this.props.history }/>
                </section>

                <section className="section text-center" id="help">
                    <HelpList />
                </section>

                <section className="section testimonial bg-light" id="quote">
                    <div className="container">
                        <div className="row justify-content-center">
                            <div className="col-lg-8">
                                <div className="quote text-center text-custom">
                                    <span className="quote-mark">&#8220;</span>
                                    <TranslatableText
                                        dictionary={{
                                            russian: "Самый отдаленный пункт земного шара к чему-нибудь да близок, а самый близкий от чего-нибудь да отдален.",
                                            english: "The most distant point on the globe is close to something, and the closest to something is far."
                                        }}
                                    />
                                </div>
                                <div className="author text-center mt-4">
                                    <img src="images/testi/image-1.png" alt="" className="rounded-circle" />
                                    <span className="name font-weight-bold">
                                    <TranslatableText
                                        dictionary={{
                                            russian: "Козьма Прутков",
                                            english: "Kozma Prutkov"
                                        }}
                                    />
                                <span className="company">
                                    <TranslatableText
                                        dictionary={{
                                            russian: "Русский писатель",
                                            english: "Russian writer"
                                        }}
                                    />
                                </span>
                            </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="section" id="statistic">
                    <StatisticList />
                </section>

                <section className="bg-custom pt-5 pb-5">
                    <div className="container">
                        <div className="row justify-content-center" id="counter">
                            <div className="col-md-6 text-white text-center pt-3 pb-3">
                                <h1><span className="counter-value" data-count={ this.props.usersCount }>0</span></h1>
                                <div className="funfact-border mx-auto mt-3 mb-3"></div>
                                <h5 className="counter-name">
                                    <TranslatableText
                                        dictionary={{
                                            russian: "Число пользователей",
                                            english: "Users count"
                                        }}
                                    />
                                </h5>
                            </div>

                            <div className="col-md-6 text-white text-center pt-3 pb-3">
                                <h1><span className="counter-value" data-count={ this.props.pointsCount }>0</span></h1>
                                <div className="funfact-border mx-auto mt-3 mb-3"></div>
                                <h5 className="counter-name">
                                    <TranslatableText
                                        dictionary={{
                                            russian: "Число точек",
                                            english: "Points count"
                                        }}
                                    />
                                </h5>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="section" id="contact">
                    <ContactList />
                </section>
                
                <footer className="section footer bg-light" id="contact">
                    <div className="container">
                        <div className="row justify-content-center">
                            <div className="col-md-4">
                                <h6 className="text-uppercase footer-title">
                                    <TranslatableText
                                        dictionary={{
                                            russian: "Контакты",
                                            english: "Contacts"
                                        }}
                                    />
                                </h6>
                                <ul className="list-unstyled mt-4 footer-list">
                                    <li>
                                        <a href="https://github.com/mikhan333/Open-FIAS" target="_blank" rel="noopener noreferrer">Github</a>
                                    </li>
                                    <li>
                                        <a href="mailto:openfias@mail.ru" target="_blank" rel="noopener noreferrer">Email</a>
                                    </li>
                                    <li>
                                        <a href="https://github.com/mikhan333/Open-FIAS/commits/dev" target="_blank" rel="noopener noreferrer">
                                            Development
                                        </a>
                                    </li>
                                </ul>
                            </div>
                            <div className="col-md-4">
                                <h6 className="text-uppercase footer-title">
                                    <TranslatableText
                                        dictionary={{
                                            russian: "Информация",
                                            english: "Information"
                                        }}
                                    />
                                </h6>
                                <ul className="list-unstyled mt-4 footer-list">
                                    <li>
                                        <a href="https://track.mail.ru/" target="_blank" rel="noopener noreferrer">
                                            <TranslatableText
                                                dictionary={{
                                                    russian: "Технотрек",
                                                    english: "Tehnotrack"
                                                }}
                                            />
                                        </a>
                                    </li>
                                    <li>
                                        <a href="https://maps.me/" target="_blank" rel="noopener noreferrer">MAPS.ME</a>
                                    </li>
                                    <li>
                                        <a href="https://www.openstreetmap.org/" target="_blank" rel="noopener noreferrer">OpenStreetMap</a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </footer>

                <AddAnonimPointsModal />
            </>
        )
    }
}

const mapStateToProps = state => {
    return {
        latestPoints: state.stats.latestPoints,
        usersTop: state.stats.usersTop,
        pointsPerDay: state.stats.pointsPerDay,
        usersCount: state.stats.usersCount,
        pointsCount: state.stats.pointsCount,
        language: state.auth.language
    }
};

const mapDispatchToProps = dispatch => {
    return {
        getStats: () => dispatch(actionCreators.getStatistics()),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(MainPageUpdated);
