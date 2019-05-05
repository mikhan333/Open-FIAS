import React, { Component } from 'react';
import Slider from "react-slick";

import classes from './index.module.css'

import MAPSPicture from '../../static/mainMapsGeocod.png';
import HelperPicture from '../../static/helper/helper2.png';
import HelperPicture11 from '../../static/helper/helperPicture11.png';
import HelperPicture13 from '../../static/helper/helperPicture13.png';
import { Button, Row, Col } from "react-bootstrap";

class HelperSlider extends React.Component {
    render() {
        var pictComp = this.props.pictures.map((picture) => 
            <div>
                <img src={ picture } className={ classes.HelperImages } alt='' key={ picture.id }/>
            </div>
        )
        var settings = {
            dots: true,
            infinite: true,
            slidesToShow: 1,
            slidesToScroll: 1,
        };
        return (
            <div className="container">
                <Slider {...settings} className={ classes.Slider }>
                    { pictComp }
                </Slider>
            </div>
        );
    }
}

export default class HelperPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showBot: false,
            showTop: false,
        };

        this.handleClick = this.handleClick.bind(this)
    }

    handleClick(variant) {
        if (variant === 'top') {
            this.setState({
                showTop: !this.state.showTop
            })
        }
        else {
            this.setState({
                showBot: !this.state.showBot
            })
        }
    }

    render() {
        let contentTop = 
            <Row>
                <Col sm={{ span: 3, offset: 1 }}>
                    <img src={ HelperPicture } className={classes.MAPSPicture} alt='' />
                </Col>
                <Col sm={{ span: 6, offset: 1 }}>
                    <h4 className={classes.TextStyleHead}>
                        Если вы знаете адрес или название объекта
                    </h4>
                    <div>
                        <ul>
                            <li>
                                Введите название объекта в нужное поле
                            </li>
                            <li>
                                Выберите объект из предоставленного списка
                            </li>
                            <li>
                                Найдите объект на карте
                            </li>
                            <li>
                                Закончите, нажав кнопку "далее"
                            </li>
                        </ul>
                    </div>
                    <Button variant="success" onClick={ () => this.props.link.push('/add_point') } style={{ marginRight: '5px', }}>
                        Попробовать
                    </Button>
                    <Button variant="dark" onClick={ () => this.handleClick('bot') }>
                        { !this.state.showBot ? 'Подробнее' : 'Скрыть' }
                    </Button>
                </Col>
            </Row>

        let contentBot = 
            <Row>
                <Col sm={{ span: 5, offset: 1 }}>
                    <h4 className={ classes.TextStyleHead }>
                        Если вы знаете положение объекта
                    </h4>
                    <div>
                        <ul>
                            <li>
                                Найдите объект на карте
                            </li>
                            <li>
                                После этого введите название
                            </li>
                            <li>
                                Выберите корректное название
                            </li>
                            <li>
                                Закончите, нажав кнопку "далее"
                            </li>
                        </ul>
                    </div>
                    <Button variant="success" onClick={ () => this.props.link.push('/add_point') } style={{ marginRight: '5px', }}>
                        Попробовать
                    </Button>
                    <Button variant="dark" onClick={ () => this.handleClick('top') }>
                        { !this.state.showTop ? 'Подробнее' : 'Скрыть' }
                    </Button>
                </Col>
                <Col sm={{ span: 3, offset: 1 }}>
                    <img src={MAPSPicture} className={classes.MAPSPicture} alt='' />
                </Col>
            </Row>

        var pictures;
        if (this.state.showTop) {
            pictures = [ HelperPicture13, HelperPicture13, HelperPicture13 ]
            contentTop = 
                <Row>
                    <Col sm={{ span: 3, offset: 1 }}>
                        <h4 className={classes.TextStyleHead}>
                            Последовательность в скриншотах
                        </h4>
                    </Col>
                    <Col sm={{ span: 6 }}>
                        <HelperSlider pictures={ pictures }/>
                    </Col>
                </Row>
        }

        if (this.state.showBot) {
            pictures = [ HelperPicture11, HelperPicture11, HelperPicture11 ]
            contentBot = 
                <Row>
                    <Col sm={{ span: 3, offset: 1 }}>
                        <h4 className={classes.TextStyleHead}>
                            Последовательность в скриншотах
                        </h4>
                    </Col>
                    <Col sm={{ span: 6 }}>
                        <HelperSlider pictures={ pictures }/>
                    </Col>
                </Row>
        }

        return (
            <div className={classes.Section2}>
                <div className={classes.Section2Top} style={{ backgroundColor: this.state.showTop ? '#737373' : '#eeeeee', }}>
                    { contentTop }
                </div>
                <div className={ classes.Section2Bot } style={{ backgroundColor: this.state.showBot ? '#eeeeee' : '#737373', }}>
                    { contentBot }
                </div>
            </div>
        )
    }
}
