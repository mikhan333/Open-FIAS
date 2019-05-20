import React from 'react';
import TranslatableText from "../../../components/LanguageProvider/LanguageTranslater";

const MainList = (props) => (
    <div id="carouselExampleControls" className="carousel slide" data-ride="carousel">
        <div className="carousel-inner">
            <div className="carousel-item active" style={{ backgroundImage: 'url(\'images/Img-1_Main.jpg\')' }}>
                <div className="bg-overlay"></div>
                <div className="home-center">
                    <div className="home-desc-center">
                        <div className="container">
                            <div className="row justify-content-center">
                                <div className="col-md-12 text-center">
                                    <p className="text-center home-title">Open-FIAS</p>
                                    <p className="text-center pt-3 home-sub-title mx-auto">
                                        <TranslatableText
                                            dictionary={{
                                                russian: "Геокодирование это просто и легко",
                                                english: "Geocoding is simple and easy."
                                            }}
                                        />
                                    </p>
                                    <div className="watch-video pt-4 mt-1 navigation-menu">
                                        <button onClick={ () => props.history.push('/add_point') } className="btn btn-outline-custom btn-rounded mt-2">
                                            <TranslatableText
                                                dictionary={{
                                                    russian: "Начать",
                                                    english: "Start"
                                                }}
                                            />
                                        </button>
                                        <a href="#help" className="btn btn-custom btn-rounded mt-2">
                                            <TranslatableText
                                                dictionary={{
                                                    russian: "Что делать?",
                                                    english: "How to use?"
                                                }}
                                            />
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
)

export default MainList;
