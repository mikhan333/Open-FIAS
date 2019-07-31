import React, { Component } from 'react';
import { LanguageContext } from './LanguageTranslater';
import { connect } from "react-redux";
import * as actionCreators from "../../store/actions/auth";

class LanguageProvider extends Component {
    constructor(props) {
        super(props);

        this.updateLanguage = this.updateLanguage.bind(this);
    }

    updateLanguage(language) {
        this.props.setLanguage(language);
    }

    render() {
        return (
        <LanguageContext.Provider
            value={{
                language: this.props.language,
                updateLanguage: this.updateLanguage
            }}
        >
            { this.props.children }
        </LanguageContext.Provider>
        );
    }
}

const mapStateToProps = state => {
    return {
        language: state.auth.language,
    }
};

const mapDispatchToProps = dispatch => {
    return {
        setLanguage: (language) => dispatch(actionCreators.setLanguage(language)),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(LanguageProvider);

