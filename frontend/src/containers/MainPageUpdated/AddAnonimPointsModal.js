import React, { Component } from "react"
import { Modal, Button, Form } from "react-bootstrap";
import { connect } from "react-redux";

import * as actionCreators from "../../store/actions/auth";
import classes from "../LoginPage/index.module.css";
import generateAddress from "../../store/generateAddress";
import TranslatableText from "../../components/LanguageProvider/LanguageTranslater";

class AddAnonimPointsModal extends Component {
    constructor(props) {
        super(props);

        this.state = {
            newPoints: [],
            untouched: true
        };

        this.handleConfirm = this.handleConfirm.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleClose = this.handleClose.bind(this)
    }

    handleConfirm() {
        let savedPoints = this.props.newPoints.map((point) => (point.id));
        if (this.state.newPoints.length !== 0) {
            savedPoints = savedPoints.filter((point, index) => (this.state.newPoints[index]))
        }
        this.props.setAnonimPoints(savedPoints);
        this.props.clearNewPoints();
    }

    handleChange(index) {
        let newPoints;
        if (this.props.newPoints.length !== this.state.newPoints.length) {
            newPoints = Array(this.props.newPoints.length).fill(true)
        } else {
            newPoints = this.state.newPoints;
        }
        newPoints[index] = !newPoints[index];
        this.setState({
            newPoints,
            untouched: false
        });
    }

    handleClose() {
        this.props.setAnonimPoints([]);
        this.props.clearNewPoints();
    }

    render() {
        let newPoints;
        if (this.props.newPoints) {
            newPoints = this.props.newPoints.map((point, index) =>
                <Form.Check
                    type='checkbox'
                    checked={ this.state.newPoints[index] || this.state.untouched }
                    key={ index }
                    id={ index + 1 }
                    onChange={ () => this.handleChange(index) }
                    label={ generateAddress(point.address) }
                />
            )
        }

        return (
            <Modal
                show={ this.props.newPoints.length !== 0 }
                onHide={ this.handleClose }
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        <TranslatableText
                            dictionary={{
                                russian: "Сохранение",
                                english: "Saving"
                            }}
                        />
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <h4>
                        <TranslatableText
                            dictionary={{
                                russian: "Хотите сохранить поставленные ранее метки в вашем профиле?",
                                english: "Do you want to keep the previously created points in your profile?"
                            }}
                        />
                    </h4>
                    <Form>
                        { newPoints }
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <div>
                        <Button
                            variant="danger"
                            onClick={ this.handleClose }
                            className={ classes.ModelButtons }
                        >
                            <TranslatableText
                                dictionary={{
                                    russian: "Нет, спасибо",
                                    english: "No, thanks"
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
                                    russian: "Да, давай",
                                    english: "Yeah"
                                }}
                            />
                        </Button>
                    </div>
                </Modal.Footer>
            </Modal>
        );
    }
}

const mapStateToProps = state => {
    return {
       newPoints: state.auth.newPoints
    }
};

const mapDispatchToProps = dispatch => {
    return {
        setAnonimPoints: (points) => dispatch(actionCreators.setAnonimPoints(points)),
        clearNewPoints: () => dispatch(actionCreators.setNewPoints([]))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(AddAnonimPointsModal);