import React, { Component } from "react"
import { Button, Modal, Table } from "react-bootstrap";
import { connect } from "react-redux";
import TranslatableText from "../LanguageProvider/LanguageTranslater";
import * as senderActionCreators from "../../store/actions/senderActions";
import generateAddress from "../../store/generateAddress";

class MergingModal extends Component {
    constructor(props) {
        super(props);

        this.state = {
            keys: {
                building: (
                    <TranslatableText
                        dictionary={{
                            russian: "Дом",
                            english: "Building"
                        }}
                    />
                ),
                country: (
                    <TranslatableText
                        dictionary={{
                            russian: "Страна",
                            english: "Country"
                        }}
                    />
                ),
                locality: (
                    <TranslatableText
                        dictionary={{
                            russian: "Населенный пункт",
                            english: "Locality"
                        }}
                    />
                ),
                region: (
                    <TranslatableText
                        dictionary={{
                            russian: "Регион",
                            english: "Region"
                        }}
                    />
                ),
                street: (
                    <TranslatableText
                        dictionary={{
                            russian: "Улица",
                            english: "Street"
                        }}
                    />
                ),
                subregion: (
                    <TranslatableText
                        dictionary={{
                            russian: "Округ",
                            english: "Subregion"
                        }}
                    />
                ),
                sublocality: (
                    <TranslatableText
                        dictionary={{
                            russian: "Местность",
                            english: "Sublocality"
                        }}
                    />
                ),
                district: (
                    <TranslatableText
                        dictionary={{
                            russian: "Район",
                            english: "District"
                        }}
                    />
                )
            }
        }
    }

    render() {
        let body;
        if (this.props.show) {
            const fiasKeys = Object.keys(this.props.fiasAddress);
            const osmKeys = Object.keys(this.props.osmAddress);
            let keys = fiasKeys.concat(osmKeys);
            keys = keys.sort();
            for (let i = 1; keys[i] !== undefined; ++i) {
                if (keys[i - 1] === keys[i]) {
                    keys.splice(i, 1)
                }
            }

            const rows = keys.map((value, index) => (
                <tr key={ index }>
                    <td>{ this.state.keys[value] || value.charAt(0).toUpperCase() + value.slice(1) }</td>
                    <td>{ this.props.fiasAddress[value] || '-'}</td>
                    <td>{ this.props.osmAddress[value] || '-'}</td>
                </tr>
            ));

            body = (
                <Table striped bordered hover>
                    <thead>
                    <tr>
                        <th>
                            <TranslatableText
                                dictionary={{
                                    russian: "Поля",
                                    english: "Fields"
                                }}
                            />
                        </th>
                        <th>
                            <TranslatableText
                                dictionary={{
                                    russian: "Данные из ФИАС",
                                    english: "FIAS data"
                                }}
                            />
                        </th>
                        <th>
                            <TranslatableText
                                dictionary={{
                                    russian: "Данные из OSM",
                                    english: "OSM data"
                                }}
                            />
                        </th>
                    </tr>
                    </thead>
                    <tbody>
                    { rows }
                    </tbody>
                </Table>
            )
        }

        return (
            <Modal
                show={ this.props.show }
                onHide={ () => this.props.merge(false) }
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        <TranslatableText
                            dictionary={{
                                russian: "Желаете обновить данные в OSM?",
                                english: "Would you like to update OSM data?"
                            }}
                        />
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    { body }
                </Modal.Body>
                <Modal.Footer>
                    <Button
                        variant="danger"
                        onClick={ () => this.props.merge(false) }
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
                        onClick={ () => this.props.merge(true, generateAddress(this.props.fiasAddress), this.props.markerCoords) }
                    >
                        <TranslatableText
                            dictionary={{
                                russian: "Подтвердить",
                                english: "Confirm"
                            }}
                        />
                    </Button>
                </Modal.Footer>
            </Modal>
        );
    }
}

const mapStateToProps = state => {
    return {
        show: state.sender.mergingData.isMerging,
        fiasAddress: state.sender.mergingData.fiasAddress,
        osmAddress: state.sender.mergingData.osmAddress,
        markerCoords: state.marker
    }
};

const mapDispatchToProps = dispatch => {
    return {
        merge: (isMerged, address, coords) => dispatch(senderActionCreators.merge(isMerged, address, coords))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(MergingModal);