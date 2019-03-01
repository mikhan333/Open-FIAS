import React, { Component } from 'react'
import { Form } from 'react-bootstrap'
import { connect } from "react-redux";
import { ListGroup } from "react-bootstrap";
import * as actionCreators from "../../store/actions/suggestionCollector";

import './index.css'

class SuggestBar extends Component {
    constructor(props) {
        super(props);

        this.state = {
            address: this.props.address || '',
        };

        this.onChangeAddress = this.onChangeAddress.bind(this);
        this.onChooseAddress = this.onChooseAddress.bind(this);
    }

    onChangeAddress(event) {
        this.props.sendAddress(event.target.value);
        this.setState({
            address: event.target.value
        })
    }

    onChooseAddress(value) {
        this.setState({
            address: value
        })
    }

    render() {
        const suggestions = this.props.suggestions.map((address) =>
            <ListGroup.Item
                className='address'
                onClick={ () => this.onChooseAddress(address) }
            >
                { address }
            </ListGroup.Item>
        );

        return (
            <div>
                <Form className="addressInput">
                    <Form.Control
                        placeholder="Введите адрес"
                        onChange={ this.onChangeAddress }
                        value={ this.state.address }
                    />
                </Form>
                <ListGroup>
                    { suggestions }
                </ListGroup>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        suggestions: state.suggest.suggestions
    }
};

const mapDispatchToProps = dispatch => {
    return {
        sendAddress: (address) => dispatch(actionCreators.sendAddress(address)),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(SuggestBar);