import React, { Component } from 'react'
import { Form } from 'react-bootstrap'
import { connect } from "react-redux";
import { ListGroup, Button } from "react-bootstrap";
import * as actionCreatorsSuggest from "../../store/actions/suggestionCollector";
import * as actionCreatorsCoords from "../../store/actions/coordinatesData";

import './index.css'

class SuggestBar extends Component {
    constructor(props) {
        super(props);

        this.state = {
            address: this.props.address || '',
        };

        this.onChangeAddress = this.onChangeAddress.bind(this);
        this.onClickAddress = this.onClickAddress.bind(this);
    }

    onChangeAddress(address) {
        this.props.sendAddress(address);
        this.setState({
            address: address
        })
    }

    onClickAddress(address) {
        this.props.sendAddress(address);
        this.props.findPlace(address);
        this.setState({
            address: `${ address }, `

        })
    }

    render() {
        const suggestions = this.props.suggestions.map((address, index) =>
            <ListGroup.Item
                className='address'
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
            <div>
                <Form className="addressInput">
                    <Form.Control
                        type='textarea'
                        placeholder="Введите адрес"
                        onChange={ (event) => this.onChangeAddress(event.target.value) }
                        value={ this.state.address }
                    />
                </Form>

                <ListGroup>
                    { suggestions }
                </ListGroup>
                { confirmButton }
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
        }
    }
};

const mapDispatchToProps = dispatch => {
    return {
        sendAddress: (address) => dispatch(actionCreatorsSuggest.sendAddress(address)),
        findPlace: (address) => dispatch(actionCreatorsCoords.findPlace(address)),
        sendLink: (address, coords) => dispatch(actionCreatorsCoords.sendLink(address, coords))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(SuggestBar);