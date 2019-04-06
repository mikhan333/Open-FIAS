import React, { Component } from "react"
import { Modal, Button, Alert } from "react-bootstrap";
import { connect } from "react-redux";
import { authServer } from '../../store/serverURLs'
import * as mapActionCreators from "../../store/actions/mapActions";
import classes from "./index.module.css";

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
                    Будет сохранено как: { this.props.suggestedAddress } <br/>
                </div>
        }

        let warning;
        if (this.state.isSent) {
            if (this.props.loading) {
                warning =
                    <Alert variant='primary' className={ classes.Warning }>
                        Загрузка...
                    </Alert>
            } else if (this.props.error) {
                if (this.props.error.message === 'Too many points') {
                    warning =
                        <Alert variant='danger'  className={ classes.Warning }>
                            Ошибка: превышен лимит точек для анонимного пользователя (3).<br/>
                            <a href={ authServer }>Войдите</a>, чтобы добавить больше.
                        </Alert>
                } else {
                    warning =
                        <Alert variant='danger' className={classes.Warning}>
                            Ошибка: {this.props.error.message}
                        </Alert>
                }
            } else {
                if (this.props.url) {
                    warning =
                        <Alert variant='success' className={ classes.Warning }>
                            Отправлено <br/>
                            <a href={ this.props.url } target="_blank" rel="noopener noreferrer">{ this.props.url }</a>
                        </Alert>
                } else {
                    warning =
                        <Alert variant='success' className={ classes.Warning }>
                            Отправлено
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
                        Отменить
                    </Button>
                    <Button
                        variant="success"
                        onClick={ this.handleConfirm }
                        className={ classes.ModelButtons }
                    >
                        Подтвердить
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
                        Закрыть
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
                        Подтверждение отправки данных
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <h5>Вы уверены, что хотите отправить эти данные?</h5>
                    <div>
                        Адрес: { this.props.address } <br/>
                        { suggestedAddress }
                        Координаты: { this.props.markerCoords.lat.toFixed(3) }, { this.props.markerCoords.lng.toFixed(3) }
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
        address: state.map.data.address,
        loading: state.map.loading,
        error: state.map.error,
        url: state.map.url,
        suggestedAddress: state.suggest.suggestions[0]
    }
};

const mapDispatchToProps = dispatch => {
    return {
        sendLink: (address, coords) => dispatch(mapActionCreators.sendLink(address, coords)),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(ConfirmModal);