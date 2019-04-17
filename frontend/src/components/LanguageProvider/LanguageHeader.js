import React, { Component } from 'react';
import { ButtonToolbar, ToggleButtonGroup, ToggleButton } from "react-bootstrap";
import { LanguageConsumer } from './LanguageTranslater';
import { connect } from "react-redux";
import logoRussia from '../../static/Russia.jpg';
import logoUK from '../../static/United_Kingdom.jpg';
import classes from './index.module.css';

class LanguageHeader extends Component {
    render () {
        return (
            <LanguageConsumer>
                {({ updateLanguage }) => (
                    <ButtonToolbar className={ classes.ButtonGroup }>
                        <ToggleButtonGroup type="radio" name="options" value={ this.props.language } onChange={updateLanguage}>
                            <ToggleButton variant="outline-secondary" value="russian" className={ classes.ButtonGroup } >
                                <img src={ logoRussia } className={ classes.Picture } alt=''/>
                            </ToggleButton>
                            <ToggleButton variant="outline-secondary" value="english" className={ classes.ButtonGroup }>
                                <img src={ logoUK } className={ classes.Picture } alt=''/>
                            </ToggleButton>
                        </ToggleButtonGroup>
                    </ButtonToolbar>
                )}
            </LanguageConsumer>
        );
    }
};

const mapStateToProps = state => {
    return {
        language: state.auth.language,
    }
};

export default connect(mapStateToProps)(LanguageHeader);

