import React, { Component } from 'react'
import { Container, Row, Col, Table, Card, Image } from "react-bootstrap"

import classes from './index.module.css'

class InfoProject extends Component {
    render() {
        return(
            <Container fluid>
                <Row>
                    <Col 
                        xl={{ span: 8, offset: 2 }} 
                        lg={{ span: 10, offset: 1 }} 
                        md={12}
                        xs="auto" 
                    >
                    <Card className={ classes.InfoCard }>
                        <div className={ classes.Content }>
                            <h3>Open-FIAS</h3>
                            <br/><br/>
                            <h4>Этот сервис создан чтобы каждый мог внести свой вклад в развитие мировых карт</h4><br/>
                            <h4>И при этом чтобы вы не беспокоились о том, как это происходит &mdash; просто наслаждайтесь</h4><br/>
                            <h4>И улучшайте карты вместе с нами</h4><br/>
                            <br/><h5>Этот ресурс сделан при поддержки сервисов maps.me и openstreetmap</h5>
                        </div>
                    </Card>
                    </Col>
                </Row>
            </Container>
        )
    }
}

export default InfoProject;