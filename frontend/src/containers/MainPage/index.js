import React, { Component } from 'react';
import ReactFullpage from '@fullpage/react-fullpage';

import classes from './index.module.css'
import Statistics from "../Statistics";
import InfoProject from "../InfoProject";
import { fullpageLicenseKey }  from "../../config";

import Background1 from '../../static/bg1.png'
import OSMLogo from '../../static/Openstreetmap_logo.svg.png'
import TranslatableText from "../../components/LanguageProvider/LanguageTranslater";
import { connect } from "react-redux";
import { Button } from "react-bootstrap";
import AddAnonimPointsModal from "./AddAnonimPointsModal";

class MainPage extends Component {
    render() {
        let tooltips;
        if (this.props.language !== 'english') {
            tooltips = [ 'Главная', 'Помощь', 'Статистика', 'О проекте', 'Контакты' ]
        } else {
            tooltips = [ 'Main', 'Help', 'Statistics', 'About', 'Contacts' ]
        }

        return (
            <div className={ classes.Container }>
                <ReactFullpage
                    licenseKey={ fullpageLicenseKey }
                    debug
                    navigation
                    navigationTooltips={ tooltips }

                    sectionsColor={ [null, '#4bbfc3', null, 'whitesmoke', '#9f9f9f'] }
                    verticalCentered={ false }
                    loopBottom

                    anchors={ [ 'main', 'help', 'statistics', 'about', 'contacts' ] }
                    lockAnchors

                    render={({ state, fullpageApi }) => {
                        return (
                            <ReactFullpage.Wrapper>
                                <div
                                    className="section"
                                    style={{
                                        backgroundImage: `url(${ Background1 })`,
                                        backgroundSize: 'cover'
                                    }}>
                                    <div className={ classes.Section1 }>
                                        <div className={ classes.Section1Left }>
                                            <h3>
                                                <TranslatableText
                                                    dictionary={{
                                                        russian: "Привет",
                                                        english: "Hello"
                                                    }}
                                                />
                                            </h3>

                                            <Button variant="secondary" onClick={() => fullpageApi.moveSectionDown()}>
                                                <TranslatableText
                                                    dictionary={{
                                                        russian: "Что делать?",
                                                        english: "How to use"
                                                    }}
                                                />
                                            </Button>
                                        </div>

                                        <div className={ classes.Section1Right }>
                                            <img src={ OSMLogo } alt='' className={ classes.OSMLogo }/>
                                        </div>

                                    </div>
                                </div>
                                <div className="section">
                                    <p>Helper</p>
                                </div>
                                <div className="section">
                                    <div className={ classes.Section }>
                                        <Statistics/>

                                    </div>
                                </div>
                                <div className="section">
                                    <InfoProject/>
                                </div>
                                <div className="section">
                                    <h1>Contacts</h1>
                                </div>
                            </ReactFullpage.Wrapper>
                        )
                    }}
                />

                <AddAnonimPointsModal/>
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