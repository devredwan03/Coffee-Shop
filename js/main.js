(function ($) {
    "use strict";

    // THEMEFOREST BEST PRACTICE: Cache window object globally
    var $window = $(window);

    // skill
    var $skillPer = $(".skill-per");
    if ($skillPer.length > 0) {
        $skillPer.each(function () {
            var $this = $(this);
            var id = $this.attr("id"); // Make sure 'id' contains a valid number for width
            if (id) {
                $this.css("width", id + "%");
                $({
                    animatedValue: 0
                }).animate({
                    animatedValue: id
                }, {
                    duration: 1000,
                    step: function () {
                        $this.attr("id", Math.floor(this.animatedValue) + "%");
                    },
                    complete: function () {
                        $this.attr("id", Math.floor(this.animatedValue) + "%");
                    }
                });
            }
        });
    }

    // sticky
    var $headerSticky = $("#header-sticky");
    if ($headerSticky.length > 0) {
        $window.on('scroll', function () {
            var scroll = $window.scrollTop();
            if (scroll < 200) {
                $headerSticky.removeClass("sticky-menu");
            } else {
                $headerSticky.addClass("sticky-menu");
            }
        });
    }

    // RESPONSIVE MENU
    var $mobileMenu = $('#mobile-menu');
    var $responsiveBtn = $('.responsive');
    if ($responsiveBtn.length > 0 && $mobileMenu.length > 0) {
        $responsiveBtn.on('click', function (e) {
            $mobileMenu.slideToggle();
        });
    }

    // meanmenu
    if ($mobileMenu.length > 0 && $.fn.meanmenu) {
        $mobileMenu.meanmenu({
            meanMenuContainer: '.mobile-menu',
            meanScreenWidth: "992"
        });
    }

    // Helper function for click toggles
    function bindToggleEvent(triggerClass, targetClass, action, toggleClass) {
        var $trigger = $(triggerClass);
        if ($trigger.length > 0) {
            $trigger.on('click', function (e) {
                if ($(this).is('a')) e.preventDefault();
                var $target = $(targetClass);
                if (action === 'add') {
                    $target.addClass(toggleClass);
                } else if (action === 'remove') {
                    $target.removeClass(toggleClass);
                } else {
                    $target.toggleClass(toggleClass);
                }
            });
        }
    }

    bindToggleEvent('.info-bar', '.extra-info', 'add', 'info-open');
    bindToggleEvent('.close-icon', '.extra-info', 'remove', 'info-open');
    bindToggleEvent(".menu-tigger", ".offcanvas-menu,.offcanvas-overly", 'add', 'active');
    bindToggleEvent(".menu-close,.offcanvas-overly", ".offcanvas-menu,.offcanvas-overly", 'remove', 'active');

    // menu toggle
    var $mainMenuLinks = $(".main-menu li a");
    if ($mainMenuLinks.length > 0 && $mobileMenu.length > 0) {
        $mainMenuLinks.on('click', function () {
            if ($window.width() < 700) {
                $mobileMenu.slideUp();
            }
        });
    }

    // smoth scroll
    var $smoothScrollLinks = $('a.smoth-scroll');
    if ($smoothScrollLinks.length > 0) {
        $smoothScrollLinks.on('click', function (event) {
            var $anchor = $(this);
            var targetUrl = $anchor.attr('href');
            if (targetUrl !== '#' && $(targetUrl).length > 0) {
                $('html, body').stop().animate({
                    scrollTop: $(targetUrl).offset().top - 100
                }, 1000);
            }
            event.preventDefault();
        });
    }

    // mainSlider
    var $basicSlider = $('.slider-active');
    if ($basicSlider.length > 0) {
        function mainSlider() {
            $basicSlider.on('init', function (e, slick) {
                var $firstAnimatingElements = $('.single-slider:first-child').find('[data-animation]');
                doAnimations($firstAnimatingElements);
            });
            $basicSlider.on('beforeChange', function (e, slick, currentSlide, nextSlide) {
                var $animatingElements = $('.single-slider[data-slick-index="' + nextSlide + '"]').find('[data-animation]');
                doAnimations($animatingElements);
            });
            $basicSlider.slick({
                autoplay: true,
                autoplaySpeed: 10000,
                dots: false,
                fade: true,
                arrows: true,
                prevArrow: '<button type="button" class="slick-prev"><i class="far fa-angle-left"></i></button>',
                nextArrow: '<button type="button" class="slick-next"><i class="far fa-angle-right"></i></button>',
                responsive: [
                    {
                        breakpoint: 1200,
                        settings: {
                            dots: false,
                            arrows: false
                        }
                    }
                ]
            });

            function doAnimations(elements) {
                var animationEndEvents = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
                elements.each(function () {
                    var $this = $(this);
                    var $animationDelay = $this.data('delay');
                    var $animationType = 'animated ' + $this.data('animation');
                    $this.css({
                        'animation-delay': $animationDelay,
                        '-webkit-animation-delay': $animationDelay
                    });
                    $this.addClass($animationType).one(animationEndEvents, function () {
                        $this.removeClass($animationType);
                    });
                });
            }
        }
        mainSlider();
    }

    /* ====================================================================
       SLICK SLIDERS (Protected with Length Checks)
       ==================================================================== */

    var $servicesActive = $('.services-active');
    if ($servicesActive.length > 0) {
        $servicesActive.slick({
            dots: true,
            infinite: true,
            arrows: false,
            speed: 1000,
            slidesToShow: 3,
            slidesToScroll: 1,
            responsive: [
                {
                    breakpoint: 1200,
                    settings: {
                        slidesToShow: 3,
                        slidesToScroll: 1,
                        infinite: true,
                        dots: true
                    }
                },
                {
                    breakpoint: 992,
                    settings: {
                        slidesToShow: 2,
                        slidesToScroll: 1
                    }
                },
                {
                    breakpoint: 767,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1
                    }
                }
            ]
        });
    }

    var $teamActive = $('.team-active');
    if ($teamActive.length > 0) {
        $teamActive.slick({
            dots: true,
            infinite: true,
            arrows: false,
            prevArrow: '<button type="button" class="slick-prev"><i class="far fa-chevron-left"></i></button>',
            nextArrow: '<button type="button" class="slick-next"><i class="far fa-chevron-right"></i></button>',
            speed: 1000,
            slidesToShow: 4,
            slidesToScroll: 1,
            responsive: [
                {
                    breakpoint: 1200,
                    settings: {
                        slidesToShow: 3,
                        slidesToScroll: 1,
                        infinite: true,
                        dots: true
                    }
                },
                {
                    breakpoint: 992,
                    settings: {
                        slidesToShow: 2,
                        slidesToScroll: 1
                    }
                },
                {
                    breakpoint: 767,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1
                    }
                }
            ]
        });
    }

    var $classActive = $('.class-active');
    if ($classActive.length > 0) {
        $classActive.slick({
            dots: false,
            infinite: true,
            arrows: true,
            prevArrow: '<button type="button" class="slick-prev"><i class="fal fa-angle-left"></i></button>',
            nextArrow: '<button type="button" class="slick-next"><i class="fal fa-angle-right"></i></button>',
            speed: 1000,
            slidesToShow: 3,
            slidesToScroll: 1,
            responsive: [
                {
                    breakpoint: 1200,
                    settings: {
                        slidesToShow: 3,
                        slidesToScroll: 1,
                        infinite: true,
                        dots: true
                    }
                },
                {
                    breakpoint: 992,
                    settings: {
                        slidesToShow: 2,
                        slidesToScroll: 1
                    }
                },
                {
                    breakpoint: 767,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1
                    }
                }
            ]
        });
    }

    var $portfolioActive = $('.portfolio-active');
    if ($portfolioActive.length > 0) {
        $portfolioActive.slick({
            dots: false,
            infinite: true,
            arrows: true,
            prevArrow: '<button type="button" class="slick-prev"><i class="fal fa-angle-left"></i></button>',
            nextArrow: '<button type="button" class="slick-next"><i class="fal fa-angle-right"></i></button>',
            speed: 1000,
            slidesToShow: 5,
            slidesToScroll: 1,
            responsive: [
                {
                    breakpoint: 1200,
                    settings: {
                        slidesToShow: 5,
                        slidesToScroll: 1,
                        infinite: true,
                        dots: true
                    }
                },
                {
                    breakpoint: 992,
                    settings: {
                        slidesToShow: 2,
                        slidesToScroll: 1
                    }
                },
                {
                    breakpoint: 767,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1
                    }
                }
            ]
        });
    }

    var $brandActive = $('.brand-active');
    if ($brandActive.length > 0) {
        $brandActive.slick({
            dots: false,
            infinite: true,
            autoplay: true,
            autoplaySpeed: 1500,
            arrows: false,
            speed: 1000,
            slidesToShow: 4,
            slidesToScroll: 2,
            responsive: [
                {
                    breakpoint: 1500,
                    settings: {
                        slidesToShow: 4,
                        slidesToScroll: 3,
                        infinite: true
                    }
                },
                {
                    breakpoint: 1200,
                    settings: {
                        slidesToShow: 3,
                        slidesToScroll: 3,
                        infinite: true
                    }
                },
                {
                    breakpoint: 992,
                    settings: {
                        slidesToShow: 3,
                        slidesToScroll: 1
                    }
                },
                {
                    breakpoint: 767,
                    settings: {
                        slidesToShow: 2,
                        slidesToScroll: 1
                    }
                },
                {
                    breakpoint: 480,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1
                    }
                }
            ]
        });
    }

    var $brandActive2 = $('.brand-active2');
    if ($brandActive2.length > 0) {
        $brandActive2.slick({
            dots: false,
            infinite: true,
            autoplay: false,
            autoplaySpeed: 1500,
            arrows: false,
            speed: 1000,
            slidesToShow: 5,
            slidesToScroll: 2,
            responsive: [
                {
                    breakpoint: 1500,
                    settings: {
                        slidesToShow: 4,
                        slidesToScroll: 3,
                        infinite: true
                    }
                },
                {
                    breakpoint: 1200,
                    settings: {
                        slidesToShow: 3,
                        slidesToScroll: 3,
                        infinite: true
                    }
                },
                {
                    breakpoint: 992,
                    settings: {
                        slidesToShow: 3,
                        slidesToScroll: 1
                    }
                },
                {
                    breakpoint: 767,
                    settings: {
                        slidesToShow: 2,
                        slidesToScroll: 1
                    }
                },
                {
                    breakpoint: 480,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1
                    }
                }
            ]
        });
    }

    var $testimonialActive = $('.testimonial-active');
    if ($testimonialActive.length > 0) {
        $testimonialActive.slick({
            dots: true,
            infinite: true,
            arrows: true,
            prevArrow: '<button type="button" class="slick-prev"><i class="fa-light fa-arrow-left-long"></i></button>',
            nextArrow: '<button type="button" class="slick-next"><i class="fa-light fa-arrow-right-long"></i></button>',
            speed: 1000,
            slidesToShow: 2,
            slidesToScroll: 2,
            responsive: [
                {
                    breakpoint: 1024,
                    settings: {
                        slidesToShow: 2,
                        slidesToScroll: 2,
                        infinite: true,
                        dots: true
                    }
                },
                {
                    breakpoint: 992,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1
                    }
                },
                {
                    breakpoint: 767,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1
                    }
                }
            ]
        });
    }

    var $testimonialActive2 = $('.testimonial-active2');
    if ($testimonialActive2.length > 0) {
        $testimonialActive2.slick({
            dots: false,
            autoplay: false,
            autoplaySpeed: 1500,
            infinite: true,
            arrows: true,
            prevArrow: '<button type="button" class="slick-prev"><i class="fa-light fa-arrow-left-long"></i></button>',
            nextArrow: '<button type="button" class="slick-next"><i class="fa-light fa-arrow-right-long"></i></button>',
            speed: 1000,
            slidesToShow: 2,
            slidesToScroll: 1,
            responsive: [
                {
                    breakpoint: 1024,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1,
                        infinite: true,
                        dots: true
                    }
                },
                {
                    breakpoint: 992,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1
                    }
                },
                {
                    breakpoint: 767,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1
                    }
                }
            ]
        });
    }

    var $testimonialFor = $('.testimonial-for');
    var $testimonialNav = $('.testimonial-nav');
    if ($testimonialFor.length > 0 && $testimonialNav.length > 0) {
        $testimonialFor.slick({
            slidesToShow: 1,
            slidesToScroll: 1,
            arrows: false,
            fade: true,
            asNavFor: '.testimonial-nav'
        });
        $testimonialNav.slick({
            slidesToShow: 6,
            slidesToScroll: 1,
            asNavFor: '.testimonial-for',
            dots: false,
            arrows: true,
            centerMode: true,
            focusOnSelect: true,
            variableWidth: true,
            prevArrow: '<button type="button" class="slick-prev"><i class="fas fa-arrow-left"></i></button>',
            nextArrow: '<button type="button" class="slick-next"><i class="fas fa-arrow-right"></i></button>'
        });
    }

    var $sliderFor = $('.slider-for');
    var $sliderNav = $('.slider-nav');
    if ($sliderFor.length > 0 && $sliderNav.length > 0) {
        $sliderFor.slick({
            slidesToShow: 1,
            slidesToScroll: 1,
            arrows: false,
            fade: true,
            asNavFor: '.slider-nav'
        });
        $sliderNav.slick({
            slidesToShow: 3,
            slidesToScroll: 1,
            asNavFor: '.slider-for',
            dots: false,
            arrows: true,
            centerMode: true,
            focusOnSelect: true,
            variableWidth: true,
            prevArrow: '<button type="button" class="slick-prev"><i class="fas fa-arrow-left"></i></button>',
            nextArrow: '<button type="button" class="slick-next"><i class="fas fa-arrow-right"></i></button>'
        });
    }

    var $homeBlogActive = $('.home-blog-active');
    if ($homeBlogActive.length > 0) {
        $homeBlogActive.slick({
            dots: true,
            infinite: true,
            arrows: false,
            speed: 1000,
            slidesToShow: 4,
            slidesToScroll: 1,
            prevArrow: '<button type="button" class="slick-prev"><i class="far fa-chevron-left"></i></button>',
            nextArrow: '<button type="button" class="slick-next"><i class="far fa-chevron-right"></i></button>',
            responsive: [
                {
                    breakpoint: 1200,
                    settings: {
                        slidesToShow: 3,
                        slidesToScroll: 1,
                        infinite: true,
                        dots: true
                    }
                },
                {
                    breakpoint: 992,
                    settings: {
                        slidesToShow: 2,
                        slidesToScroll: 1
                    }
                },
                {
                    breakpoint: 767,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1
                    }
                }
            ]
        });
    }

    var $homeBlogActive2 = $('.home-blog-active2');
    if ($homeBlogActive2.length > 0) {
        $homeBlogActive2.slick({
            dots: false,
            infinite: true,
            arrows: true,
            speed: 1000,
            slidesToShow: 4,
            slidesToScroll: 1,
            prevArrow: '<button type="button" class="slick-prev"><i class="far fa-chevron-left"></i></button>',
            nextArrow: '<button type="button" class="slick-next"><i class="far fa-chevron-right"></i></button>',
            responsive: [
                {
                    breakpoint: 1200,
                    settings: {
                        slidesToShow: 3,
                        slidesToScroll: 1,
                        infinite: true,
                        dots: true
                    }
                },
                {
                    breakpoint: 992,
                    settings: {
                        slidesToShow: 2,
                        slidesToScroll: 1
                    }
                },
                {
                    breakpoint: 767,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1
                    }
                }
            ]
        });
    }

    var $blogActive = $('.blog-active');
    if ($blogActive.length > 0) {
        $blogActive.slick({
            dots: false,
            infinite: true,
            arrows: true,
            speed: 1500,
            slidesToShow: 1,
            slidesToScroll: 1,
            fade: true,
            prevArrow: '<button type="button" class="slick-prev"><i class="fas fa-arrow-left"></i></button>',
            nextArrow: '<button type="button" class="slick-next"><i class="fas fa-arrow-right"></i></button>',
        });
    }

    /* ====================================================================
       OTHER PLUGINS (Counter, Magnific, Isotope, etc.)
       ==================================================================== */

    var $count = $('.count');
    if ($count.length > 0 && $.fn.counterUp) {
        $count.counterUp({
            delay: 100,
            time: 1000
        });
    }

    var $popupImage = $('.popup-image');
    if ($popupImage.length > 0 && $.fn.magnificPopup) {
        $popupImage.magnificPopup({
            type: 'image',
            gallery: {
                enabled: true
            }
        });
    }

    var $popupVideo = $('.popup-video');
    if ($popupVideo.length > 0 && $.fn.magnificPopup) {
        $popupVideo.magnificPopup({
            type: 'iframe'
        });
    }

    var $paroller = $('.paroller');
    if ($paroller.length > 0 && $.fn.paroller) {
        $paroller.paroller();
    }

    function parallaxMouse() {
        var $parallax = $('#parallax');
        if ($parallax.length > 0 && typeof Parallax !== 'undefined') {
            var scene = document.getElementById('parallax');
            var parallax = new Parallax(scene);
        }
    }
    parallaxMouse();

    var $singleServices = $('.s-single-services');
    if ($singleServices.length > 0) {
        $singleServices.on('mouseenter', function () {
            $(this).addClass('active').parent().siblings().find('.s-single-services').removeClass('active');
        });
    }

    // scrollUp with typeof check
    if ($.fn.scrollUp) {
        $.scrollUp({
            scrollName: 'scrollUp',
            topDistance: '300',
            topSpeed: 300,
            animation: 'fade',
            animationInSpeed: 200,
            animationOutSpeed: 200,
            scrollText: '<i class="fas fa-level-up-alt"></i>',
            activeOverlay: false,
        });
    }

    var $gridWrapper = $('.grid');
    if ($gridWrapper.length > 0 && $.fn.imagesLoaded && $.fn.isotope) {
        $gridWrapper.imagesLoaded(function () {
            var $grid = $gridWrapper.isotope({
                itemSelector: '.grid-item',
                percentPosition: true,
                masonry: {
                    columnWidth: 1
                }
            });
            $('.button-group').on('click', 'button', function () {
                var filterValue = $(this).attr('data-filter');
                if (filterValue) {
                    $grid.isotope({
                        filter: filterValue
                    });
                }
            });
        });
    }

    var $elementTyped = $(".element");
    if ($elementTyped.length > 0 && $.fn.typed) {
        $elementTyped.each(function () {
            var a = $(this);
            var dataElements = a.attr("data-elements");
            if (dataElements) {
                a.typed({
                    strings: dataElements.split(","),
                    typeSpeed: 100,
                    backDelay: 3000
                });
            }
        });
    }

    var $buttonGroupBtns = $('.button-group > button');
    if ($buttonGroupBtns.length > 0) {
        $buttonGroupBtns.on('click', function (event) {
            $(this).siblings('.active').removeClass('active');
            $(this).addClass('active');
            event.preventDefault();
        });
    }

    // ThemeForest Fix: Check if WOW exists before initializing
    if (typeof WOW !== 'undefined') {
        new WOW().init();
    }

    var $tabsBox = $('.tabs-box');
    if ($tabsBox.length > 0) {
        $('.tabs-box .tab-buttons .tab-btn').on('click', function (e) {
            e.preventDefault();
            var target = $($(this).attr('data-tab'));

            if ($(target).is(':visible')) {
                return false;
            } else {
                target.parents('.tabs-box').find('.tab-buttons').find('.tab-btn').removeClass('active-btn');
                $(this).addClass('active-btn');
                target.parents('.tabs-box').find('.tabs-content').find('.tab').fadeOut(0);
                target.parents('.tabs-box').find('.tabs-content').find('.tab').removeClass('active-tab animated fadeIn');
                $(target).fadeIn(300);
                $(target).addClass('active-tab animated fadeIn');
            }
        });
    }

})(jQuery);
