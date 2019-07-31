/* eslint jsx-a11y/anchor-is-valid : 0 */
/* eslint jsx-a11y/img-redundant-alt : 0 */
import React from 'react';
import TranslatableText from "../../../components/LanguageProvider/LanguageTranslater";

const HelpList = (props) => (
    <div className="container">
        <div className="row justify-content-center">
            <div className="col-md-8 text-center">
                <h3><b>
                    <TranslatableText
                        dictionary={{
                            russian: "Помощь с управлением",
                            english: "Help"
                        }}
                    />
                </b></h3>
                <p className="text-muted pt-4">
                    <TranslatableText
                        dictionary={{
                            russian: "Наш сервис предоставляет два варианта работы, которые очень похожи:",
                            english: "Our service provides two options for work that are very similar:"
                        }}
                    /><br />
                    <TranslatableText
                        dictionary={{
                            russian: "1) Сначала указываете точку на карте и затем вводите адрес",
                            english: "1) First indicate the point on the map and then enter the address"
                        }}
                    /><br/>
                    <TranslatableText
                        dictionary={{
                            russian: "2) Сначала вводите адрес и затем указываете точку на карте",
                            english: "2) First enter the address and then indicate the point on the map."
                        }}
                    />
                </p>
            </div>
        </div>
        <div className="row mt-1 pt-4">
            <ul className="col list-unstyled list-inline filter-list mb-0 text-uppercase" id="filter">
                <li className="list-inline-item"><a className="active" data-filter=".point">
                    <TranslatableText
                        dictionary={{
                            russian: "1) Точка",
                            english: "Point first"
                        }}
                    />
                </a></li>
                <li className="list-inline-item"><a className="" data-filter=".address">
                    <TranslatableText
                        dictionary={{
                            russian: "2) Адрес",
                            english: "Address first"
                        }}
                    />
                </a></li>
            </ul>
        </div>

        <div className="row mt-4 pt-4 projects-wrapper">
            <div className="col-md-4 point">
                <div className="item-img">
                    <img src="images/portfolio/point1.png" alt="image" className="img-fluid" />
                    <div className="item-img-overlay">
                        <a href="images/portfolio/point1.png" className="mfp-image">
                            <span><i className="mdi mdi-magnify"></i></span>
                        </a>
                    </div>
                </div>
            </div>

            <div className="col-md-4 point">
                <div className="item-img">
                    <img src="images/portfolio/point2.png" alt="image" className="img-fluid" />
                    <div className="item-img-overlay">
                        <a href="images/portfolio/point2.png" className="mfp-image">
                            <span><i className="mdi mdi-magnify"></i></span>
                        </a>
                    </div>
                </div>
            </div>

            <div className="col-md-4 point">
                <div className="item-img">
                    <img src="images/portfolio/point3.png" alt="image" className="img-fluid" />
                    <div className="item-img-overlay">
                        <a href="images/portfolio/point3.png" className="mfp-image">
                            <span><i className="mdi mdi-magnify"></i></span>
                        </a>
                    </div>
                </div>
            </div>

            <div className="col-md-4 address">
                <div className="item-img">
                    <img src="images/portfolio/address1.png" alt="image" className="img-fluid" />
                    <div className="item-img-overlay">
                        <a href="images/portfolio/address1.png" className="mfp-image">
                            <span><i className="mdi mdi-magnify"></i></span>
                        </a>
                    </div>
                </div>
            </div>

            <div className="col-md-4 address">
                <div className="item-img">
                    <img src="images/portfolio/address2.png" alt="image" className="img-fluid" />
                    <div className="item-img-overlay">
                        <a href="images/portfolio/address2.png" className="mfp-image">
                            <span><i className="mdi mdi-magnify"></i></span>
                        </a>
                    </div>
                </div>
            </div>

            <div className="col-md-4 address">
                <div className="item-img">
                    <img src="images/portfolio/address3.png" alt="image" className="img-fluid" />
                    <div className="item-img-overlay">
                        <a href="images/portfolio/address3.png" className="mfp-image">
                            <span><i className="mdi mdi-magnify"></i></span>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </div>
);

export default HelpList;
