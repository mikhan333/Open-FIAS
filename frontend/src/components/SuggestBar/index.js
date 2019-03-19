import React, { Component } from 'react'
import { connect } from "react-redux";
import { Form, Button, ButtonGroup } from "react-bootstrap";
import * as actionCreatorsSuggest from "../../store/actions/suggestionCollector";
import * as actionCreatorsCoords from "../../store/actions/coordinatesData";

import SuggestionsList from './SuggestionsList'
import classes from './index.module.css'

class SuggestBar extends Component {
    constructor(props) {
        super(props);

        this.state = {
            currentAddress: '',
        };
    }

    componentDidMount() {
        setInterval(() => {
            if (this.props.address !== this.state.currentAddress) {
                this.props.getSuggestions(this.props.address);
                this.setState({
                    currentAddress: this.props.address
                })
            }
        }, 200);
    }

    focusInput(input) {
        if (this.props.isFocused) {
            if (input) {
                input.focus();
            }
            this.props.unfocus();
        }
    }

    render() {
        let confirmButton;
        if (this.props.address !== '' && this.props.markerCoords.lat) {
            confirmButton =
                <Button
                    variant="success"
                    onClick={ () => this.props.sendLink(
                        this.props.address,
                        this.props.markerCoords
                    )}
                >Подтвердить</Button>;
        } else {
            confirmButton = <Button variant="success" disabled>Подтвердить</Button>
        }

        return (
            <div className={ classes.SuggestBar }>
                <div className={ classes.Suggester }>
                    <Form className={ classes.AddressInput }>
                        <Form.Group>
                            <Form.Control
                                as='textarea'
                                rows='2'
                                autoFocus
                                ref={(input) => this.focusInput(input)}
                                placeholder="Введите адрес"
                                onChange={ (event) => this.props.setAddress(event.target.value) }
                                value={ this.props.address }
                            />
                        </Form.Group>
                    </Form>
                    <SuggestionsList/>
                </div>

                <ButtonGroup className={ classes.Buttons }>
                    <Button
                        variant="danger"
                        onClick={ this.props.clearData }
                    >
                        Очистить
                    </Button>
                    { confirmButton }
                </ButtonGroup>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        markerCoords: state.coordinatesData.markerData,
        address: state.coordinatesData.data.address,
        isFocused: state.coordinatesData.isFocused
    }
};

const mapDispatchToProps = dispatch => {
    return {
        getSuggestions: (address) => dispatch(actionCreatorsSuggest.getSuggestions(address)),
        setAddress: (address) => dispatch(actionCreatorsCoords.setAddress(address)),
        sendLink: (address, coords) => dispatch(actionCreatorsCoords.sendLink(address, coords)),
        clearData: () => dispatch(actionCreatorsCoords.clearData()),
        unfocus: () => dispatch(actionCreatorsCoords.unfocusInput())
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(SuggestBar);