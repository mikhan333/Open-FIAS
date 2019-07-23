/* eslint jsx-a11y/anchor-is-valid : 0 */
import React from 'react';
import TranslatableText from "../../../components/LanguageProvider/LanguageTranslater";

const AboutList = (props) => (
    <div className="container">
        <div className="row justify-content-center">
            <div className="col-md-8 text-center">
                <h3><b>
                    <TranslatableText
                        dictionary={{
                            russian: "О нашем сайте",
                            english: "About our site"
                        }}
                    />
                </b></h3>
                <p className="text-muted pt-4">
                    <TranslatableText
                        dictionary={{
                            russian: "Этот сервис создан чтобы каждый мог внести свой вклад в развитие мировых карт.",
                            english: "This service is created so that everyone can contribute to the development of world maps."
                        }}
                    /> <br/>
                    <TranslatableText
                        dictionary={{
                            russian: "Вливайтесь в работу с нами.",
                            english: "Join the work with us."
                        }}
                    />
                </p>
            </div>
        </div>
        <div className="row pt-4 mt-4">
            <div className="col-lg-4 pt-2">
                <div className="about-boxed text-center p-2">
                    <div className="about-icons">
                        <i className="mdi mdi-radio-tower"></i>
                    </div>
                    <div className="about-content pt-4">
                        <h5 className="">
                            <TranslatableText
                                dictionary={{
                                    russian: "Геокодирование - просто",
                                    english: "Geocoding is easy"
                                }}
                            />
                        </h5>
                        <p className="pt-3 text-muted text-muted">
                            <TranslatableText
                                dictionary={{
                                    russian: "Геокодирование ещё никогда",
                                    english: "Geocoding has never"
                                }}
                            /><br/>
                            <TranslatableText
                                dictionary={{
                                    russian: "не было таким простым!",
                                    english: "so been easier!"
                                }}
                            />
                        </p>
                    </div>
                </div>
            </div>
            <div className="col-lg-4 pt-2">
                <div className="about-boxed text-center p-2">
                    <div className="about-icons">
                        <i className="mdi mdi-tune-vertical"></i>
                    </div>
                    <div className="about-content pt-4">
                        <h5>
                            <TranslatableText
                                dictionary={{
                                    russian: "Улучшайте карты",
                                    english: "Upgrade maps"
                                }}
                            />
                        </h5>
                        <p className="pt-3 text-muted">
                            <TranslatableText
                                dictionary={{
                                    russian: "Улучшайте карты с миллионами",
                                    english: "Improve maps with millions"
                                }}
                            /><br/>
                            <TranslatableText
                                dictionary={{
                                    russian: "других людей.",
                                    english: "of other people."
                                }}
                            />
                        </p>
                    </div>
                </div>
            </div>
            <div className="col-lg-4 pt-2">
                <div className="about-boxed text-center p-2">
                    <div className="about-icons">
                        <i className="mdi mdi-tune-vertical"></i>
                    </div>
                    <div className="about-content pt-4">
                        <h5 className="">
                            <TranslatableText
                                dictionary={{
                                    russian: "Начни сейчас",
                                    english: "Start now"
                                }}
                            />
                        </h5>
                        <p className="pt-3 text-muted">
                            <TranslatableText
                                dictionary={{
                                    russian: "С нашим ресурсом вы можете",
                                    english: "With our resource"
                                }}
                            /><br/>
                            <TranslatableText
                                dictionary={{
                                    russian: "начать прямо сейчас.",
                                    english: "you can start right now."
                                }}
                            />
                        </p>
                    </div>
                </div>
            </div>
        </div>
        <div className="row mt-4 pt-4">
            <div className="col-md-6">
                <div className="about-text">
                    <h3>
                        <TranslatableText
                            dictionary={{
                                russian: "Присоединяйся к нам!",
                                english: "Join us!"
                            }}
                        />
                    </h3>
                    <div className="about-title-border mt-3"></div>
                    <p className="text-muted pt-3">
                        <TranslatableText
                            dictionary={{
                                russian: "Геокодирование это процесс назначения географических координат объектам карты и записям данных. Сегодня как никогда мы нуждаемся в улучшение мировых карт.",
                                english: "Geocoding is the process of assigning geographical coordinates to map objects and data records. Today, more than ever, we need better world maps."
                            }}
                        />
                    </p>
                    <p className="text-muted">
                        <TranslatableText
                            dictionary={{
                                russian: "Вместе мы можем преодолеть все трудности и загеокодировать все известные места! Присоединяйся к огромному комьюнити волонтеров и давай улучшать карты вместе.",
                                english: "Together we can overcome all difficulties and code all known places! Join the huge volunteer community and let's improve the maps together."
                            }}
                        />
                    </p>
                    <a onClick={ () => props.history.push('/add_point') } className="btn btn-custom">
                        <TranslatableText
                            dictionary={{
                                russian: "Начать!",
                                english: "Start!"
                            }}
                        />
                    </a>
                </div>
            </div>
            <div className="col-md-6">
                <div className="about-border">
                    <img src="images/Img_About.jpg" alt="" className="img-fluid" />
                </div>
            </div>
        </div>
    </div>
);

export default AboutList;
