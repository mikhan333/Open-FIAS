import React, { Component } from 'react';

class MainPageUpdated extends Component {
    componentDidMount() {
        // eslint-disable-next-line
        $.ToldApp.init()
    }

    render() {
        return (
            <>
                {/* Loader */}
                <div id="preloader">
                    <div id="status">
                        <div className="spinner">Loading...</div>
                    </div>
                </div>

                {/* Navigation Bar */}
                <header id="topnav" className="defaultscroll fixed-top sticky">
                    <div className="container">
                        {/* Logo container*/}
                        <div>
                            <a href="index.html" className="logo text-uppercase">
                                Told
                            </a>
                        </div>
                        {/* End Logo container*/}
                        <div className="menu-extras">
                            <div className="menu-item">
                                {/* Mobile menu toggle*/}
                                <a className="navbar-toggle">
                                    <div className="lines">
                                        <span></span>
                                        <span></span>
                                        <span></span>
                                    </div>
                                </a>
                                {/* End mobile menu toggle*/}
                            </div>
                        </div>
                        <div id="navigation">
                            {/* Navigation Menu*/}
                            <ul className="navigation-menu">
                                <li className="active">
                                    <a href="#home">Home</a>
                                </li>
                                <li className="">
                                    <a href="#about">About</a>
                                </li>
                                <li className="">
                                    <a href="#service">Services</a>
                                </li>
                                <li className="">
                                    <a href="#work">Work</a>
                                </li>
                                <li className="">
                                    <a href="#client">Client</a>
                                </li>
                                <li className="">
                                    <a href="#team">Team</a>
                                </li>
                                <li className="">
                                    <a href="#blog">Blog</a>
                                </li>
                                <li className="">
                                    <a href="#contact">Contact</a>
                                </li>
                            </ul>
                            {/* End navigation menu*/}
                        </div>
                    </div>
                </header>

                <section className="home-section" id="home">
                    <div id="carouselExampleControls" className="carousel slide" data-ride="carousel">
                        <div className="carousel-inner">
                            <div className="carousel-item active" style={{backgroundImage: 'url(\'images/img-1.jpg\')'}}>
                                <div className="bg-overlay"></div>
                                <div className="home-center">
                                    <div className="home-desc-center">
                                        <div className="container">
                                            <div className="row justify-content-center">
                                                <div className="col-md-12 text-center">
                                                    <p className="text-center home-title">We Are Digital Agency</p>
                                                    <p className="text-center pt-3 home-sub-title mx-auto">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                                                    <div className="watch-video pt-4 mt-1">
                                                        <a href="#" className="btn btn-outline-custom btn-rounded mt-2">Get Started</a>
                                                        <a href="#" className="btn btn-custom btn-rounded mt-2">Learn More</a>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="carousel-item" style={{ backgroundImage: 'url(\'images/img-2.jpg\')'}}>
                                <div className="bg-overlay"></div>
                                <div className="home-center">
                                    <div className="home-desc-center">
                                        <div className="container">
                                            <div className="row justify-content-center">
                                                <div className="col-md-12 text-center">
                                                    <p className="home-title">We Create Awesome Theme</p>
                                                    <p className="pt-3 home-sub-title mx-auto">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                                                    <div className="watch-video pt-4 mt-1">
                                                        <a href="#" className="btn btn-outline-custom btn-rounded mt-2">Get Started</a>
                                                        <a href="#" className="btn btn-custom btn-rounded mt-2">Learn More</a>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="carousel-item" style={{ backgroundImage: 'url(\'images/img-3.jpg\')'}}>
                                <div className="bg-overlay"></div>
                                <div className="home-center">
                                    <div className="home-desc-center">
                                        <div className="container">
                                            <div className="row justify-content-center">
                                                <div className="col-md-12 text-center">
                                                    <p className="home-title">Told Smart Design</p>
                                                    <p className="pt-3 home-sub-title mx-auto">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                                                    <div className="watch-video pt-4 mt-1">
                                                        <a href="#" className="btn btn-outline-custom btn-rounded mt-2">Get Started</a>
                                                        <a href="#" className="btn btn-custom btn-rounded mt-2">Learn More</a>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <a className="carousel-control-prev" href="#carouselExampleControls" role="button" data-slide="prev">
                            <span className="mbri-arrow-prev" aria-hidden="true"></span>
                            <span className="sr-only">Previous</span>
                        </a>
                        <a className="carousel-control-next" href="#carouselExampleControls" role="button" data-slide="next">
                            <span className="mbri-arrow-next" aria-hidden="true"></span>
                            <span className="sr-only">Next</span>
                        </a>
                    </div>
                </section>


                <section className="section" id="about">
                    <div className="container">
                        <div className="row justify-content-center">
                            <div className="col-md-8 text-center">
                                <h3><b>About</b> Us</h3>
                                <p className="text-muted pt-4">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation.</p>
                            </div>
                        </div>
                        <div className="row pt-4 mt-4">
                            <div className="col-lg-4 pt-2">
                                <div className="about-boxed text-center p-2">
                                    <div className="about-icons">
                                        <i className="mdi mdi-database"></i>
                                    </div>
                                    <div className="about-content pt-4">
                                        <h5 className="">Digital Design</h5>
                                        <p className="pt-3 text-muted">Lorem dolor sit amet,tempor sed do eiusmod ut labore et dolore magna aliqua.</p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-4 pt-2">
                                <div className="about-boxed text-center p-2">
                                    <div className="about-icons">
                                        <i className="mdi mdi-radio-tower"></i>
                                    </div>
                                    <div className="about-content pt-4">
                                        <h5 className="">Unlimited Colors</h5>
                                        <p className="pt-3 text-muted text-muted">Lorem dolor sit amet,tempor sed do eiusmod ut labore et dolore magna aliqua.</p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-4 pt-2">
                                <div className="about-boxed text-center p-2">
                                    <div className="about-icons">
                                        <i className="mdi mdi-tune-vertical"></i>
                                    </div>
                                    <div className="about-content pt-4">
                                        <h5 className="">Strategy Solutions</h5>
                                        <p className="pt-3 text-muted">Lorem dolor sit amet,tempor sed do eiusmod ut labore et dolore magna aliqua.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row mt-4 pt-4">
                            <div className="col-md-6">
                                <div className="about-text">
                                    <h3>We are a creative agency</h3>
                                    <div className="about-title-border mt-3"></div>
                                    <p className="text-muted pt-3">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iusto laborum maiores nulla natus a. Aliquid enim dicta veniam eum harum repudiandae doloremque quaerat nobis necessitatibus similique, aut error blanditiis adipisci ab consequatur dolorem ducimus molestiae.</p>
                                    <p className="text-muted">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quis possimus accusantium dignissimos, sit reiciendis recusandae eaque et dolores vero minus, enim a dicta, fugiat cupiditate quasi corporis maiores omnis. Consectetur.</p>
                                    <a href="#" className="btn btn-custom">Read More</a>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="about-border">
                                    <img src="images/about.jpg" alt="" className="img-fluid"/>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>


                {/* FUN-FACTS */}
                <section className="bg-custom pt-5 pb-5">
                    <div className="container">
                        <div className="row justify-content-center" id="counter">
                            <div className="col-md-3 text-white text-center pt-3 pb-3">
                                <h1><span className="counter-value" data-count="1200">10</span> k+</h1>
                                <div className="funfact-border mx-auto mt-3 mb-3"></div>
                                <h5 className="counter-name">Lines Coded</h5>
                            </div>

                            <div className="col-md-3 text-white text-center pt-3 pb-3">
                                <h1><span className="counter-value" data-count="10">1</span> k+</h1>
                                <div className="funfact-border mx-auto mt-3 mb-3"></div>
                                <h5 className="counter-name">Working Hours</h5>
                            </div>

                            <div className="col-md-3 text-white text-center pt-3 pb-3">
                                <h1 className="counter-value" data-count="608">1</h1>
                                <div className="funfact-border mx-auto mt-3 mb-3"></div>
                                <h5 className="counter-name">Completed Projects</h5>
                            </div>

                            <div className="col-md-3 text-white text-center pt-3 pb-3">
                                <h1 className="counter-value" data-count="132">1</h1>
                                <div className="funfact-border mx-auto mt-3 mb-3"></div>
                                <h5 className="counter-name">No. of Clients</h5>
                            </div>
                        </div>
                    </div>
                </section>
                {/* end FUN-FACTS */}



                <section className="section bg-light" id="service">
                    <div className="container">
                        <div className="row justify-content-center">
                            <div className="col-md-8 text-center">
                                <h3>Our <b>Services</b></h3>
                                <p className="text-muted pt-4">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation.</p>
                            </div>
                        </div>
                        <div className="row pt-5">
                            <div className="col-lg-4 mt-3">
                                <div className="service-box clearfix p-4">
                                    <div className="service-icon service-left text-custom"><i className="mbri-code"></i></div>
                                    <div className="service-desc service-left">
                                        <h4>Digital Design</h4>
                                        <p className="text-muted mb-0">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor dolore mag na aliqua.</p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-4 mt-3">
                                <div className="service-box clearfix p-4">
                                    <div className="service-icon service-left text-custom"><i className="mbri-features"></i></div>
                                    <div className="service-desc service-left">
                                        <h4>Unlimited Colors</h4>
                                        <p className="text-muted mb-0">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor dolore mag na aliqua.</p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-4 mt-3">
                                <div className="service-box clearfix p-4">
                                    <div className="service-icon service-left text-custom"><i className="mbri-growing-chart"></i></div>
                                    <div className="service-desc service-left">
                                        <h4>Strategy Solutions</h4>
                                        <p className="text-muted mb-0">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor dolore mag na aliqua.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-lg-4 mt-3">
                                <div className="service-box clearfix p-4">
                                    <div className="service-icon service-left text-custom"><i className="mbri-photos"></i></div>
                                    <div className="service-desc service-left">
                                        <h4>Awesome Support</h4>
                                        <p className="text-muted mb-0">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor dolore mag na aliqua.</p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-4 mt-3">
                                <div className="service-box clearfix p-4">
                                    <div className="service-icon service-left text-custom"><i className="mbri-responsive"></i></div>
                                    <div className="service-desc service-left">
                                        <h4>Truly Multipurpose</h4>
                                        <p className="text-muted mb-0">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor dolore mag na aliqua.</p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-4 mt-3">
                                <div className="service-box clearfix p-4">
                                    <div className="service-icon service-left text-custom"><i className="mbri-download"></i></div>
                                    <div className="service-desc service-left">
                                        <h4>Easy to customize</h4>
                                        <p className="text-muted mb-0">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor dolore mag na aliqua.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>



                {/*Start Work */}
                <section className="section text-center" id="work">
                    <div className="container">
                        <div className="row justify-content-center">
                            <div className="col-md-8 text-center">
                                <h3>Our <b>Work</b></h3>
                                <p className="text-muted pt-4">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation.</p>
                            </div>
                        </div>
                        {/* portfolio menu */}
                        <div className="row mt-1 pt-4">
                            <ul className="col list-unstyled list-inline filter-list mb-0 text-uppercase" id="filter">
                                <li className="list-inline-item"><a className="active" data-filter="*">All</a></li>
                                <li className="list-inline-item"><a className="" data-filter=".seo">Seo</a></li>
                                <li className="list-inline-item"><a className="" data-filter=".webdesign">Webdesign</a></li>
                                <li className="list-inline-item"><a className="" data-filter=".php">Php</a></li>
                                <li className="list-inline-item"><a className="" data-filter=".wordpress">Wordpress</a></li>
                            </ul>
                        </div>
                        {/* End portfolio  */}

                        <div className="row mt-4 pt-4 projects-wrapper">
                            <div className="col-md-4 webdesign wordpress">
                                <div className="item-img">
                                    <img src="images/portfolio/portfolio-1.jpg" alt="image" className="img-fluid"/>
                                        <div className="item-img-overlay">
                                            <a href="images/portfolio/portfolio-1.jpg" className="mfp-image">
                                                <span><i className="mdi mdi-magnify"></i></span>
                                            </a>
                                        </div>
                                </div>
                            </div>

                            <div className="col-md-4 php webdesign seo">
                                <div className="item-img">
                                    <img src="images/portfolio/portfolio-2.jpg" alt="image" className="img-fluid"/>
                                        <div className="item-img-overlay">
                                            <a href="images/portfolio/portfolio-2.jpg" className="mfp-image">
                                                <span><i className="mdi mdi-magnify"></i></span>
                                            </a>
                                        </div>
                                </div>
                            </div>

                            <div className="col-md-4 seo wordpress">
                                <div className="item-img">
                                    <img src="images/portfolio/portfolio-3.jpg" alt="image" className="img-fluid"/>
                                        <div className="item-img-overlay">
                                            <a href="images/portfolio/portfolio-3.jpg" className="mfp-image">
                                                <span><i className="mdi mdi-magnify"></i></span>
                                            </a>
                                        </div>
                                </div>
                            </div>

                            <div className="col-md-4 wordpress php webdesign">
                                <div className="item-img">
                                    <img src="images/portfolio/portfolio-4.jpg" alt="image" className="img-fluid"/>
                                        <div className="item-img-overlay">
                                            <a href="images/portfolio/portfolio-4.jpg" className="mfp-image">
                                                <span><i className="mdi mdi-magnify"></i></span>
                                            </a>
                                        </div>
                                </div>
                            </div>

                            <div className="col-md-4 seo webdesign">
                                <div className="item-img">
                                    <img src="images/portfolio/portfolio-5.jpg" alt="image" className="img-fluid"/>
                                        <div className="item-img-overlay">
                                            <a href="images/portfolio/portfolio-5.jpg" className="mfp-image">
                                                <span><i className="mdi mdi-magnify"></i></span>
                                            </a>
                                        </div>
                                </div>
                            </div>

                            <div className="col-md-4 devlopment webdesign">
                                <div className="item-img">
                                    <img src="images/portfolio/portfolio-6.jpg" alt="image" className="img-fluid"/>
                                        <div className="item-img-overlay">
                                            <a href="images/portfolio/portfolio-6.jpg" className="mfp-image">
                                                <span><i className="mdi mdi-magnify"></i></span>
                                            </a>
                                        </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                {/*End Work */}



                <section className="section testimonial bg-light" id="client">
                    <div className="container">
                        <div className="row justify-content-center">
                            <div className="col-lg-8">
                                <div className="quote text-center text-custom">
                                    <span className="quote-mark">&#8220;</span>
                                    Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam!
                                </div>
                                <div className="author text-center mt-4">
                                    <img src="images/testi/image-1.png" alt="" className="rounded-circle" />
                                    <span className="name font-weight-bold">
                                Jessica Williams
                                <span className="company">
                                    Apple, Inc.
                                </span>
                            </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="section" id="team">
                    <div className="container">
                        <div className="row justify-content-center">
                            <div className="col-md-8 text-center">
                                <h3>Our <b>Team</b></h3>
                                <p className="text-muted pt-4">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation.</p>
                            </div>
                        </div>
                        <div className="row mt-4 pt-4">
                            <div className="col-md-4">
                                <div className="team-box text-center p-4">
                                    <div>
                                        <img src="images/team/image-1.png" alt="" className="img-fluid rounded-circle mx-auto d-block"/>
                                    </div>
                                    <div className="team-content pt-4">
                                        <h6 className="mb-2 font-weight-bold">Sammie R. Provencal</h6>
                                        <p className="text-muted team-work">CEO / Founder</p>
                                        <p className="text-muted">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do or incididunt ut labore et.</p>
                                        <ul className="list-inline team-social mt-4">
                                            <li className="list-inline-item"><a href="#"><i className="mdi mdi-facebook"></i></a></li>
                                            <li className="list-inline-item"><a href="#"><i className="mdi mdi-google"></i></a></li>
                                            <li className="list-inline-item"><a href="#"><i className="mdi mdi-twitter"></i></a></li>
                                            <li className="list-inline-item"><a href="#"><i className="mdi mdi-instagram"></i></a></li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="team-box text-center p-4">
                                    <div>
                                        <img src="images/team/image-2.png" alt="" className="img-fluid rounded-circle mx-auto d-block"/>
                                    </div>
                                    <div className="team-content pt-4">
                                        <h6 className="mb-2 font-weight-bold">Edith E. Wheeler</h6>
                                        <p className="text-muted team-work">CTO/Co-Founder</p>
                                        <p className="text-muted">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do or incididunt ut labore et.</p>
                                        <ul className="list-inline team-social mt-4">
                                            <li className="list-inline-item"><a href="#"><i className="mdi mdi-facebook"></i></a></li>
                                            <li className="list-inline-item"><a href="#"><i className="mdi mdi-google"></i></a></li>
                                            <li className="list-inline-item"><a href="#"><i className="mdi mdi-twitter"></i></a></li>
                                            <li className="list-inline-item"><a href="#"><i className="mdi mdi-instagram"></i></a></li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="team-box text-center p-4">
                                    <div>
                                        <img src="images/team/image-3.png" alt="" className="img-fluid rounded-circle mx-auto d-block"/>
                                    </div>
                                    <div className="team-content pt-4">
                                        <h6 className="mb-2 font-weight-bold">Pauline T. Roach</h6>
                                        <p className="text-muted team-work">Web Designer</p>
                                        <p className="text-muted">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do or incididunt ut labore et.</p>
                                        <ul className="list-inline team-social mt-4">
                                            <li className="list-inline-item"><a href="#"><i className="mdi mdi-facebook"></i></a></li>
                                            <li className="list-inline-item"><a href="#"><i className="mdi mdi-google"></i></a></li>
                                            <li className="list-inline-item"><a href="#"><i className="mdi mdi-twitter"></i></a></li>
                                            <li className="list-inline-item"><a href="#"><i className="mdi mdi-instagram"></i></a></li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>



                <section className="section bg-light" id="blog">
                    <div className="container">
                        <div className="row justify-content-center">
                            <div className="col-md-8 text-center">
                                <h3>Our <b>Blog</b></h3>
                                <p className="text-muted pt-4">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation.</p>
                            </div>
                        </div>
                        <div className="row mt-5 pt-4">
                            <div className="col-md-6">
                                <div className="blog-box bg-white mb-4">
                                    <div className="row vertical-content">
                                        <div className="col-sm-5">
                                            <div className="blog-image" style={{ background: "url('images/blog/img-1.jpg') center center / cover no-repeat" }}>
                                            </div>
                                        </div>
                                        <div className="col-sm-7">
                                            <div className="blog-content">
                                                <div className="">
                                                    <p className="text-muted blog-name mb-1"><small>Rock - By Robert</small></p>
                                                    <h6 className="font-weight-bold"><a href="#" className="text-dark">Lorem ipsum dolor sit amet...</a></h6>
                                                    <p className="text-muted blog-desc mb-2 pt-2">Lorem ipsum dolor sit amet, adipisicing elit, sed do eiusmod tempor.</p>
                                                    <a href="#" className="text-custom">Read more..</a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="blog-box bg-white mb-4">
                                    <div className="row vertical-content">
                                        <div className="col-sm-5">
                                            <div className="blog-image" style={{ background: "url('images/blog/img-2.jpg') center center / cover no-repeat"}}>
                                            </div>
                                        </div>
                                        <div className="col-sm-7">
                                            <div className="blog-content">
                                                <div className="">
                                                    <p className="text-muted blog-name mb-1"><small>Rock - By Robert</small></p>
                                                    <h6 className="font-weight-bold"><a href="#" className="text-dark">Lorem ipsum dolor sit amet...</a></h6>
                                                    <p className="text-muted blog-desc mb-2 pt-2">Lorem ipsum dolor sit amet, adipisicing elit, sed do eiusmod tempor.</p>
                                                    <a href="#" className="text-custom">Read more..</a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-6">
                                <div className="blog-box bg-white mb-4">
                                    <div className="row vertical-content">
                                        <div className="col-sm-5">
                                            <div className="blog-image" style={{background: "url('images/blog/img-3.jpg') center center / cover no-repeat"}}>
                                            </div>
                                        </div>
                                        <div className="col-sm-7">
                                            <div className="blog-content">
                                                <div className="">
                                                    <p className="text-muted blog-name mb-1"><small>Rock - By Robert</small></p>
                                                    <h6 className="font-weight-bold"><a href="#" className="text-dark">Lorem ipsum dolor sit amet...</a></h6>
                                                    <p className="text-muted blog-desc mb-2 pt-2">Lorem ipsum dolor sit amet, adipisicing elit, sed do eiusmod tempor.</p>
                                                    <a href="#" className="text-custom">Read more..</a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="blog-box bg-white mb-4">
                                    <div className="row vertical-content">
                                        <div className="col-sm-5">
                                            <div className="blog-image" style={{ background: "url('images/blog/img-4.jpg') center center / cover no-repeat"}}>
                                            </div>
                                        </div>
                                        <div className="col-sm-7">
                                            <div className="blog-content">
                                                <div className="">
                                                    <p className="text-muted blog-name mb-1"><small>Rock - By Robert</small></p>
                                                    <h6 className="font-weight-bold"><a href="#" className="text-dark">Lorem ipsum dolor sit amet...</a></h6>
                                                    <p className="text-muted blog-desc mb-2 pt-2 ">Lorem ipsum dolor sit amet, adipisicing elit, sed do eiusmod tempor.</p>
                                                    <a href="#" className="text-custom">Read more..</a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <footer className="section footer bg-light">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-3">
                                <h6 className="text-uppercase footer-title">Told</h6>
                                <ul className="list-unstyled mt-4 footer-list">
                                    <li>
                                        <a href="#">About Company</a>
                                    </li>
                                    <li>
                                        <a href="#">Our Team</a>
                                    </li>
                                    <li>
                                        <a href="#">Locations</a>
                                    </li>
                                    <li>
                                        <a href="#">History</a>
                                    </li>
                                    <li>
                                        <a href="#">Work With Us</a>
                                    </li>
                                </ul>
                            </div>
                            <div className="col-md-3">
                                <h6 className="text-uppercase footer-title">Developers</h6>
                                <ul className="list-unstyled mt-4 footer-list">
                                    <li>
                                        <a href="#">Developer Center</a>
                                    </li>
                                    <li>
                                        <a href="#">API Reference</a>
                                    </li>
                                    <li>
                                        <a href="#">Downloads</a>
                                    </li>
                                    <li>
                                        <a href="#">Tools</a>
                                    </li>
                                    <li>
                                        <a href="#">Developer Blog</a>
                                    </li>
                                    <li>
                                        <a href="#">Developer Forums</a>
                                    </li>
                                </ul>
                            </div>
                            <div className="col-md-3">
                                <h6 className="text-uppercase footer-title">Support</h6>
                                <ul className="list-unstyled mt-4 footer-list">
                                    <li>
                                        <a href="#">Help Center</a>
                                    </li>
                                    <li>
                                        <a href="#">Live Chat</a>
                                    </li>
                                    <li>
                                        <a href="#">Downloads</a>
                                    </li>
                                    <li>
                                        <a href="#">Press Kit</a>
                                    </li>
                                </ul>
                            </div>
                            <div className="col-md-3">
                                <h6 className="text-uppercase footer-title">Locations</h6>
                                <ul className="list-unstyled mt-4 footer-list">
                                    <li>
                                        <a href="#">Melbourne</a>
                                    </li>
                                    <li>
                                        <a href="#">London</a>
                                    </li>
                                    <li>
                                        <a href="#">New York</a>
                                    </li>
                                    <li>
                                        <a href="#">San Francisco</a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-sm-6 pt-4">
                        <span className="copyright-alt">&copy;
                            2017 - 2018 Zoyothemes.</span>&nbsp;&nbsp;
                                <a className="copyright-alt" href="#">Privacy Policy</a>&nbsp;&nbsp;
                                <a className="copyright-alt" href="#">Legal</a>
                            </div>
                            <div className="col-sm-6 text-right text-left-sm pt-4">
                                <ul className="social-icon list-unstyled list-inline mb-0">
                                    <li className="list-inline-item">
                                        <a href="#"><i className="mdi mdi-google icon icon--xs"></i></a>
                                    </li>
                                    <li className="list-inline-item">
                                        <a href="#"><i className="mdi mdi-twitter icon icon--xs"></i></a>
                                    </li>
                                    <li className="list-inline-item">
                                        <a href="#"><i className="mdi mdi-facebook icon icon--xs"></i></a>
                                    </li>
                                    <li className="list-inline-item">
                                        <a href="#"><i className="mdi mdi-instagram icon icon--xs"></i></a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </footer>
            </>
        )
    }
}

export default MainPageUpdated;