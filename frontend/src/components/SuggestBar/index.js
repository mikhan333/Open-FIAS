import React, { Component } from 'react'
import { connect } from "react-redux";
import {Form, Button, ButtonGroup, Tooltip, OverlayTrigger} from "react-bootstrap";
import * as suggesterActionCreators from "../../store/actions/suggesterActions";
import * as mapActionCreators from "../../store/actions/mapActions";

import SuggestionsList from './SuggestionsList'
import classes from './index.module.css'
import ConfirmModal from './ConfirmModal'

class SuggestBar extends Component {
    constructor(props) {
        super(props);

        this.state = {
            currentAddress: '',
            modalShow: false
        };

        this.modalClose = this.modalClose.bind(this);
        this.handleConfirm = this.handleConfirm.bind(this)
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

    modalClose() {
        this.setState({
            modalShow: false
        })
    }

    focusInput(input) {
        if (this.props.isFocused) {
            if (input) {
                input.focus();
            }
            this.props.unfocus();
        }
    }

    handleConfirm() {
        this.setState({
            modalShow: true
        })
    }

    render() {
        let confirmButton;
        if (this.props.address !== '' && this.props.markerCoords.lat && this.props.markerCoords.lng) {
            confirmButton =
                <Button
                    variant="success"
                    onClick={ this.handleConfirm }
                >Продолжить</Button>;
        } else {
            confirmButton =
                <OverlayTrigger
                    placement='top'
                    overlay={
                        <Tooltip>
                            Заполните адрес и поставьте метку, чтобы продолжить
                        </Tooltip>
                    }
                >
                    <Button variant="secondary">Продолжить</Button>
                </OverlayTrigger>
        }

        let modal;
        if (this.state.modalShow) {
            modal =
                <ConfirmModal
                    onHide={ this.modalClose }
                />
        }


        return (
            <div className={ classes.SuggestBar }>
                <div className={ classes.Suggester }>
                    <Form className={ classes.AddressInput }>
                        <Form.Group>
                            <Form.Control
                                as='textarea'
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

                { modal }
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        markerCoords: state.marker,
        address: state.map.data.address,
        isFocused: state.map.isFocused
    }
};

const mapDispatchToProps = dispatch => {
    return {
        getSuggestions: (address) => dispatch(suggesterActionCreators.getSuggestions(address)),
        setAddress: (address) => dispatch(mapActionCreators.setAddress(address)),
        clearData: () => dispatch(mapActionCreators.clearData()),
        unfocus: () => dispatch(mapActionCreators.unfocusInput())
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(SuggestBar);