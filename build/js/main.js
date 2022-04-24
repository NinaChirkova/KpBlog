// Fixed contacts on scroll
window.onscroll = () => {
    const headerContacts = document.querySelector('.contacts');
    const svgIconInsta = document.querySelector('#icon-insta');
    const svgIconLocation = document.querySelector('#icon-location');
    const logoSvg = document.querySelector('.logo-svg .logo-text');
    const Y = window.scrollY;
    const navAside = document.querySelector('.nav-aside');

    if (!navAside.classList.contains('nav-aside--open')) {
        if (Y > 50) {
            headerContacts.classList.add('contacts--sticky');
            svgIconInsta.style.cssText = "fill: #000000";
            svgIconLocation.style.cssText = "fill: #000000";
            logoSvg.classList.add('logo-text--dark');
        } else if (Y < 50) {
            headerContacts.classList.remove('contacts--sticky');
            svgIconInsta.style.fill = "#FFFFFF";
            svgIconLocation.style.fill = "#FFFFFF";
            logoSvg.classList.remove('logo-text--dark');
        }
    }


}

// Animation

let animItems = document.querySelectorAll('.anim-item');

if (animItems.length > 0) {
    window.addEventListener('scroll', animOnScroll);
    function animOnScroll(params) {
        for (let i = 0; i < animItems.length; i++) {
            const animItem = animItems[i];
            const animItemHeight = animItem.offsetHeight;
            const animItemOffset = offset(animItem).top;
            const animStart = 4;

            let animItemPoint = window.innerHeight - animItemHeight / animStart;

            if (animItemHeight > window.innerHeight) {
                animItemPoint = window.innerHeight - window.innerHeight / animStart;
            }

            if (pageYOffset > (animItemOffset - animItemPoint) && pageYOffset < (animItemOffset + animItemHeight)) {
                animItem.classList.add('_active');
            } else {
                if (!animItem.classList.contains('_anim-no-hide')) {
                    animItem.classList.remove('_active');
                }
            }
        }
    }

    setTimeout(() => {
        animOnScroll();
    }, 300);

}

function offset(el) {
    const rect = el.getBoundingClientRect(),
        scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
        scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    return {
        top: rect.top + scrollTop, left: rect.left + scrollLeft
    }
}

// Navigation

window.onload = function () {
    var navToggleButton = $('.nav-toggle');
    var navToggleSvg = $('#nav-toggle');
    var navList = $('.nav-aside');
    var navListOpen = 'nav-aside--open';
    var navLink = $('.nav__link');
    var mobile = $('.contacts');
    var menuFixed = 'contacts--mob-fixed';
    var logoSvg = $('.logo-svg .logo-text');

    navToggleButton.on('click', function (e) {
        e.preventDefault();
        navList.toggleClass(navListOpen);
        mobile.toggleClass(menuFixed);
        logoSvg.addClass('logo-text--dark');

        navButtonToggle();
    });

    navLink.on('click', function () {

        if (navToggleSvg.hasClass("active")) {
            navButtonToggle();
        }

        navList.removeClass(navListOpen);
        mobile.removeClass(menuFixed);
        logoSvg.removeClass('logo-text--dark');

    });

    function navButtonToggle() {
        if (navToggleSvg.hasClass("active")) {
            navToggleSvg.removeClass("active");
        } else {
            navToggleSvg.addClass("active");
        }
    };


    // Slider
    $('.header__slider').slick({
        lazyLoad: 'ondemand',
        arrows: false,
        dots: false,
        autoplay: true,
        speed: 2000,
        easing: 'ease-in'
    });

    $('.comments__slider').slick({
        lazyLoad: 'progressive',
        arrows: true,
        dots: false,
        autoplay: true,
        speed: 1000,
        easing: 'ease-in',
        slidesToShow: 4,
        slidesToScroll: 4,
        centerMode: true,
        centerPadding: '40px',

        responsive: [
            {
                breakpoint: 1700,
                settings: {
                    slidesToShow: 3
                }
            },
            {
                breakpoint: 1400,
                settings: {
                    slidesToShow: 2
                }
            },
            {
                breakpoint: 1070,
                settings: {
                    slidesToShow: 1
                }
            },
            {
                breakpoint: 992,
                settings: {
                    slidesToShow: 2
                }
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 1
                }
            },
            {
                breakpoint: 576,
                settings: "unslick"
            }
        ]
    });

    $('.sertificates__wrapper').magnificPopup({
        delegate: '.aspect-ratio-box-inside', // child items selector, by clicking on it popup will open
        type: 'image'
        // other options
    });


    // Плавная прокрутка

	$(".nav-helper a,a[rel='m_PageScroll2id'],a.PageScroll2id").mPageScroll2id({
		highlightSelector:".nav-helper a"
	});

    // Раскрывающийся список

    let btnQuestion = document.querySelectorAll('.collapsible');

    for(let i = 0; i < btnQuestion.length; i++) {
        btnQuestion[i].addEventListener('click', function() {
            this.classList.toggle('_active');

            let content = this.nextElementSibling;

            if(content.style.maxHeight) {
                content.style.maxHeight = null;
                content.style.borderBottom = 'none';
            } else {
                content.style.maxHeight = content.scrollHeight + 'px';
                content.style.borderBottom = '1px solid rgba(0, 0, 0, 1)';
            }
        })
    }
};