import React, { Component } from "react"
import { Modal, Button } from "react-bootstrap";
import { connect } from "react-redux";

import * as actionCreators from "../../store/actions/auth";
import classes from "./index.module.css";

class AddAnonimPointsModal extends Component {
    constructor(props) {
        super(props);

        this.handleConfirm = this.handleConfirm.bind(this)
    }

    handleConfirm() {
        this.props.onHide();
        this.props.setAnonimPoints();
    }

    render() {
        return (
            <Modal
                show={ true }
                { ...{ onHide: this.props.onHide } }
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Сохранение
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <h4>Хотите сохранить поставленные ранее метки в вашем профиле?</h4>
                    <p>
                        Метки, которые вы создали ранее, находясь в режиме анонимного пользователя, можно сохранить от Вашего имени
                    </p>
                </Modal.Body>
                <Modal.Footer>
                    <div>
                        <Button
                            variant="danger"
                            onClick={ this.props.onHide }
                            className={ classes.ModelButtons }
                        >
                            Нет, спасибо
                        </Button>
                        <Button
                            variant="success"
                            onClick={ this.handleConfirm }
                            className={ classes.ModelButtons }
                        >
                            Да, давай
                        </Button>
                    </div>
                </Modal.Footer>
            </Modal>
        );
    }
}

const mapDispatchToProps = dispatch => {
    return {
        setAnonimPoints: () => dispatch(actionCreators.setAnonimPoints()),
    }
};

export default connect(null, mapDispatchToProps)(AddAnonimPointsModal);