(function ($) {
  ("use strict");

  /*------------------------------------------
        = ALL ESSENTIAL FUNCTIONS
    -------------------------------------------*/

  // Toggle mobile navigation
  function toggleMobileNavigation() {
    var navbar = $(".navigation-holder");
    var openBtn = $(".navbar-header .open-btn");
    var closeBtn = $(".navigation-holder .close-navbar");
    var body = $(".page-wrapper");

    openBtn.on("click", function () {
      if (!navbar.hasClass("slideInn")) {
        navbar.addClass("slideInn");
        body.addClass("active-body-overlay");
      }
      return false;
    });

    closeBtn.on("click", function () {
      if (navbar.hasClass("slideInn")) {
        navbar.removeClass("slideInn");
      }
      body.removeClass("active-body-overlay");
      return false;
    });
  }

  toggleMobileNavigation();

  // Function for toggle class for small menu
  function toggleClassForSmallNav() {
    var windowWidth = window.innerWidth;
    var mainNav = $("#navbar > ul");

    if (windowWidth <= 991) {
      mainNav.addClass("small-nav");
    } else {
      mainNav.removeClass("small-nav");
    }
  }

  toggleClassForSmallNav();

  // Function for small menu
  function smallNavFunctionality() {
    var windowWidth = window.innerWidth;
    var mainNav = $(".navigation-holder");
    var smallNav = $(".navigation-holder > .small-nav");
    var subMenu = smallNav.find(".sub-menu");
    var megamenu = smallNav.find(".mega-menu");
    var menuItemWidthSubMenu = smallNav.find(".menu-item-has-children > a");

    if (windowWidth <= 991) {
      subMenu.hide();
      megamenu.hide();
      menuItemWidthSubMenu.on("click", function (e) {
        var $this = $(this);
        $this.siblings().slideToggle();
        e.preventDefault();
        e.stopImmediatePropagation();
      });
    } else if (windowWidth > 991) {
      mainNav.find(".sub-menu").show();
      mainNav.find(".mega-menu").show();
    }
  }

  smallNavFunctionality();

  // Parallax background
  function bgParallax() {
    if ($(".parallax").length) {
      $(".parallax").each(function () {
        var height = $(this).position().top;
        var resize = height - $(window).scrollTop();
        var doParallax = -(resize / 5);
        var positionValue = doParallax + "px";
        var img = $(this).data("bg-image");

        $(this).css({
          backgroundImage: "url(" + img + ")",
          backgroundPosition: "50%" + positionValue,
          backgroundSize: "cover",
        });
      });
    }
  }

  /*------------------------------------------
        = HERO SLIDER
    -------------------------------------------*/

  if ($(".hero-style-1") || $(".hero-style-2")) {
    // settings
    var $sliderDelay = 7500,
      $sliderSpeed = 1000;

    // animate stroke
    var count = 0,
      $svg = $(".slider-nav-progress").drawsvg({
        duration: $sliderDelay,
        stagger: $sliderSpeed,
        reverse: true,
      });

    function drawsvgSliderArrow() {
      $svg.drawsvg("animate");
    }

    var menu = [];
    jQuery(".swiper-slide").each(function (index) {
      menu.push(jQuery(this).find(".slide-inner").attr("data-text"));
    });
    var interleaveOffset = 0.5;
    var swiperOptions = {
      loop: false,
      speed: $sliderSpeed,
      parallax: true,
      autoplay: {
        delay: 6500,
        disableOnInteraction: false,
      },
      watchSlidesProgress: true,
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
      },

      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },

      on: {
        progress: function () {
          var swiper = this;
          for (var i = 0; i < swiper.slides.length; i++) {
            var slideProgress = swiper.slides[i].progress;
            var innerOffset = swiper.width * interleaveOffset;
            var innerTranslate = slideProgress * innerOffset;
            swiper.slides[i].querySelector(".slide-inner").style.transform =
              "translate3d(" + innerTranslate + "px, 0, 0)";
          }
        },

        touchStart: function () {
          var swiper = this;
          for (var i = 0; i < swiper.slides.length; i++) {
            swiper.slides[i].style.transition = "";
          }
        },

        setTransition: function (speed) {
          var swiper = this;
          for (var i = 0; i < swiper.slides.length; i++) {
            swiper.slides[i].style.transition = speed + "ms";
            swiper.slides[i].querySelector(".slide-inner").style.transition =
              speed + "ms";
          }
        },

        slideChange: function () {
          drawsvgSliderArrow();
        },
      },
    };

    var swiper = new Swiper(".swiper-container", swiperOptions);

    // DATA BACKGROUND IMAGE
    var sliderBgSetting = $(".slide-bg-image");
    sliderBgSetting.each(function (indx) {
      if ($(this).attr("data-background")) {
        $(this).css(
          "background-image",
          "url(" + $(this).data("background") + ")"
        );
      }
    });
  }

  var swiper2 = new Swiper(".swiper-container-s2", {
    effect: "fade",
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
  });

  /*------------------------------------------
        = HIDE PRELOADER
    -------------------------------------------*/
  function preloader() {
    if ($(".preloader").length) {
      $(".preloader")
        .delay(10)
        .fadeOut(500, function () {
          //active wow
          wow.init();
        });
    }
  }

  /*------------------------------------------
        = WOW ANIMATION SETTING
    -------------------------------------------*/
  var wow = new WOW({
    boxClass: "wow", // default
    animateClass: "animated", // default
    offset: 0, // default
    mobile: true, // default
    live: true, // default
  });

  /*------------------------------------------
        = ACTIVE POPUP IMAGE
    -------------------------------------------*/
  if ($(".fancybox").length) {
    $(".fancybox").fancybox({
      openEffect: "elastic",
      closeEffect: "elastic",
      wrapCSS: "project-fancybox-title-style",
    });
  }

  /*------------------------------------------
        = POPUP VIDEO
    -------------------------------------------*/
  if ($(".video-btn").length) {
    $(".video-btn").on("click", function () {
      $.fancybox({
        href: this.href,
        type: $(this).data("type"),
        title: this.title,
        helpers: {
          title: { type: "inside" },
          media: {},
        },

        beforeShow: function () {
          $(".fancybox-wrap").addClass("gallery-fancybox");
        },
      });
      return false;
    });
  }

  /*------------------------------------------
        = ACTIVE GALLERY POPUP IMAGE
    -------------------------------------------*/
  if ($(".popup-gallery").length) {
    $(".popup-gallery").magnificPopup({
      delegate: "a",
      type: "image",

      gallery: {
        enabled: true,
      },

      zoom: {
        enabled: true,

        duration: 300,
        easing: "ease-in-out",
        opener: function (openerElement) {
          return openerElement.is("img")
            ? openerElement
            : openerElement.find("img");
        },
      },
    });
  }

  /*------------------------------------------
        = FUNCTION FORM SORTING GALLERY
    -------------------------------------------*/
  function sortingGallery() {
    if ($(".sortable-gallery .gallery-filters").length) {
      var $container = $(".gallery-container");
      $container.isotope({
        filter: "*",
        animationOptions: {
          duration: 750,
          easing: "linear",
          queue: false,
        },
      });

      $(".gallery-filters li a").on("click", function () {
        $(".gallery-filters li .current").removeClass("current");
        $(this).addClass("current");
        var selector = $(this).attr("data-filter");
        $container.isotope({
          filter: selector,
          animationOptions: {
            duration: 750,
            easing: "linear",
            queue: false,
          },
        });
        return false;
      });
    }
  }

  sortingGallery();

  /*------------------------------------------
        = MASONRY GALLERY SETTING
    -------------------------------------------*/
  function masonryGridSetting() {
    if ($(".masonry-grids").length) {
      var $grid = $(".masonry-grids").masonry({
        itemSelector: ".post",
        columnWidth: ".post",
        percentPosition: true,
      });

      $grid.imagesLoaded().progress(function () {
        $grid.masonry("layout");
      });
    }
  }

  masonryGridSetting();

  /*------------------------------------------
        = SETTING HEADER MIDDLE LOGO
    -------------------------------------------*/
  function siteMiddleLogoSetting() {
    if (
      $(".header-style-1").length &&
      window.innerWidth > 991 &&
      $("#navbar > ul").length
    ) {
      var nav = $("#navbar > ul");
      var navLi = nav.find(">li");

      if (navLi.length > 1) {
        var midLastLi = nav.find(
          ">li:nth-child(" + Math.ceil(navLi.length / 2) + ")"
        );
        var logo = $(".navbar-brand");
        var logoWidth = $(".navbar-brand").innerWidth();
        $("<li class='logo-middle'></li>").insertAfter(midLastLi).append(logo);
      } else if (navLi.length == 1) {
        nav.find(">li:first-child").css({
          left: -70 + "px",
        });
      }
    } else if (
      $(".header-style-1").length &&
      window.innerWidth < 992 &&
      $("#navbar > ul").length
    ) {
      var logo = $(".header-style-1 .navbar-brand");
      var navOpenBtn = $(".navbar-header button");
      navOpenBtn.after(logo);
    }
  }

  siteMiddleLogoSetting();

  /*------------------------------------------
        = HOME 1 HEADER SEARCH
    -------------------------------------------*/
  if ($(".input-search-form").length) {
    var input = $(".input-search-form");

    input.on("focus", function () {
      input.addClass("width-search-form");
    });

    input.on("focusout", function () {
      input.removeClass("width-search-form");
    });
  }

  /*------------------------------------------
        = HOME 2 HEADER SEARCH
    -------------------------------------------*/
  if ($(".header-search-form-wrapper").length) {
    var serachFormBox = $(".header-search-form-wrapper .header-search-area");
    var openSearchFormBtn = $(".header-search-form-wrapper .search-toggle-btn");
    var closeSeachFormBtn = $(".header-search-form-wrapper .close-form");
    var body = $(".page-wrapper");

    $(document.body).append(serachFormBox);
    serachFormBox.hide();

    openSearchFormBtn.on("click", function (e) {
      serachFormBox.slideDown();
      body.addClass("active-body-overlay");
      return false;
    });

    closeSeachFormBtn.on("click", function () {
      serachFormBox.slideUp();
      body.removeClass("active-body-overlay");
      return false;
    });
  }

  /*------------------------------------------
        = Header shopping cart toggle
    -------------------------------------------*/
  if ($(".mini-cart").length) {
    var cartToggleBtn = $(".cart-toggle-btn");
    var cartContent = $(".mini-cart-content");
    var body = $("body");

    cartToggleBtn.on("click", function (e) {
      cartContent.toggleClass("mini-cart-content-toggle");
      e.stopPropagation();
    });

    body
      .on("click", function () {
        cartContent.removeClass("mini-cart-content-toggle");
      })
      .find(cartContent)
      .on("click", function (e) {
        e.stopPropagation();
      });
  }

  /*------------------------------------------
        = TOGGLE SIDE INFOBAR
    -------------------------------------------*/
  function toggleSideInfo() {
    if ($(".side-info-content").length) {
      var sindeInfo = $(".side-info-content");
      var sideInfoOpenBtn = $(".side-info-bars");
      var sideInfoCloseBtn = $(".side-info-close-btn");
      var body = $(".page-wrapper");

      $(document.body).append(sindeInfo);

      sideInfoOpenBtn.on("click", function (e) {
        sindeInfo.addClass("toggle-side-info");
        body.addClass("active-body-overlay");
        return false;
      });

      sideInfoCloseBtn.on("click", function (e) {
        sindeInfo.removeClass("toggle-side-info");
        body.removeClass("active-body-overlay");
        return false;
      });
    }
  }

  /*------------------------------------------
        = TOUCHSPIN FOR PRODUCT SINGLE PAGE
    -------------------------------------------*/
  if ($(".product-count").length) {
    $(".product-count").TouchSpin({
      verticalbuttons: true,
    });
  }

  /*------------------------------------------
        = TOOLTIP
    -------------------------------------------*/
  $(document).tooltip({
    position: {
      my: "center bottom-20",
      at: "center top",
      using: function (position, feedback) {
        $(this).css(position);
        $("<div>")
          .addClass("arrow")
          .addClass(feedback.vertical)
          .addClass(feedback.horizontal)
          .appendTo(this);
      },
    },
  });

  /*------------------------------------------
        = SHOP PAGE GRID VIEW TOGGLE
    -------------------------------------------*/
  if ($(".woocommerce-toolbar-top").length) {
    var products = $(".products"),
      allButton = $(".products-sizes a"),
      grid4 = $(".grid-4"),
      grid3 = $(".grid-3"),
      listView = $(".list-view");

    allButton.each(function () {
      var $this = $(this);
      $this.on("click", function (e) {
        e.preventDefault();
        $this.addClass("active").siblings().removeClass("active");
        e.stopPropagation();
      });
    });

    grid4.on("click", function (f) {
      products.removeClass("list-view three-column");
      products.addClass("default-column");
      f.stopPropagation();
    });

    grid3.on("click", function (g) {
      products.removeClass("default-column list-view");
      products.addClass("three-column");
      g.stopPropagation();
    });

    listView.on("click", function (h) {
      products.removeClass("default-column three-column");
      products.addClass("list-view");
      h.stopPropagation();
    });
  }

  /*----------------------------
        = SHOP PRICE SLIDER
    ------------------------------ */

  if ($("#slider-range").length) {
    $("#slider-range").slider({
      range: true,
      min: 12,
      max: 200,
      values: [0, 100],
      slide: function (event, ui) {
        $("#amount").val("$" + ui.values[0] + " - $" + ui.values[1]);
      },
    });

    $("#amount").val(
      "$" +
        $("#slider-range").slider("values", 0) +
        " - $" +
        $("#slider-range").slider("values", 1)
    );
  }

  /*------------------------------------------
            = woocommerce
        -------------------------------------------*/
  if ($(".checkout-section").length) {
    var showLogInBtn = $(".woocommerce-info > a");
    var showCouponBtn = $(".showcoupon");
    var shipDifferentAddressBtn = $("#ship-to-different-address");
    var loginForm = $("form.login");
    var couponForm = $(".checkout_coupon");
    var shippingAddress = $(".shipping_address");

    loginForm.hide();
    couponForm.hide();
    shippingAddress.hide();

    showLogInBtn.on("click", function (event) {
      event.preventDefault();
      loginForm.slideToggle();
      event.stopPropagation();
    });

    showCouponBtn.on("click", function (event2) {
      event2.preventDefault();
      couponForm.slideToggle();
      event2.stopPropagation();
    });

    shipDifferentAddressBtn.on("click", function (event3) {
      shippingAddress.slideToggle();
      event3.stopPropagation();
    });
  }

  /*------------------------------------------
        = TOUCHSPIN FOR PRODUCT SINGLE PAGE
    -------------------------------------------*/
  if ($("input.product-count").length) {
    $("input.product-count").TouchSpin({
      verticalbuttons: true,
    });
  }

  /*------------------------------------------
        = PRODUCT ROW SLIDER
    -------------------------------------------*/
  if ($(".product-row-slider").length) {
    $(".product-row-slider").owlCarousel({
      autoplay: false,
      smartSpeed: 300,
      loop: true,
      autoplayHoverPause: true,
      dots: false,
      nav: true,
      navText: [
        '<i class="ti-angle-left"></i>',
        '<i class="ti-angle-right"></i>',
      ],
      responsive: {
        0: {
          items: 1,
        },

        450: {
          items: 2,
          margin: 15,
        },

        550: {
          items: 3,
          margin: 15,
        },

        1200: {
          items: 4,
        },
      },
    });
  }

  /*------------------------------------------
        = HOME 3 TOP PRODUCT SLIDER
    -------------------------------------------*/
  if ($(".top-product-slider".length)) {
    $(".top-product-slider").owlCarousel({
      items: 1,
      loop: true,
      smartSpeed: 450,
      dotData: true,
    });
  }

  /*------------------------------------------
        = TESTIMONIALS SLIDER
    -------------------------------------------*/
  if ($(".testimonials-slider").length) {
    $(".testimonials-slider").owlCarousel({
      autoplay: false,
      smartSpeed: 300,
      margin: 30,
      loop: true,
      autoplayHoverPause: true,
      items: 1,
    });
  }

  /*------------------------------------------
        = POST SLIDER
    -------------------------------------------*/
  if ($(".post-slider".length)) {
    $(".post-slider").owlCarousel({
      mouseDrag: false,
      smartSpeed: 500,
      margin: 30,
      loop: true,
      nav: true,
      navText: [
        '<i class="fi flaticon-back"></i>',
        '<i class="fi flaticon-next"></i>',
      ],
      dots: false,
      items: 1,
    });
  }

  /*----------------------------
        = SHOP PRICE SLIDER
    ------------------------------ */

  const priceSlider = $("#slider-range").data("id");
  const currency = $("#slider-range").data("currency");
  const min = $("#slider-range").data("min");
  const max = $("#slider-range").data("max");

  console.log(min, max);
  console.log(max);
  if ($("#slider-range").length) {
    $("#slider-range").slider({
      range: true,
      min: 0,
      max: Number(priceSlider),
      values: [0, Number(priceSlider)],
      slide: function (event, ui) {
        $("#amount").val(ui.values[1]);
        $("#maxPrice").val(ui.values[1]);
        $("#minAmount").val(ui.values[0]);
        $("#minShowPrice").html(currency + ui.values[0]);
        $("#maxShowPrice").html(currency + ui.values[1]);
      },
    });

    $("#amount").val(
      "$" +
        $("#slider-range").slider("values", 0) +
        " - " +
        currency +
        $("#slider-range").slider("values", 1)
    );
  }

  /*------------------------------------------
        = SHOP DETAILS PAGE PRODUCT SLIDER
    -------------------------------------------*/
  if ($(".shop-single-slider").length) {
    $(".slider-for").slick({
      slidesToShow: 1,
      slidesToScroll: 1,
      arrows: false,
      fade: true,
      asNavFor: ".slider-nav",
    });
    $(".slider-nav").slick({
      slidesToShow: 4,
      slidesToScroll: 1,
      asNavFor: ".slider-for",
      focusOnSelect: true,

      responsive: [
        {
          breakpoint: 500,
          settings: {
            slidesToShow: 3,
            infinite: true,
          },
        },
        {
          breakpoint: 400,
          settings: {
            slidesToShow: 2,
          },
        },
      ],
    });
  }

  /*------------------------------------------
        = NEWSLETTER POPUP 
    -------------------------------------------*/
  function newsletterPopup() {
    var newsletter = $(".newsletter-popup-area-section");
    var newsletterClose = $(".newsletter-close-btn");

    var test = localStorage.input === "true" ? true : false;
    $(".show-message").prop("checked", test || false);

    var localValue = localStorage.getItem("input");

    if (localValue === "true") {
      newsletter.css({
        display: "none",
      });
    }

    newsletter.addClass("active-newsletter-popup");

    newsletterClose.on("click", function (e) {
      newsletter.removeClass("active-newsletter-popup");
      return false;
    });

    $(".show-message").on("change", function () {
      localStorage.input = $(this).is(":checked");
    });
  }

  /*------------------------------------------
        = PRODUCT ARES QUICK VIEW
    -------------------------------------------*/
  if ($("ul.products").length) {
    var product = $("ul.products li.product");

    product.each(function () {
      var quickViewLink = product.find('a[title="Quick view!"]');
      var closeQuickView = product.find(".quick-view-single-product-close-btn");
      var singleProduct = $(".quick-view-single-product");

      var owlStage = $(".owl-stage") ? $(".owl-stage") : null;
      var owlStageOuter = $(".owl-carousel .owl-stage-outer")
        ? $(".owl-carousel .owl-stage-outer")
        : null;

      quickViewLink.on("click", function (e) {
        e.preventDefault();
        $(this)
          .closest(".product")
          .find(".quick-view-single-product")
          .addClass("activve-quick-view-single-product");

        owlStage.addClass("transform-none");
        owlStageOuter.addClass("transform-none");
        return false;
      });

      closeQuickView.on("click", function (f) {
        singleProduct.removeClass("activve-quick-view-single-product");
        owlStage.removeClass("transform-none");
        owlStageOuter.removeClass("transform-none");
        return false;
      });
    });
  }

  /*** insert i tage after Slider SVG element for html validation error ***/
  if (($(".sw-ar-rt") && $(".sw-ar-lf")).length) {
    var swiperLfArr = $(".sw-ar-lf"),
      swiperRtArr = $(".sw-ar-rt");

    swiperLfArr.after('<i class="ti-angle-left"></i>');
    swiperRtArr.after('<i class="ti-angle-right"></i>');
  }

  /*------------------------------------------
        = BACK TO TOP BTN SETTING
    -------------------------------------------*/
  $(".site-footer .lower-footer").append(
    "<a href='#' class='back-to-top'><i class='ti-arrow-up'></i></a>"
  );

  $(".back-to-top").on("click", function () {
    $("html,body").animate(
      {
        scrollTop: 0,
      },
      700
    );
    return false;
  });

  /*==========================================================================
        WHEN DOCUMENT LOADING
    ==========================================================================*/
  $(window).on("load", function () {
    preloader();

    toggleMobileNavigation();

    smallNavFunctionality();

    toggleSideInfo();

    masonryGridSetting();

    if ($(".newsletter-popup-area-section").length) {
      setTimeout(function () {
        newsletterPopup();
      }, "2500");
    }
  });

  /*==========================================================================
        WHEN WINDOW SCROLL
    ==========================================================================*/
  $(window).on("scroll", function () {});

  /*==========================================================================
        WHEN WINDOW RESIZE
    ==========================================================================*/
  $(window).on("resize", function () {
    toggleClassForSmallNav();

    clearTimeout($.data(this, "resizeTimer"));

    $.data(
      this,
      "resizeTimer",
      setTimeout(function () {
        smallNavFunctionality();

        siteMiddleLogoSetting();
      }, 200)
    );
  });

  // Quality Change
  // $("button.btn.btn-default.bootstrap-touchspin-up").on("click", function (e) {
  //   const data = $(".itemqty").val();
  //   const updatedData = Number(data) + 1;
  //   $("input.aaa").val(updatedData);
  //   console.log(updatedData);
  // });
  // $("button.btn.btn-default.bootstrap-touchspin-down").on(
  //   "click",
  //   function (e) {
  //     const data = $(".itemqty").val();
  //     const updatedData = data == 0 ? 0 : Number(data) - 1;
  //     $("input.aaa").val(updatedData);
  //     console.log(updatedData);
  //   }
  // );

  //Add To Cart
  $(".addToCart").on("click", function (e) {
    var form = $("#addToCart");
    var productId = $(this).attr("data-id");
    console.log(productId, "user id");
    e.preventDefault();
    console.log(form.serialize(), "form data");
    $.ajax({
      type: "POST",
      url: "/cart/add",
      dataType: "json",
      data: {
        id: productId,
        quantity: 1,
      },
      success: function (data) {
        var current_url = window.location.href;
        window.location.href = current_url;
      },
    });
  });

  //Remove Product
  $(".removeProduct").on("click", function (e) {
    // var form = $("#cartUpdate");
    var User_id = $(this).attr("data-line");
    console.log(User_id, "user id");
    e.preventDefault();
    $.ajax({
      type: "POST",
      url: "/cart/change",
      dataType: "json",
      data: {
        line: User_id,
        quantity: 0,
      },
      success: function (data) {
        var current_url = window.location.href;
        window.location.href = current_url;
      },
    });
  });

  //Landing page fucntionality
  jQuery(document).ready(function ($) {
    var variation_json =
      '[{"image":"https://ranaplantco.com/wp-content/uploads/2022/09/ancient-with-philo-cordatum-750x1125.jpg","full_src":"https://ranaplantco.com/wp-content/uploads/2022/09/ancient-with-philo-cordatum.jpg","thumb_src":"https://ranaplantco.com/wp-content/uploads/2022/09/ancient-with-philo-cordatum-75x113.jpg","variation_id":684,"image_id":704,"display_regular_price":45,"display_price":45,"display_price2":"45.00","minibar_plants":"philodendron-cordatum","minibar_pots":"ancient"}]';

    variation_json = JSON.parse(variation_json);
    console.log("variation_json", variation_json);

    $(".select_variation").on("click", function (e) {
      e.preventDefault();

      let slug = $(this).data("slug");
      let main_term_slug = $(this).data("name");
      let opt_name = $(this).data("opt_name");
      let id = $(this).data("id");
      //console.log(slug, main_term_slug, id);
      $("a." + main_term_slug).removeClass("active");
      $(this).addClass("active");
      //checkbox
      $("." + main_term_slug).prop("checked", false);
      $("#" + main_term_slug + id).prop("checked", true);
      //table
      $(".selected-product .td-" + main_term_slug).text("");
      $(".selected-product .td-" + main_term_slug).text(opt_name);
      $("#td-" + main_term_slug).text(opt_name);
      $("#tr-" + main_term_slug).removeClass("d-none");
      getSelectedval(variation_json);
    });
    // 	$(".select_package").click(function(){
    // 		getSelectedval(variation_json)
    // 	});
    $("#add_to_cart_miniplant").click(function () {
      let variation_id = $("#variation_id").val();
      let product_id = $("#product_id").val();
      var formdata =
        "product_id=" + product_id + "&variation_id=" + variation_id;
      $.ajax({
        type: "POST",
        url: "https://ranaplantco.com/wp-admin/admin-ajax.php?action=add_to_cart_mini_plant",
        data: {
          action: "add_to_cart_mini_plant",
          product_id: product_id,
          variation_id: variation_id,
        },
        success: function (html) {
          //$("#results").append(html);
          window.location.href = "https://ranaplantco.com/cart";
        },
      });
    });
  });
  function getSelectedval(variation_json) {
    var selectedVal = [];
    jQuery(".getSelected").each(function () {
      let name = jQuery(this).attr("name");
      let val = jQuery(this).val();
      //console.log("name",name);
      //console.log("val",val);
      if (jQuery(this).is(":checked")) {
        if (name == "minibar-plants") {
          selectedVal[0] = val;
        } else if (name == "minibar-pots") {
          selectedVal[1] = val;
        } else if (name == "packaging") {
          selectedVal[2] = val;
        }
      }
      //console.log("selectedVal",selectedVal);
      if (selectedVal.length == 2) {
        variation_json.forEach((variation) => {
          if (
            variation.minibar_plants == selectedVal[0] &&
            variation.minibar_pots == selectedVal[1]
          ) {
            //console.log("variation",variation);
            jQuery(".minibar-wrap .final-product").fadeIn();
            jQuery("#variation_id").val(variation.variation_id);
            jQuery("#variation_img").attr("src", variation.image);
            jQuery(".detail .inner .price").text(
              "Price $" + variation.display_price2
            );
            return false;
          }
        });
      }
    });
  }
})(window.jQuery);
