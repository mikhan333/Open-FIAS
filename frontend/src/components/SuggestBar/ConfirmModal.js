import React, { Component } from "react"
import { Modal, Button, Alert } from "react-bootstrap";
import { connect } from "react-redux";
import { authServer } from '../../store/serverURLs'
import * as actionCreators from "../../store/actions/senderActions";
import classes from "./index.module.css";
import TranslatableText from "../LanguageProvider/LanguageTranslater";

class ConfirmModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isSent: false
        };

        this.handleConfirm = this.handleConfirm.bind(this)
    }

    handleConfirm() {
        this.setState({
            isSent: true
        });
        this.props.sendLink(
            this.props.address,
            this.props.markerCoords
        )
    }

    render() {
        let suggestedAddress;
        if (this.props.suggestedAddress && this.props.suggestedAddress !== this.props.address) {
            suggestedAddress =
                <div>
                    <TranslatableText
                        dictionary={{
                            russian: `Будет сохранено как: `,
                            english: `Will save as: `
                        }}
                    /> { this.props.suggestedAddress } <br/>
                </div>
        }

        let warning;
        if (this.state.isSent) {
            if (this.props.loading) {
                warning =
                    <Alert variant='primary' className={ classes.Warning }>
                        <TranslatableText
                            dictionary={{
                                russian: "Загрузка",
                                english: "Loading"
                            }}
                        />
                    </Alert>
            } else if (this.props.error) {
                if (this.props.error.message === 'Too many points') {
                    warning =
                        <Alert variant='danger'  className={ classes.Warning }>
                            <TranslatableText
                                dictionary={{
                                    russian: "Ошибка: превышен лимит точек для анонимного пользователя (3).",
                                    english: "Error: points limit is exceeded for anonymous user (3)."
                                }}
                            />
                            <br/>
                            <a href={ authServer }>
                                <TranslatableText
                                    dictionary={{
                                        russian: "Войдите",
                                        english: "Login"
                                    }}
                                />
                            </a>
                            <TranslatableText
                                dictionary={{
                                    russian: ", чтобы добавить больше.",
                                    english: " if you want to add more"
                                }}
                            />
                        </Alert>
                } else {
                    warning =
                        <Alert variant='danger' className={classes.Warning}>
                            <TranslatableText
                                dictionary={{
                                    russian: "Ошибка: ",
                                    english: "Error: "
                                }}
                            /> { this.props.error.message }
                        </Alert>
                }
            } else {
                if (this.props.url) {
                    warning =
                        <Alert variant='success' className={ classes.Warning }>
                            <TranslatableText
                                dictionary={{
                                    russian: "Отправлено",
                                    english: "Sent"
                                }}
                            />
                            <br/>
                            <a href={ this.props.url } target="_blank" rel="noopener noreferrer">{ this.props.url }</a>
                        </Alert>
                } else {
                    warning =
                        <Alert variant='success' className={ classes.Warning }>
                            <TranslatableText
                                dictionary={{
                                    russian: "Отправлено",
                                    english: "Sent"
                                }}
                            />
                        </Alert>
                }
            }
        }

        let buttons;
        if (!this.state.isSent) {
            buttons =
                <div>
                    <Button
                        variant="danger"
                        onClick={ this.props.onHide }
                        className={ classes.ModelButtons }
                    >
                        <TranslatableText
                            dictionary={{
                                russian: "Отменить",
                                english: "Cancel"
                            }}
                        />
                    </Button>
                    <Button
                        variant="success"
                        onClick={ this.handleConfirm }
                        className={ classes.ModelButtons }
                    >
                        <TranslatableText
                            dictionary={{
                                russian: "Подтвердить",
                                english: "Confirm"
                            }}
                        />
                    </Button>
                </div>
        } else {
            buttons =
                <div>
                    <Button
                        variant="danger"
                        onClick={ this.props.onHide }
                        className={ classes.ModelButtons }
                    >
                        <TranslatableText
                            dictionary={{
                                russian: "Закрыть",
                                english: "Close"
                            }}
                        />
                    </Button>
                </div>
        }


        return (
            <Modal
                show={ true }
                onHide={ this.props.onHide }
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        <TranslatableText
                            dictionary={{
                                russian: "Подтверждение отправки данных",
                                english: "Confirmation of sending data"
                            }}
                        />
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <h5>
                        <TranslatableText
                            dictionary={{
                                russian: "Вы уверены, что хотите отправить эти данные?",
                                english: "Are you sure about sending data?"
                            }}
                        />
                    </h5>
                    <div>
                        <TranslatableText
                            dictionary={{
                                russian: "Адрес: ",
                                english: "Address: "
                            }}
                        /> { this.props.address } <br/>
                        { suggestedAddress }
                        <TranslatableText
                            dictionary={{
                                russian: "Координаты: ",
                                english: "Coordinates: "
                            }}
                        />
                        { this.props.markerCoords.lat.toFixed(6) }, { this.props.markerCoords.lng.toFixed(6) }
                    </div>
                    { warning }
                </Modal.Body>
                <Modal.Footer>
                    { buttons }
                </Modal.Footer>
            </Modal>
        );
    }
}

const mapStateToProps = state => {
    return {
        markerCoords: state.marker,
        address: state.map.address,
        loading: state.sender.loading,
        error: state.sender.error,
        url: state.sender.url,
        suggestedAddress: state.suggest.suggestions[0]
    }
};

const mapDispatchToProps = dispatch => {
    return {
        sendLink: (address, coords) => dispatch(actionCreators.sendLink(address, coords)),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(ConfirmModal);