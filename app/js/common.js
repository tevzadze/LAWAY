$(document).ready(function() {

    //parallax

    // $('.section-bg').scrolly();

    //share-dropdown

    let shareButton = document.querySelector('.share-button')

    $(shareButton).on('click', function() {
        $(this).toggleClass('active');
        $('.share-dropdown').toggleClass('active')
    })


    //imagesGrow

    let groveImage = document.querySelectorAll('.image-grow');

    function imagesGrow(images) {
        for (let i = 0; i < images.length; i++) {

            let imageHeight = images[i].getBoundingClientRect().height;
            let docHeight = document.documentElement.clientHeight;
            let offsetTop = images[i].getBoundingClientRect().y;
            let imageBottom = docHeight - imageHeight - offsetTop
            // console.log(offsetTop, imageBottom)

            if (offsetTop < docHeight - 400) {
                images[i].classList.add('active')

            } else {
                images[i].classList.remove('active')
            }
            if (offsetTop + imageHeight < 0) {
                // console.log('hi')
                images[i].classList.remove('active')
            }
        }
    }

    $(window).on('scroll', function() {
        imagesGrow(groveImage);
    })


    // reward carousel
    let owl = $('.reward-carousel')

    owl.owlCarousel({
        center: true,
        items: 6,
        loop: true,
        nav: false,
        dots: false,
        autoplay: true,
        responsive: {
            1200: {
                items: 6
            },
            900: {
                items: 4
            }, 
            480: {
                items: 3
            }
        }

    })
    onTriggerChange();
    owl.on('changed.owl.carousel', function(event) {
        // console.log( 'hi')
        // onTriggerChange();
        setTimeout(function() {
            onTriggerChange();
        }, 100)
    })

    function onTriggerChange() {
        let activeslides = document.querySelectorAll('.reward-carousel .owl-item.active')
        let inactiveItems = document.querySelectorAll('.reward-carousel .owl-item')
        let activeslidesLength = activeslides.length

        for (let i = 0; i < inactiveItems.length; i++) {
            inactiveItems[i].classList.remove('opacutibig')
        }
        for (let i = 0; i < activeslidesLength; i++) {

            if ((i + 1) == activeslidesLength) {
                activeslides[i].classList.remove('opacutibig')
            } else {
                activeslides[i].classList.add('opacutibig')
            }
        }
    }

    //pagescrolltoId

    $("a[rel='m_PageScroll2id']").mPageScroll2id({
        offset: 100,
        scrollSpeed: 600,
    });

    //popup

    $('.get-access, .popup-close').on('click', function () {
        event.preventDefault();
        console.log('his')
        $('.popup').toggleClass('active');
    })

    //inspire-slider
    if (  window.innerWidth < 1200) {
      $('.inspire-row').owlCarousel({
            center: true,
            items: 3,
            loop: true,
            nav: false,
            dots: false,
            autoplay: true,
            responsive: {
                900: {
                    items: 3
                },
                480: {
                    items: 2
                }
            }
        })
    } 

    if (window.innerWidth < 900) {
        $('.inspire-slider-container').removeClass('container')
    }

});