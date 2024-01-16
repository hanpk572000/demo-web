jQuery(document).ready(function($){
  AOS.init({
    duration: 1200,
    // easing: 'slide',
    once: true,
    offset: 200,
    disable: 'mobile'
  });

  var home_service_slide = new Swiper('#home_service_slide', {
    loop: false,
    loopedSlides: 100,
    slidesPerView: '2',
    spaceBetween: 20,
    speed: 1500,
    navigation: {
      nextEl: '#home_services_button_next',
      prevEl: '#home_services_button_prev',
    },
    breakpoints: {
      768: {
        slidesPerView: '1',
        spaceBetween: 30,
      },
      2000: {
        slidesPerView: '3',
      },
      1500: {
        slidesPerView: '2',
      }
    },
    mousewheelControl: true,
    mousewheel: {
      releaseOnEdges: true,
    },
  });
  home_service_slide.on('slideChange', function () {
    if (home_service_slide.isEnd) {
      $('#home_services_button_next').removeClass('visible-btn');
    }
    else {
      $('#home_services_button_next').addClass('visible-btn');
    }
    if (home_service_slide.activeIndex == 0) {
      $('#home_services_button_prev').removeClass('visible-btn');
    }
    else {
      $('#home_services_button_prev').addClass('visible-btn');
    }
  });

  // var homeServiceController = new ScrollMagic.Controller();
  //
  // var wipeAnimation = new TimelineMax()
  //     .to("#home_service_wrapper", 1,   {x: "-25%"})
  //     .to("#home_service_wrapper", 1,   {x: "-50%"})
  //     .to("#home_service_wrapper", 1,   {x: "-75%"})
  //
  // new ScrollMagic.Scene({
  //     triggerElement: "#home_service_slide",
  //     triggerHook: "onLeave",
  //     duration: "500%"
  // })
  //     .setPin("#home_service_slide")
  //     .setTween(wipeAnimation)
  //     .addTo(homeServiceController);

  // home service popup
  var project_popup_container = new Swiper('#project_popup_container', {
    loop: false,
    loopedSlides: 100,
    slidesPerView: '1',
    spaceBetween: 20,
    speed: 1000,
    // autoplay: {
    //     delay: 10000,
    // },
    navigation: {
      nextEl: '#project_popup_button_next',
      prevEl: '#project_popup_button_prev',
    },
    pagination: {
      el: '#project_popup_pagination',
      clickable: true,
    },
  });
  $(".js-open-popup").on("click", function(e) {
    e.preventDefault();
    let index = $(".js-open-popup").index(this);
    project_popup_container.slideTo(index, 10)
    setTimeout(function () {
      project_popup_container.update();
    }, 10)
  })

  var home_flow_slide = new Swiper('#home_flow_slide', {
    loop: false,
    loopedSlides: 100,
    slidesPerView: '1',
    spaceBetween: 20,
    speed: 1500,
    autoplay: {
      delay: 3000,
    },
    navigation: {
      nextEl: '#home_flow_button_next',
      prevEl: '#home_flow_button_prev',
    },
    pagination: {
      el: '#home_flow_pagination',
      clickable: true,
    },
    mousewheelControl: true,
    mousewheel: {
      releaseOnEdges: true,
    },
  });
  home_flow_slide.on('slideChange', function () {
    $('#currentSlide').text(this.activeIndex + 1);
  });
  home_flow_slide.on('slideChange', function () {
    if (home_flow_slide.isEnd) {
      $('#home_flow_button_next').removeClass('visible-btn');
      // $('#home_flow_button_prev').addClass('visible-btn');
    }
    else {
      $('#home_flow_button_next').addClass('visible-btn');
    }
    if (home_flow_slide.activeIndex == 0) {
      // console.log("end is reached");
      // $('#home_flow_button_next').addClass('visible-btn');
      $('#home_flow_button_prev').removeClass('visible-btn');
    }
    else {
      $('#home_flow_button_prev').addClass('visible-btn');
    }
  });
  $('#slidesLength').text(home_flow_slide.slides.length);

  // header change color
  $(window).scroll(function () {
    var y = $(window).scrollTop();
    if (y > $('#home_intro').offset().top && y < $('#home_services').offset().top) {
    }
    if (y > $('#home_services').offset().top-50 && y < $('#home_solution').offset().top) {
    }
    if (y > $('#home_solution').offset().top-50 && y < $('#home_projects').offset().top) {
      $('.header-block').removeClass('white-bg');
      $('.menu-content-container').removeClass('white-bg-menu');
    }
    if (y > $('#home_projects').offset().top-50 && y < $('#home_clients').offset().top) {
      $('.header-block').addClass('white-bg');
      $('.menu-content-container').addClass('white-bg-menu');
    }
    if (y > $('#home_clients').offset().top-50 && y < $('#home_work_flow').offset().top) {
      $('.header-block').addClass('white-bg');
      $('.menu-content-container').addClass('white-bg-menu');
    }
    if (y > $('#home_work_flow').offset().top-50 && y < $('#contact').offset().top) {
      $('.header-block').removeClass('white-bg');
      $('.menu-content-container').removeClass('white-bg-menu');
    }
  });

  // Project click
  $('.popup-close').click(function(event) {
    $('.project-item').removeClass('project-disable')
    $(this).removeClass('popup-close-active');
    $('.home-project-popup').removeClass('popup-active');
  });
  $('.project-item').click(function(event) {
    $('.project-item').addClass('project-disable')
    $('.popup-close').addClass('popup-close-active');
    $('.home-project-popup').addClass('popup-active');
  });
  $('.header-button .button-menu').click(function(event) {
    $(this).toggleClass('_close');
    $('main').toggleClass('blured');
    $('.menu-content-container').toggleClass('_visible');
    $('body').toggleClass('menu-active');

  });

  $('.menu-content-container .item-menu').click(function(event) {
    $('.button-menu').removeClass('_close');
    $('.menu-content').removeClass('_visible');
    $('main').removeClass('blured');
    $('body').removeClass('menu-active');
  });

  // CLICK MENU
  $('.menu-content-container .item-menu').click(function(event) {
    event.preventDefault();
    var data_src = $(this).attr('data-section');
    var url = '#' + data_src;
    $('body, html').animate({scrollTop: $(url).offset().top}, 800);
    $('.menu-content-container').removeClass('_visible');
    // $(this).addClass('is_active');
  });

  $('.menu-content-container._visible .item-menu').click(function(event) {
    $('.menu-content-container').removeClass('_visible');
  });

  // Animate SVG morphing path 1
  var maskMorphing1 = new TimelineMax({repeat: -1, yoyo: !0});
  var mask12 = "M356.617187,0 C354.395833,42 342.197917,68.5 320.023438,79.5 C286.761719,96 236.867187,130.59375 295.921875,188 C354.976563,245.40625 411.861328,291.243334 398,409.90625 C384.138672,528.569166 262.664771,553.453203 204.115943,522 C145.567115,490.546797 74.03125,476.5 0.5,483.415575 C0.5,434.214549 0.5,273.076024 0.5,0 L356.617187,0 Z";
  var mask13 = "M333.695313,0 C348.578125,48.3333333 344.932292,78 322.757813,89 C289.496094,105.5 226.734375,117.476394 285.789063,174.882644 C344.84375,232.288894 459.289063,349.765287 398,409.90625 C336.710938,470.047213 339.589335,552.584425 208.017324,518 C76.4453125,483.415575 45.4453125,538.5 0.5,483.415575 C0.5,434.214549 0.5,273.076024 0.5,0 L333.695313,0 Z";

  var maskMorphing2 = new TimelineMax({repeat: -1, yoyo: !0});
  var mask22 = "M1041.66406,-1.13686838e-13 C968.992187,7.91666667 944.244792,67.125 967.421875,177.625 C1002.1875,343.375 957.34375,455.21875 897.703125,476.5 C838.0625,497.78125 686.703125,569 646.5,741 C769.760721,741 951.108377,740.666667 1190.54297,740 L1190.54297,-1.13686838e-13 L1041.66406,-1.13686838e-13 Z";
  var mask23 = "M1013.51562,-1.13686838e-13 C959.901042,44.1666667 944.682292,121.5 967.859375,232 C1002.625,397.75 881.737577,432.59375 854.119067,486.484375 C826.500558,540.375 678.59375,618.039298 646.5,741 C769.760721,741 951.108377,740.666667 1190.54297,740 L1190.54297,-1.13686838e-13 L1013.51562,-1.13686838e-13 Z";

  var maskMorphing3 = new TimelineMax({repeat: -1, yoyo: !0});
  var mask32 = "M1190.5,200 C1111.82812,207.333333 1072.49219,259.083333 1072.49219,355.25 C1072.49219,499.5 1005.96875,613.703125 913.5,597.445313 C821.03125,581.1875 695.5,684.554688 695.5,741 C695.5,741 860.5,741 1190.5,741 L1190.5,200 Z";
  var mask33 = "M1190.5,167 C1089.67188,247.921875 1039.25781,315.755208 1039.25781,370.5 C1039.25781,452.617187 966.609375,560.476563 899.632812,579.320313 C832.65625,598.164062 728.5,683.554688 728.5,740 C728.5,740 882.5,740.333333 1190.5,741 L1190.5,167 Z";

  var maskMorphing4 = new TimelineMax({repeat: -1, yoyo: !0});
  var mask42 = "M538.962891,115.59375 C479.787292,95.8263536 433.799662,106.647552 401,148.057345 C357.273438,203.262423 419.857422,267.396484 439.976562,297.484375 C458.351562,334.166016 455.068359,346.869739 439.976562,420.078829 C424.884766,493.287919 480.032101,485.635207 538.962891,509.507813 C567.25,520.966797 537.454548,588.090114 558.96875,608.25 C595,642.013088 662.982754,653.242288 709.5,569 C745.646484,503.539063 814.185474,456.717501 854.119067,420.078829 C894.052661,383.440157 868.910156,316.023438 824.210938,261 C779.511719,205.976562 724.609375,196.113281 671.773437,188 C636.549479,182.591146 592.279297,158.455729 538.962891,115.59375 Z";
  var mask43 = "M524.375,148.057345 C489.78125,121.232045 464.73414,85.9426554 415.534647,148.057345 C371.808085,203.262423 449.201172,253.982422 469.320313,284.070312 C487.695312,320.751953 455.068359,331.626848 439.976562,404.835937 C424.884766,478.045027 465.444211,481.92427 524.375,505.796875 C552.662109,517.255859 531.704548,575.426051 553.21875,595.585937 C589.25,629.349026 662.730801,633.242288 709.248047,549 C745.394531,483.539063 814.185474,469.583984 854.119067,432.945312 C894.052661,396.306641 898.818286,297.070313 854.119067,242.046875 C809.419849,187.023437 714.335938,182.995925 661.5,174.882644 C608.664063,166.769362 558.96875,174.882644 524.375,148.057345 Z";

  var maskMorphing5 = new TimelineMax({repeat: -1, yoyo: !0});
  var mask52 = "M87.4492188,-2.84217094e-14 C112.217448,27.2760417 136.252604,66.2760417 159.554687,117 C238.404375,288.639944 201.099609,355.25 136.632812,355.25 C72.1660156,355.25 41.5251465,309 0.5,355.25 C0.5,355.25 0.5,236.833333 0.5,-2.84217094e-14 L87.4492188,-2.84217094e-14 Z";
  var mask53 = "M116.382813,-2.84217094e-14 C111.604605,37.9270833 125.99523,76.9270833 159.554688,117 C264.092074,241.82675 219.796875,290.164062 146.015625,336.414063 C72.234375,382.664063 41.5251465,290.164062 0.5,336.414063 C0.5,336.414063 0.5,224.276042 0.5,-2.84217094e-14 L116.382813,-2.84217094e-14 Z";

  var maskMorphing6 = new TimelineMax({repeat: -1, yoyo: !0});
  var mask62 = "M519.248047,0 C525.521547,91.2664675 572.938865,135.235218 661.5,131.90625 C744.792273,128.775336 758.094122,142.138539 773.695312,153.460938 C789.296503,164.783336 865.556925,236.690616 911.176558,131.90625 C921.998979,107.048083 917.549501,63.079333 897.828125,0 L519.248047,0 Z";
  var mask63 = "M494.248047,0 C539.433606,85.984375 606.517591,128.976563 695.5,128.976563 C757.226934,128.976563 753.5,145.445481 772.828125,160.164062 C792.15625,174.882644 872.901851,184.284366 918.521484,79.5 C929.343905,54.641833 932.252759,28.141833 927.248047,0 L494.248047,0 Z";

  var maskMorphing7 = new TimelineMax({repeat: -1, yoyo: !0});
  var mask72 = "M84.421875,740 C29.4791667,734.406109 10.9088542,693.558418 28.7109375,617.456926 C55.4140625,503.304688 185.655258,545.265625 234.546875,590.023437 C283.438492,634.78125 323.119967,616.017578 390.054687,602.429688 C456.989408,588.841797 519.633217,621.469288 510.5,681.789063 C507.628906,700.751026 485.921875,731.220703 473.75,740 C473.75,740 343.973958,740 84.421875,740 Z";
  var mask73 = "M124.726562,740 C71.8203125,724.387951 54.2682292,678.53118 72.0703125,602.429688 C98.7734375,488.277449 217.891373,557.671875 266.782989,602.429687 C315.674606,647.1875 349.06528,581.689453 416,568.101563 C482.93472,554.513672 518.218418,641.160241 511.389822,701.539063 C505.5,753.617188 457.648437,731.220703 445.476562,740 C445.476562,740 338.559896,740 124.726562,740 Z";

  maskMorphing1.to(('#mask_path_1'), 2, {
    attr: {
      d: mask12,
    },
    ease: Power0.easeNone
  }),
    maskMorphing1.to(('#mask_path_1'), 2, {
      attr: {
        d: mask13,
      },
      ease: Power0.easeNone
    }),

    // Animate to SVG morphing path 2

    maskMorphing2.to(('#mask_path_2'), 2, {
      attr: {
        d: mask22,
      },
      ease: Power0.easeNone
    }),
    maskMorphing2.to(('#mask_path_2'), 2, {
      attr: {
        d: mask23,
      },
      ease: Power0.easeNone
    }),

    // Animate to SVG morphing path 3

    maskMorphing3.to(('#mask_path_3'), 2, {
      attr: {
        d: mask32,
      },
      ease: Power0.easeNone
    }),
    maskMorphing3.to(('#mask_path_3'), 2, {
      attr: {
        d: mask33,
      },
      ease: Power0.easeNone
    }),

    // Animate to SVG morphing path 4

    maskMorphing4.to(('#mask_path_4'), 2, {
      attr: {
        d: mask42,
      },
      ease: Power0.easeNone
    }),
    maskMorphing4.to(('#mask_path_4'), 2, {
      attr: {
        d: mask43,
      },
      ease: Power0.easeNone
    }),

    // Animate to SVG morphing path 5

    maskMorphing5.to(('#mask_path_5'), 2, {
      attr: {
        d: mask52,
      },
      ease: Power0.easeNone
    }),
    maskMorphing5.to(('#mask_path_5'), 2, {
      attr: {
        d: mask53,
      },
      ease: Power0.easeNone
    }),

    // Animate to SVG morphing path 6

    maskMorphing6.to(('#mask_path_6'), 2, {
      attr: {
        d: mask62,
      },
      ease: Power0.easeNone
    }),
    maskMorphing6.to(('#mask_path_6'), 2, {
      attr: {
        d: mask63,
      },
      ease: Power0.easeNone
    }),

    // Animate to SVG morphing path 7

    maskMorphing7.to(('#mask_path_7'), 2, {
      attr: {
        d: mask72,
      },
      ease: Power0.easeNone
    }),
    maskMorphing7.to(('#mask_path_7'), 2, {
      attr: {
        d: mask73,
      },
      ease: Power0.easeNone
    })

  setTimeout(function () {
    $('.bg5').removeAttr("style");
  }, 100);

  // background change color when scrolling
  var controllerScroll = new ScrollMagic.Controller();
  var fadeOptions = {duration: 700, offset: 0};
  // var latefadeOptions = {duration: 700, offset: 2600};
  // var fadeinitial = $("div.bg-initial");
  var fade1 = $("div.bg1");
  var fade2 = $("div.bg2");
  var fade3 = $("div.bg3");
  var fade4 = $("div.bg4");
  var fade5 = $("div.bg5");
  // setTimeout(function () {
  //     TweenMax.to(fadeinitial, 1, {autoAlpha: 1});
  // }, 0);
  new ScrollMagic.Scene(fadeOptions).addTo(controllerScroll).triggerElement(".pin-trigger1").setTween(TweenMax.to(fade1, 1, {autoAlpha: 1}));
  new ScrollMagic.Scene(fadeOptions).addTo(controllerScroll).triggerElement(".pin-trigger2").setTween(TweenMax.from(fade2, 1, {autoAlpha: 0}));
  new ScrollMagic.Scene(fadeOptions).addTo(controllerScroll).triggerElement(".pin-trigger3").setTween(TweenMax.from(fade3, 1, {autoAlpha: 0}));
  new ScrollMagic.Scene(fadeOptions).addTo(controllerScroll).triggerElement(".pin-trigger4").setTween(TweenMax.from(fade4, 1, {autoAlpha: 0}));
  setTimeout(function () {
    new ScrollMagic.Scene(fadeOptions).addTo(controllerScroll).triggerElement(".pin-trigger5").setTween(TweenMax.from(fade5, 1, {autoAlpha: 0}));
  }, 100);

});

// $( window ).ready(function() {
//
//     var wHeight = $(window).height();
//
//     $('.section-slide')
//         .height(wHeight)
//         .scrollie({
//             scrollOffset : -50,
//             scrollingInView : function(elem) {
//
//                 var bgColor = elem.data('background');
//
//                 $('body').css('background-color', bgColor);
//
//             }
//         });
//
// });

// set height equal to slide height
// jQuery(document).ready(function($) {
//     $.fn.equalizeHeights = function(){
//         return this.height( Math.max.apply(this, $(this).map(function(i,e){ return $(e).height() }).get() ) )
//     }
//     $('.service-button-container, .img-block__img').equalizeHeights();
// });
