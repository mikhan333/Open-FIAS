import React, { Component } from 'react'
import { Form } from 'react-bootstrap'
import { connect } from "react-redux";
import { ListGroup, Button, ButtonGroup } from "react-bootstrap";
import * as actionCreatorsSuggest from "../../store/actions/suggestionCollector";
import * as actionCreatorsCoords from "../../store/actions/coordinatesData";

import classes from './index.module.css'

class SuggestBar extends Component {
    constructor(props) {
        super(props);

        this.state = {
            currentAddress: '',
            isFocused: false
        };

        this.onChangeAddress = this.onChangeAddress.bind(this);
        this.onClickAddress = this.onClickAddress.bind(this);
        this.focusMe = this.focusMe.bind(this);

        setInterval(() => {
            if (this.props.address !== this.state.currentAddress) {
                this.props.sendAddress(this.props.address);
                this.setState({
                    currentAddress: this.props.address
                })
            }
        }, 200);
    }

    onChangeAddress(address) {
        this.props.setAddress(address)
    }

    onClickAddress(address) {
        this.props.findPlace(address);
        this.setState({
            isFocused: true
        })
    }

    focusMe(input) {
        if (this.state.isFocused) {
            if (input) {
                input.focus();
            }
            this.setState({
                isFocused: false
            })
        }
    }

    render() {
        const suggestions = this.props.suggestions.map((address, index) =>
            <ListGroup.Item
                className={ classes.SingleAddress }
                onClick={ () => this.onClickAddress(address) }
                key={ index }
            >
                { address }
            </ListGroup.Item>
        );

        let confirmButton;
        if (this.props.linkData.address !== '' && this.props.linkData.coords.lat) {
            confirmButton =
                <Button
                    variant="success"
                    onClick={() => this.props.sendLink(
                        this.props.linkData.address,
                        this.props.linkData.coords
                    )}
                >Подтвердить</Button>;
        } else {
            confirmButton = <Button variant="success" disabled>Подтвердить</Button>
        }

        return (
            <div className={ classes.SuggestBar }>
                <div className={ classes.SuggestedList }>
                    <Form className={ classes.AddressInput }>
                        <Form.Control
                            autoFocus
                            ref={(input) => this.focusMe(input)}
                            placeholder="Введите адрес"
                            onChange={ (event) => this.onChangeAddress(event.target.value) }
                            value={ this.props.address }
                        />
                    </Form>

                    <ListGroup>
                        { suggestions }
                    </ListGroup>
                </div>


                <ButtonGroup className={ classes.Buttons }>
                    <Button
                        variant="danger"
                        onClick={ this.props.clearData }
                    >Очистить</Button>

                    { confirmButton }
                </ButtonGroup>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        suggestions: state.suggest.suggestions,
        linkData: {
            address: state.suggest.address,
            coords: state.coordinatesData.markerCoords
        },
        address: state.coordinatesData.coords.address
    }
};

const mapDispatchToProps = dispatch => {
    return {
        sendAddress: (address) => dispatch(actionCreatorsSuggest.sendAddress(address)),
        findPlace: (address) => dispatch(actionCreatorsCoords.findPlace(address)),
        sendLink: (address, coords) => dispatch(actionCreatorsCoords.sendLink(address, coords)),
        clearData: () => dispatch(actionCreatorsCoords.clearData()),
        setAddress: (address) => dispatch(actionCreatorsCoords.setAddress(address))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(SuggestBar);