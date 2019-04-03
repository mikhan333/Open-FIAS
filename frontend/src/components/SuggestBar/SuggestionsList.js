import React, { Component } from 'react'
import { connect } from "react-redux";
import { ListGroup, Alert } from "react-bootstrap";
import * as actionCreators from "../../store/actions/mapActions";

import classes from './index.module.css'

class SuggestionsList extends Component {
    render() {
        let warning;
        if (this.props.loading) {
            warning =
                <Alert variant='primary' className={ classes.Warning }>
                    Загрузка...
                </Alert>
        } else if (this.props.error) {
            warning =
                <Alert variant='danger'  className={ classes.Warning }>
                    Ошибка: { this.props.error.message }
                </Alert>
        }

        const suggestions = this.props.suggestions.map((address, index) =>
            <ListGroup.Item
                className={ classes.SingleAddress }
                onClick={ () => this.props.getCoords(address) }
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
        error: state.suggest.error
    }
};

const mapDispatchToProps = dispatch => {
    return {
        getCoords: (address) => dispatch(actionCreators.getCoords(address)),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(SuggestionsList);