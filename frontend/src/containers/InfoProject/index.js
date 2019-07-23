import React, { Component } from 'react'
import { Container, Row, Col, Card } from "react-bootstrap"

import classes from './index.module.css'
import TranslatableText from "../../components/LanguageProvider/LanguageTranslater";

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
                            <h4>
                                <TranslatableText
                                    dictionary={{
                                        russian: "Этот сервис создан чтобы каждый мог внести свой вклад в развитие мировых карт",
                                        english: "This service is created so that everyone can contribute to the development of world maps."
                                    }}
                                />
                            </h4><br/>
                            <h4>
                                <TranslatableText
                                    dictionary={{
                                        russian: "И при этом чтобы вы не беспокоились о том, как это происходит ",
                                        english: "And so that you do not worry about how this happens"
                                    }}
                                /> &mdash;
                                <TranslatableText
                                    dictionary={{
                                        russian: " просто наслаждайтесь.",
                                        english: " just enjoy"
                                    }}
                                />
                            </h4><br/>
                            <h4>
                                <TranslatableText
                                    dictionary={{
                                        russian: "И улучшайте карты вместе с нами",
                                        english: "And improve the cards with us"
                                    }}
                                />
                            </h4><br/>
                            <br/>
                            <h5>
                                <TranslatableText
                                    dictionary={{
                                        russian: "Этот ресурс сделан при поддержки сервиса ",
                                        english: "This resource is made with the support of "
                                    }}
                                />
                                <a href="https://maps.me" target="_blank" rel="noopener noreferrer">maps.me</a>
                            </h5>
                        </div>
                    </Card>
                    </Col>
                </Row>
            </Container>
        )
    }
}

export default InfoProject;