import React, { Component } from 'react'
import { connect } from "react-redux";
import { ListGroup, Alert } from "react-bootstrap";
import * as actionCreators from "../../store/actions/mapActions";

import classes from './index.module.css'
import TranslatableText from "../LanguageProvider/LanguageTranslater";
import {modeTypes} from "../../store/reducers/senderReducer";

class SuggestionsList extends Component {
    render() {
        let warning;
        if (this.props.loading) {
            warning =
                <Alert variant='primary' className={ classes.Warning }>
                    <TranslatableText
                        dictionary={{
                            russian: "Загрузка...",
                            english: "Loading..."
                        }}
                    />
                </Alert>
        } else if (this.props.error) {
            warning =
                <Alert variant='danger'  className={ classes.Warning }>
                    <TranslatableText
                        dictionary={{
                            russian: "Ошибка: ",
                            english: "Error: "
                        }}
                    /> { this.props.error.message }
                </Alert>
        }

        const suggestions = this.props.suggestions.map((address, index) =>
            <ListGroup.Item
                className={ classes.SingleAddress }
                onClick={ () =>
                    this.props.mode === modeTypes.fias ?
                    this.props.getCoords(address) : this.props.setAddress(address)
                }
                key={ index }
            >
                { address }
            </ListGroup.Item>
        );

        return (
            <div className={ classes.SuggestedList }>
                { warning }
                <ListGroup>
                    { suggestions }
                </ListGroup>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        suggestions: state.suggest.suggestions,
        loading: state.suggest.loading,
        error: state.suggest.error,
        mode: state.sender.mode
    }
};

const mapDispatchToProps = dispatch => {
    return {
        getCoords: (address) => dispatch(actionCreators.getCoords(address)),
        setAddress: (address) => dispatch(actionCreators.setAddress(address)),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(SuggestionsList);