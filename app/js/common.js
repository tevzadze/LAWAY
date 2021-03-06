$(document).ready(function() {

    //parallax

    // $('.section-bg').scrolly();

    //share-dropdown

    var pid = null;

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


    window.addEventListener('scroll', function() {
        imagesGrow(groveImage);
        navigationHide();
    });


    // reward carousel
    let owl = $('.reward-carousel')

    owl.owlCarousel({
        center: true,
        items: 4,
        loop: true,
        nav: false,
        dots: false,
        autoplay: false,
        responsive: {
            1200: {
                items: 5
            },
            900: {
                items: 4
            },
            480: {
                items: 3
            },
            0: {
                items: 2,
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
        if (window.innerWidth > 480) {
for (let i = 0; i < activeslidesLength; i++) {

            if (i == activeslidesLength) {
                activeslides[i].classList.remove('opacutibig')
            } else {
                activeslides[i].classList.add('opacutibig')
            }
        }
        } else {
            for (let i = 0; i < activeslidesLength; i++) {

            if ((i+1) == activeslidesLength) {
                activeslides[i].classList.remove('opacutibig')
            } else {
                activeslides[i].classList.add('opacutibig')
            }
        }
        }
        
    }

    //pagescrolltoId

    $("a[rel='m_PageScroll2id']").mPageScroll2id({
        offset: 100,
        scrollSpeed: 600,
    });

    //popup

    $('.get-access, .popup-close, .main_button').on('click', function() {
        event.preventDefault();
        console.log('his')
        $('.popup').toggleClass('active');
    })
    if (window.innerWidth < 900) {
        $('.inspire-slider-container').removeClass('container')
    }
    //inspire-slider
    if (window.innerWidth < 1200) {
        console.log('asdasd')
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
                },
                0: {
                    items: 1
                }
            }
        })
    }

    if (window.innerWidth < 480) {
        $('.soon .container').removeClass('container')
        $('.join .section-bg .container').removeClass('container')
        $('.footer-section .section-content .container').removeClass('container')
    }




    //form
    let position //позиция после регистрации
    let positionAfterSharing //позиция после шариинга


    $("#contact-form").submit(function(e) {
      e.preventDefault();

      var form = $(this);
      let isValid = ($('#email_field').val().match(/.+?\@.+/g) || []).length === 1;
      if (isValid == true) {
        var url = "https:/laway.app/api/v2/noenc/waitlist/subscribe";
        $.ajax({
             type: "POST",
             url: url,
             data: form.serialize(),
             success: function(data)
             {
                successForm(data.result.position);
                pid = data.result.id;
             }
           });
      } else {
          inputerror();
      }
    });

    //показываем ошибку инпута
    function inputerror() {
        $('#email_field').css({
            'border-color': 'red'
        })
    }
    //функция смены номера и экрана.
    function successForm(position) {
        $('.position').html(position);
        $('.form').addClass('inactive');
        $('.success').removeClass('inactive');
    }

    //facebook share
    window.fbAsyncInit = function() {
        FB.init({
            appId: '824136577770749',
            autoLogAppEvents: true,
            xfbml: true,
            version: 'v8.0'
        });
    };

    function shareToFB() {
        FB.ui({
            method: 'share',
            href: 'https://developers.facebook.com/docs/',
        }, function(response) {
            successShare(response);
        });
    }

    //вызов шаринга в фейсбук
    $('.success .share a:nth-child(1)').on('click', function(e) {
        e.preventDefault();
        shareToFB();
    })

    //twitter аринг
    $.getScript("http://platform.twitter.com/widgets.js", function(){
    function handleTweetEvent(event){
     if (event) {
            console.log(event)
         }
       }
       twttr.events.bind('tweet', function (ev) {
           successShare(ev)
       });
     });

    function sendShareSuccess(type) {
      var url = "https://api.laway.app/api/v2/noenc/waitlist/shared";
      $.ajax({
           type: "POST",
           url: url,
           data: { id: pid, type: type },
           success: function(data)
           {
              console.log('fine')
              $('.success').addClass('inactive');
              $('.success-share').removeClass('inactive');
              positionChange(data.result.position);
           }
         });
    }

    //обработка результата
    function successShare(response) {
        console.log(response)
        if (response != undefined) {
            sendShareSuccess();
        } else {
            console.log('eror')
            $('.popup-error').addClass('active-error');
            setTimeout(function () {
                $('.popup-error').removeClass('active-error')
            }, 5000)
        }
    }

    // Выдача новой позиции после шаринга
    // через positionAfterSharing передать новую позицию
    function positionChange(positionAfterSharing) {
        $('.position-share').html(positionAfterSharing)
    }


    //categories
    let categoryInput = document.querySelector('#catagory')
    let categoryDefaultS = document.querySelectorAll('.category-wrapper span')
    
    for(let i = 0; i <categoryDefaultS.length ; i++) {
        categoryDefaultS[i].addEventListener('click', function () {
            categoryInput.value = categoryDefaultS[i].textContent
        })
    }
    
    //navigation hide
    let headerNavHideClass = document.querySelector('.scroll-hidden')
    console.log(headerNavHideClass)
    function navigationHide() {
        if ( headerNavHideClass != null) {
            let headerNav = $('.scroll-hidden nav')
            let offsetTop = headerNav.offset().top
            // console.log(offsetTop)
            if (offsetTop > 100) {
                headerNav.addClass('hide')
            } else {
                headerNav.removeClass('hide')
            }
        }
    }
    
});
