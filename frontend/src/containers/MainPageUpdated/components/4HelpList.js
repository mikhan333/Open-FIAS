/* eslint jsx-a11y/anchor-is-valid : 0 */
/* eslint jsx-a11y/img-redundant-alt : 0 */
import React from 'react';

const HelpList = (props) => (
    <div className="container">
        <div className="row justify-content-center">
            <div className="col-md-8 text-center">
                <h3><b>Помощь c управлением</b></h3>
                <p className="text-muted pt-4">Наш сервис предоставляет два варианта работы, которые очень похожи: <br /> 1) Сначало указываете точку на карте и затем вводите адрес; <br /> 2) Сначало вводите адрес и затем указываете точку на карте. </p>
            </div>
        </div>
        <div className="row mt-1 pt-4">
            <ul className="col list-unstyled list-inline filter-list mb-0 text-uppercase" id="filter">
                <li className="list-inline-item"><a className="active" data-filter="*">Оба</a></li>
                <li className="list-inline-item"><a className="" data-filter=".point">Точка</a></li>
                <li className="list-inline-item"><a className="" data-filter=".address">Адрес</a></li>
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
)

export default HelpList;
