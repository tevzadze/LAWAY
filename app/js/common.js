$(document).ready(function() {

    //parallax

    $('.section-bg').scrolly();

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
            console.log(offsetTop, imageBottom)

            if (offsetTop < docHeight - 400) {
                images[i].classList.add('active')

            } else {
                images[i].classList.remove('active')
            }
            if (offsetTop + imageHeight < 0) {
                console.log('hi')
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

    })

});