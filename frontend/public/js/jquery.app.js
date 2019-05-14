/* Theme Name: Told - Onepage Multipurpose Template
   Author: ZoyoThemes
   Version: 1.0.0
   Created: December 2017
   File Description: Main JS file of the template
*/

! function($) {
    "use strict";

    var ToldApp = function() {};

    //scroll
    ToldApp.prototype.initNavbarStickey = function() {
        $(window).scroll(function() {
            var scroll = $(window).scrollTop();
            if (scroll >= 50) {
                $(".sticky").addClass("darkheader");
            } else {
                $(".sticky").removeClass("darkheader");
            }
        });
    },

    ToldApp.prototype.initSmoothLink = function() {
        $('.navigation-menu a').on('click', function(event) {
            var $anchor = $(this);
            $('html, body').stop().animate({
                scrollTop: $($anchor.attr('href')).offset().top - 0
            }, 1500, 'easeInOutExpo');
            event.preventDefault();
        });
    },

    ToldApp.prototype.initNavbarToggler = function() {
        var scroll = $(window).scrollTop();

        $('.navbar-toggle').on('click', function(event) {
            $(this).toggleClass('open');
            $('#navigation').slideToggle(400);
        });

        $('.navigation-menu>li').slice(-2).addClass('last-elements');
    },

    ToldApp.prototype.initTestimonialSlider = function() {
        $("#owl-demo").owlCarousel({
            autoPlay: 3000,
            stopOnHover: true,
            navigation: false,
            paginationSpeed: 1000,
            goToFirstSpeed: 2000,
            singleItem: true,
            autoHeight: true,
        });
    },

    ToldApp.prototype.initPreloader = function() {
        $('#status').fadeOut();
        $('#preloader').delay(350).fadeOut('slow');
        $('body').delay(350).css({
            'overflow': 'visible'
        });
    },

    ToldApp.prototype.initScrollspy = function() {
        $("#navigation").scrollspy({ offset: 70 });
    },

    ToldApp.prototype.initMagnificPopup = function() {
        $('.mfp-image').magnificPopup({
            type: 'image',
            closeOnContentClick: true,
            mainClass: 'mfp-fade',
            gallery: {
                enabled: true,
                navigateByImgClick: true,
                preload: [0, 1]
                    // Will preload 0 - before current, and 1 after the current image 
            }
        });
    },

    ToldApp.prototype.initPortfolioFilter = function() {
        $(window).scroll(function() {
            var scroll = $(window).scrollTop();
            if (scroll >= 50) {
                $(".sticky").addClass("darkheader");
            } else {
                $(".sticky").removeClass("darkheader");
            }
        });
    },

    ToldApp.prototype.initClientSlider = function() {
        $(".owl-carousel").owlCarousel({
            loop:true,
            margin:10,
            nav:true,
            autoplay:true,
            autoplayTimeout:1000,
            responsive:{
                0:{
                    items:1
                },
                600:{
                    items:3
                },
                1000:{
                    items:5
                }
            }
        });
    },

    ToldApp.prototype.initCounter = function() {
        var a = 0;
        $(window).scroll(function() {
            var oTop = $('#counter').offset().top - window.innerHeight;
            if (a == 0 && $(window).scrollTop() > oTop) {
                $('.counter-value').each(function() {
                    var $this = $(this),
                        countTo = $this.attr('data-count');
                    $({
                        countNum: $this.text()
                    }).animate({
                            countNum: countTo
                        },

                        {
                            duration: 2000,
                            easing: 'swing',
                            step: function() {
                                $this.text(Math.floor(this.countNum));
                            },
                            complete: function() {
                                $this.text(this.countNum);
                                //alert('finished');
                            }

                        });
                });
                a = 1;
            }
        });
    },

    ToldApp.prototype.init = function() {
        this.initNavbarStickey();
        this.initSmoothLink();
        this.initNavbarToggler();
        this.initTestimonialSlider();
        this.initPreloader();
        this.initScrollspy();
        this.initMagnificPopup();
        this.initPortfolioFilter();
        this.initClientSlider();
        this.initCounter();
    },
    //init
    $.ToldApp = new ToldApp, $.ToldApp.Constructor = ToldApp
}(window.jQuery),

//initializing
function($) {
    "use strict";
    $(document).ready(() => $.ToldApp.init());
}(window.jQuery);