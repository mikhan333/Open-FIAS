import React, { Component } from 'react';
import ReactFullpage from '@fullpage/react-fullpage';

import classes from './index.module.css'
import Statistics from "../Statistics";
import InfoProject from "../InfoProject";
import { fullpageLicenseKey } from "../../config";
// import Header from '../../components/Header';
import HelperPage from './HelperPage.js';

import Background1 from '../../static/bg1.png';
import OSMLogo from '../../static/Openstreetmap_logo.svg.png';

import TranslatableText from "../../components/LanguageProvider/LanguageTranslater";
import { connect } from "react-redux";
import { Button, Row, Col } from "react-bootstrap";
import AddAnonimPointsModal from "./AddAnonimPointsModal";

const FrontPage = props => (
    <div className={ classes.Section1 }>
        <div className={ classes.Section1Left }>
            <h1 className={ classes.TextStyleHead }>
                Open-FIAS
            </h1><br />
            <h3>
                <TranslatableText
                    dictionary={{
                        russian: "Геокодирование - это просто и легко!",
                        english: "Geocoding is simple and easy!"
                    }}
                />
            </h3>

            <Button variant="secondary" onClick={ () => props.fullpageApi.moveSectionDown() }>
                <TranslatableText
                    dictionary={{
                        russian: "Что делать?",
                        english: "How to use?"
                    }}
                />
            </Button>
        </div>

        <div>
            <img src={ OSMLogo } alt='' className={ classes.OSMLogo } />
        </div>

    </div>
);

class MainPage extends Component {
    render() {
        let tooltips;
        if (this.props.language !== 'english') {
            tooltips = ['Главная', 'Помощь', 'Статистика', 'О проекте', 'Контакты']
        } else {
            tooltips = ['Main', 'Help', 'Statistics', 'About', 'Contacts']
        }

        return (
            <div className={ classes.Container }>
                <ReactFullpage
                    licenseKey={ fullpageLicenseKey }
                    debug
                    navigation
                    navigationTooltips={tooltips}

                    sectionsColor={[ null, '#303438', '#eeeeee', 'whitesmoke', 'black' ]}
                    verticalCentered={ false }
                    loopBottom

                    anchors={[ 'main', 'help', 'statistics', 'about', 'contacts' ]}
                    lockAnchors

                    render={({ state, fullpageApi }) => {
                        return (
                            <ReactFullpage.Wrapper>
                                <div
                                    className="section"
                                    style={{
                                        backgroundImage: `url(${Background1})`,
                                        backgroundSize: 'cover'
                                    }}>
                                    <FrontPage fullpageApi={ fullpageApi } />
                                </div>

                                <div className="section">
                                    <HelperPage link={ this.props.history }/>
                                </div>
                                <div className="section">
                                    <div className={ classes.Section3 }>
                                        <Statistics />
                                    </div>
                                </div>
                                <div className="section">
                                    <InfoProject />
                                </div>
                                <div className="section">
                                    <Row>
                                        <Col sm={{ span: 3, offset: 3 }}>
                                            <div className={ classes.Section5 }>
                                                <h4 className={ classes.TextStyleHead } style={{ marginBottom: '30px' }}>
                                                    <TranslatableText
                                                        dictionary={{
                                                            russian: "Контакты",
                                                            english: "Contacts"
                                                        }}
                                                    />
                                                </h4>
                                                <p className={ classes.TextStyleBody }>
                                                    <TranslatableText
                                                        dictionary={{
                                                            russian: "Это open-source проект: ",
                                                            english: "This is open-source project: "
                                                        }}
                                                    /> <br />
                                                    <a href="https://github.com/mikhan333/Open-FIAS" target="_blank" rel="noopener noreferrer">Open-FIAS</a> <br />
                                                </p>
                                                <p className={ classes.TextStyleBody }>
                                                    <TranslatableText
                                                        dictionary={{
                                                            russian: "Для связи с нами",
                                                            english: "Please contact us with"
                                                        }}
                                                    /><br />
                                                    <TranslatableText
                                                        dictionary={{
                                                            russian: "по вопросу проблем на ресурсе",
                                                            english: "information about any problems"
                                                        }}
                                                    /><br />
                                                    <TranslatableText
                                                        dictionary={{
                                                            russian: "или партнерских предложений:",
                                                            english: "or with your affiliate offers: "
                                                        }}
                                                    /><br />
                                                    <a href="mailto:smth@mail.ru" target="_blank" rel="noopener noreferrer">smth@mail.ru</a><br />
                                                </p>
                                                
                                            </div>
                                        </Col>
                                        <Col sm={{ span: 3 }}>
                                            <div className={ classes.Section5 }>
                                                <h4 className={ classes.TextStyleHead } style={{ marginBottom: '30px' }}>
                                                    <TranslatableText
                                                        dictionary={{
                                                            russian: "Информация",
                                                            english: "Information"
                                                        }}
                                                    />
                                                </h4>
                                                <p className={ classes.TextStyleBody }>
                                                    <TranslatableText
                                                        dictionary={{
                                                            russian: "Данный проект был сделан",
                                                            english: "This project was made"
                                                        }}
                                                    /><br />
                                                    <TranslatableText
                                                        dictionary={{
                                                            russian: "как выпускной проект Технотрека",
                                                            english: "as an institute project."
                                                        }}
                                                    /><br />
                                                    <TranslatableText
                                                        dictionary={{
                                                            russian: "при поддержке таких сервисов как: ",
                                                            english: "It made with the help of services: "
                                                        }}
                                                    /><br />
                                                    <a href="https://maps.me/" target="_blank" rel="noopener noreferrer">MAPS.ME</a> <br />
                                                    <a href="https://www.openstreetmap.org/" target="_blank" rel="noopener noreferrer">OpenStreetMap</a> <br />
                                                </p>
                                            </div>
                                        </Col>
                                    </Row>   
                                </div>
                            </ReactFullpage.Wrapper>
                        )
                    }}
                />

                <AddAnonimPointsModal />
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        language: state.auth.language
    }
};

export default connect(mapStateToProps)(MainPage);