import React, { useState } from 'react';
import Slider from "react-slick";

import classes from './index.module.css';
import "./index.css";

import MAPSPicture from '../../static/mainMapsGeocod.png';
import HelperPicture from '../../static/helper/helper2.png';
import HelperPicture11 from '../../static/helper/helperPicture11.png';
import HelperPicture13 from '../../static/helper/helperPicture13.png';
import { Button, Row, Col } from "react-bootstrap";
import { CSSTransition } from 'react-transition-group';

class HelperSlider extends React.Component {
    render() {
        var pictComp = this.props.pictures.map((picture) =>
            <div>
                <img src={picture} className={classes.HelperImages} alt='' key={picture.id} />
            </div>
        )
        var settings = {
            dots: true,
            infinite: true,
            slidesToShow: 1,
            slidesToScroll: 1,
        };
        return (
            <div className="container" id={this.props.id}>
                <Slider {...settings} className={classes.Slider}>
                    {pictComp}
                </Slider>
            </div>
        );
    }
}

const HelperPage = (props) => {
    const [showTopDef, setShowTopDef] = useState(true);
    const [showBotDef, setShowBotDef] = useState(true);
    const [showTopNew, setShowTopNew] = useState(false);
    const [showBotNew, setShowBotNew] = useState(false);

    const time = 300;

    let buttonTop =
        <Button variant="dark" onClick={() => setShowBotDef(false)}>
            Подробнее
        </Button>;
    if (!showBotDef) {
        buttonTop =
            <Button variant="dark" onClick={() => setShowBotNew(false)}>
                Скрыть
            </Button>;
    }
    let contentTop =
        <div className={classes.Section2Top}>
            <Row>
                <Col sm={{ span: 3, offset: 2 }}>
                    <img src={HelperPicture} className={classes.MAPSPicture} alt='' />
                </Col>
                <Col sm={{ span: 4, offset: 1 }}>
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
                    <Button variant="success" onClick={() => props.link.push('/add_point')} style={{ marginRight: '5px', }}>
                        Попробовать
                    </Button>
                    { buttonTop }
                </Col>
            </Row>
        </div>;

    let buttonBot =
        <Button variant="dark" onClick={() => setShowTopDef(false)}>
            Подробнее
        </Button>;
    if (!showTopDef) {
        buttonBot =
            <Button variant="dark" onClick={() => setShowTopNew(false)}>
                Скрыть
            </Button>;
    }
    let contentBot =
        <div className={classes.Section2Bot}>
            <Row>
                <Col sm={{ span: 4, offset: 2 }}>
                    <h4 className={classes.TextStyleHead}>
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
                    <Button variant="success" onClick={() => this.props.link.push('/add_point')} style={{ marginRight: '5px', }}>
                        Попробовать
                    </Button>
                    {buttonBot}
                </Col>
                <Col sm={{ span: 3, offset: 1 }}>
                    <img src={MAPSPicture} className={classes.MAPSPicture} alt='' />
                </Col>
            </Row>
        </div>;

    let contentBot2, contentTop2;
    var pictures;
    pictures = [HelperPicture13, HelperPicture13, HelperPicture13];
    contentTop2 =
        <div className={classes.Section2TopAddit}>
            <Row>
                <Col sm={{ span: 3, offset: 2 }}>
                    <h4 className={classes.TextStyleHead}>
                        Последовательность в скриншотах
                            </h4>
                </Col>
                <Col sm={{ span: 6 }}>
                    <HelperSlider pictures={pictures} id="top-slider" />
                </Col>
            </Row>
        </div>;

    pictures = [HelperPicture11, HelperPicture11, HelperPicture11];
    contentBot2 =
        <div className={classes.Section2BotAddit}>
            <Row>
                <Col sm={{ span: 3, offset: 2 }}>
                    <h4 className={classes.TextStyleHead}>
                        Последовательность в скриншотах
                            </h4>
                </Col>
                <Col sm={{ span: 6 }}>
                    <HelperSlider pictures={pictures} id="bot-slider" />
                </Col>
            </Row>
        </div>;

    return (
        <div className={classes.Section2}>
            <CSSTransition
                in={showTopDef}
                timeout={time}
                classNames="anim"
                unmountOnExit
                onExited={() => setShowTopNew(true)}
            >
                {contentTop}
            </CSSTransition>
            <CSSTransition
                in={showTopNew}
                timeout={time}
                classNames="anim"
                unmountOnExit
                onExited={() => setShowTopDef(true)}
            >
                {contentTop2}
            </CSSTransition>

            <CSSTransition
                in={showBotDef}
                timeout={time}
                classNames="anim"
                unmountOnExit
                onExited={() => setShowBotNew(true)}
            >
                {contentBot}
            </CSSTransition>
            <CSSTransition
                in={showBotNew}
                timeout={time}
                classNames="anim"
                unmountOnExit
                onExited={() => setShowBotDef(true)}
            >
                {contentBot2}
            </CSSTransition>
        </div>
    );
}

export default HelperPage;
