import React from 'react';

const AboutList = (props) => (
    <div className="container">
        <div className="row justify-content-center">
            <div className="col-md-8 text-center">
                <h3><b>О нашем сайте</b></h3>
                <p className="text-muted pt-4">Этот сервис создан чтобы каждый мог внести свой вклад в развитие мировых карт. <br/> Вливайтесь в работу с нами.</p>
            </div>
        </div>
        <div className="row pt-4 mt-4">
            <div className="col-lg-4 pt-2">
                <div className="about-boxed text-center p-2">
                    <div className="about-icons">
                        <i className="mdi mdi-radio-tower"></i>
                    </div>
                    <div className="about-content pt-4">
                        <h5 className="">Геокодирование - просто</h5>
                        <p className="pt-3 text-muted text-muted">Геокодирование ещё никогда<br/> не было таким простым!</p>
                    </div>
                </div>
            </div>
            <div className="col-lg-4 pt-2">
                <div className="about-boxed text-center p-2">
                    <div className="about-icons">
                        <i className="mdi mdi-tune-vertical"></i>
                    </div>
                    <div className="about-content pt-4">
                        <h5 className="">Улучшайте карты</h5>
                        <p className="pt-3 text-muted">Улучшайте карты с миллионами<br/> других людей.</p>
                    </div>
                </div>
            </div>
            <div className="col-lg-4 pt-2">
                <div className="about-boxed text-center p-2">
                    <div className="about-icons">
                        <i className="mdi mdi-tune-vertical"></i>
                    </div>
                    <div className="about-content pt-4">
                        <h5 className="">Начни сейчас</h5>
                        <p className="pt-3 text-muted">С нашим ресурсом вы можете<br/> начать прямо сейчас.</p>
                    </div>
                </div>
            </div>
        </div>
        <div className="row mt-4 pt-4">
            <div className="col-md-6">
                <div className="about-text">
                    <h3>Присоединяйся к нам!</h3>
                    <div className="about-title-border mt-3"></div>
                    <p className="text-muted pt-3">Геокодирование это процесс назначения географических координат объектам карты и записям данных. Сегодня как никогда мы нуждаемся в улучшение мировых карт.</p>
                    <p className="text-muted">Вместе мы можем преодолеть все трудности и загеокодировать все известные места! Присоединяйся к огромному комьюнити волонтеров и давай улучшать карты вместе.</p>
                    <a href="add_point" className="btn btn-custom">Начать!</a>
                </div>
            </div>
            <div className="col-md-6">
                <div className="about-border">
                    <img src="images/Img_About.jpg" alt="" className="img-fluid" />
                </div>
            </div>
        </div>
    </div>
)

export default AboutList;
