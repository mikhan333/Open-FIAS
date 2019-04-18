import React, { Component } from 'react'
import { connect } from "react-redux";
import { Container, Row, Col, Table, Card, Image } from "react-bootstrap"
import { Redirect } from "react-router-dom";

import TranslatableText from '../../components/LanguageProvider/LanguageTranslater';
import classes from './index.module.css'
import * as actionCreators from "../../store/actions/auth";
import * as mapActionCreators from "../../store/actions/mapActions";
import * as markerActionCreators from "../../store/actions/markerActions";
import generateAddress from "../../store/generateAddress";

class Profile extends Component {
    constructor(props) {
        super(props);

        this.handleClick = this.handleClick.bind(this)
    }

    componentDidMount() {
        this.props.getProfileInfo()
    }

    handleClick(point) {
        this.props.setAddress(generateAddress(point.address));
        const coords = {
            lat: point.latitude,
            lng: point.longitude
        };
        this.props.setMarkerCoords(coords);
        this.props.setMapCoords(coords);
        this.props.history.push('/add_point')
    }

    render() {
        if(!localStorage.getItem('username') || localStorage.getItem('username') === '') {
            return <Redirect to='/'/>
        }
        let avatar;
        if(this.props.avatar) {
            avatar = <Image src={ this.props.avatar } className={ classes.Avatar } rounded />
        }

        let pointInfo, myPoints, myPointsTable, lenPoints;
        if (!this.props.points || this.props.points.length === 0) {
            pointInfo =
                <div>
                    <TranslatableText dictionary={{russian: "У вас пока нет добавленных точек", english: "You have no points added yet"}}/>
                </div>
        } else { 
            lenPoints = this.props.points.length;
            pointInfo =
                <div>
                    <TranslatableText dictionary={{russian: "Ваши точки:", english: "Your points:"}}/>
                </div>
            myPoints = this.props.points.map((point, index) => {
                index++;
                return (
                    <tr 
                        key={ index } 
                        onClick={ () => this.handleClick(point) } 
                        className={ classes.AddressRow }
                    >
                        <td>{ index }</td>
                        <td>{ point.address.region || '-' }</td>
                        <td>{ point.address.locality || '-' }</td>
                        <td>{ point.address.street || '-' }</td>
                        <td>{ point.address.building || '-' }</td>
                        <td>
                            { point.latitude.toFixed(6) }; { point.longitude.toFixed(6) }
                        </td>
                    </tr>
                )});
            myPointsTable = [
                <thead key="0">
                    <tr className={ classes.AddressRow }>
                    <th>№</th>
                    <th>Регион</th>
                    <th>Населенный пункт</th>
                    <th>Улица</th>
                    <th>Дом</th>
                    <th>Координаты</th>
                    </tr>
                </thead>,
                <tbody key="1">
                    { myPoints }
                </tbody>
            ]
        }

        return(
            <Container fluid>
                <Row>
                    <Col 
                        xl={{ span: 8, offset: 2 }} 
                        lg={{ span: 10, offset: 1 }} 
                        md={12}
                        xs="auto" 
                    >
                    <Card className={ classes.ProfileCard }>
                        <div className={ classes.ProfileInfo }>
                            <h3><TranslatableText dictionary={{russian: "Личное:", english: "Private:"}}/></h3>
                            <div className={ classes.Username }>
                                <TranslatableText dictionary={{russian: "Ваш логин ", english: "Your login "}}/> 
                                &mdash; { this.props.username }
                                <br/>
                                <TranslatableText dictionary={{russian: "Ваш аватар ", english: "Your avatar "}}/> 
                                &mdash; { avatar }
                                <br/>
                                <TranslatableText dictionary={{russian: "Вы создали точек ", english: "You created points "}}/> 
                                &mdash; { lenPoints }
                            </div>
                            <br/>
                            <h4>{ pointInfo }</h4>
                        </div>
                        <Table striped bordered hover size="sm" responsive>
                            { myPointsTable }
                        </Table>
                    </Card>
                    </Col>
                </Row>
            </Container>
        )
    }
}

const mapStateToProps = state => {
    return {
        username: state.auth.username,
        points: state.auth.points,
        avatar: state.auth.avatar
    }
};

const mapDispatchToProps = dispatch => {
    return {
        getProfileInfo: () => dispatch(actionCreators.getProfileInfo()),
        setAddress: (address) => dispatch(mapActionCreators.setAddress(address)),
        setMarkerCoords: (coords) => dispatch(markerActionCreators.setMarkerCoords(coords)),
        setMapCoords: (coords) => dispatch(mapActionCreators.setMapCoords(coords))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);