import React, { Component } from 'react'
import { connect } from "react-redux";
import { Form, Button, Tooltip, OverlayTrigger, Nav } from "react-bootstrap";
import * as suggesterActionCreators from "../../store/actions/suggesterActions";
import * as mapActionCreators from "../../store/actions/mapActions";

import SuggestionsList from './SuggestionsList'
import classes from './index.module.css'
import ConfirmModal from './ConfirmModal'
import TranslatableText from "../LanguageProvider/LanguageTranslater";
import { modeTypes } from "../../store/reducers/senderReducer";

import { withRouter } from "react-router-dom";
import * as senderActionCreators from "../../store/actions/senderActions";
import MergingModal from "./MergingModal";

class SuggestBar extends Component {
    constructor(props) {
        super(props);

        this.state = {
            currentAddress: '',
            modalShow: false,
            inputType: {
                as: 'textarea'
            },
            intervals: []
        };

        this.modalClose = this.modalClose.bind(this);
        this.handleConfirm = this.handleConfirm.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSelect = this.handleSelect.bind(this)
    }

    componentDidMount() {
        const interval = setInterval(() => {
            if (this.props.address !== this.state.currentAddress) {
                this.props.getSuggestions(this.props.address);
                this.setState({
                    currentAddress: this.props.address
                })
            }
            if (window.innerWidth < 735 && this.state.inputType.as) {
                this.setState({
                    inputType: {
                        onKeyDown: (event) => {
                            if (event.keyCode === 13) {
                                event.preventDefault();
                                this.handleChange(`${ this.props.address }\n`)
                            }
                        }
                    }
                })
            } else if (window.innerWidth >= 735 && !this.state.inputType.as) {
                this.setState({
                    inputType: {
                        as: 'textarea'
                    }
                })
            }
        }, 200);
        this.state.intervals.push(interval)
    }

    componentWillUnmount() {
        this.state.intervals.forEach((interval) => {
            clearInterval(interval)
        })
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

    handleChange(value) {
        if (value[value.length - 1] === '\n') {
            if (this.props.suggestedAddress && this.props.suggestedAddress !== this.props.address) {
                this.props.setAddress(this.props.suggestedAddress)
            } else {
                this.props.setAddress(value.substr(0, value.length - 1).replace('\n', ' '))
            }
        } else {
            this.props.setAddress(value.replace('\n', ' '))
        }
    }

    handleSelect(mode) {
        this.props.setMode(mode);
    }

    render() {
        let confirmButton;
        if (this.props.address !== ''
            && this.props.markerCoords.lat
            && this.props.markerCoords.lng
            && ((this.props.mode === modeTypes.fias && this.props.allowMarkerPut)
                || (this.props.mode === modeTypes.map && this.props.allowAddressInput)
            )
        ) {
            confirmButton =
                <Button
                    variant="success"
                    onClick={ this.handleConfirm }
                    className={ classes.Button }
                >
                    <TranslatableText
                        dictionary={{
                            russian: "Далее",
                            english: "Continue"
                        }}
                    />
                </Button>
        } else {
            confirmButton =
                <OverlayTrigger
                    placement='top'
                    overlay={
                        <Tooltip>
                            <TranslatableText
                                dictionary={{
                                    russian: "Заполните адрес и поставьте метку, чтобы продолжить",
                                    english: "Fill address and put a marker to continue"
                                }}
                            />
                        </Tooltip>
                    }
                >
                    <Button className={ classes.Button } variant="secondary">
                        <TranslatableText
                            dictionary={{
                                russian: "Далее",
                                english: "Continue"
                            }}
                        />
                    </Button>
                </OverlayTrigger>
        }

        let confirmModal;
        if (this.state.modalShow) {
            confirmModal =
                <ConfirmModal
                    onHide={ this.modalClose }
                />
        }

        const placeholder = {
            russian: 'Найти адрес',
            english: 'Find address'
        };

        const alreadyExists = {
            russian: "Отметьте новый дом",
            english: "Point a new house"
        };

        return (
            <div className={ classes.SuggestBar }>
                <Button variant="" className={ [classes.toMain, "btn", "btn-custom"].join(' ') } href="/">
                    <TranslatableText
                        dictionary={{
                            russian: "На главную",
                            english: "Main page"
                        }}
                    />
                </Button>
                <Nav variant="pills" fill activeKey={ this.props.mode } onSelect={ this.handleSelect } className={ classes.ModeSelector }>
                    <Nav.Item>
                        <Nav.Link eventKey={ modeTypes.fias }>
                            <TranslatableText
                                dictionary={{
                                    russian: "Адрес из ФИАС",
                                    english: "FIAS address"
                                }}
                            />
                        </Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link eventKey={ modeTypes.map }>
                            <TranslatableText
                                dictionary={{
                                    russian: "Точку на карте",
                                    english: "Map location"
                                }}
                            />
                        </Nav.Link>
                    </Nav.Item>
                </Nav>

                <div className={ classes.Suggester }>
                    <Form className={ classes.AddressInput }>
                        <Form.Group>
                            <Form.Control
                                disabled={ this.props.mode === modeTypes.map && !this.props.allowAddressInput }
                                { ...this.state.inputType }
                                autoFocus
                                ref={(input) => this.focusInput(input)}
                                placeholder={ placeholder[ this.props.language ] }
                                onChange={ (event) => this.handleChange(event.target.value) }
                                value={
                                    this.props.mode === modeTypes.fias || this.props.allowAddressInput ?
                                    this.props.address : alreadyExists[ this.props.language ]
                                }
                            />
                        </Form.Group>
                    </Form>
                    <SuggestionsList/>
                </div>

                <div className={ classes.Buttons }>
                    { confirmButton }
                    <Button
                        variant="danger"
                        onClick={ this.props.clearData }
                        className={ classes.Button }
                    >
                        <TranslatableText
                            dictionary={{
                                russian: "Очистить",
                                english: "Clear"
                            }}
                        />
                    </Button>
                </div>

                { confirmModal }
                <MergingModal/>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        markerCoords: state.marker,
        address: state.map.address,
        isFocused: state.map.isFocused,
        suggestedAddress: state.suggest.suggestions[0],
        language: state.auth.language,
        mode: state.sender.mode,
        allowAddressInput: state.sender.allowAddressInput,
        allowMarkerPut: state.sender.allowMarkerPut
    }
};

const mapDispatchToProps = dispatch => {
    return {
        getSuggestions: (address) => dispatch(suggesterActionCreators.getSuggestions(address)),
        setAddress: (address) => dispatch(mapActionCreators.setAddress(address)),
        clearData: () => dispatch(mapActionCreators.clearData()),
        unfocus: () => dispatch(mapActionCreators.unfocusInput()),
        setMode: (mode) => dispatch(senderActionCreators.setMode(mode)),

    }
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(SuggestBar));