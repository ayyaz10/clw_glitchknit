$(document).ready(function () {
  var $linkDataObj = {};
  var $productPrice = 275;
  var $BASE_URL = window.location.origin;
  var $TAX = 18.22;
  var $XSMALL = 40109539164242;
  var $SMALL = 40109539197010;
  var $MEDIUM = 40109539229778;
  var $LARGE = 40109539262546;
  var $XLARGE = 40109539295314;

  $linkDataObj.productQty = $(".productqty").val();
  $(".productqty").focusout(function () {
    $linkDataObj.productQty = $(this).val();
  });
  function generateLink(productId) {
    $linkDataObj.productId = productId;
  }

  function error() {
    console.log("please select size");
  }
  function calculateItems() {
    return $linkDataObj.productQty * $productPrice;
  }
  function calculateTax() {
    return $linkDataObj.productQty * $TAX;
    // if ($linkDataObj.productQty < 2) {
    //   return $linkDataObj.productQty * $TAX;
    // } else {
    //   return $linkDataObj.productQty * $TAX - 0.01;
    // }
  }
  function calculateSubTotal() {
    return calculateTax() + calculateItems();
  }

  function populateCheckoutSummary() {
    $(".product-type .product-value").html($linkDataObj.size);
    $(".product-quantity .product-value").html($linkDataObj.productQty);
    $(".product-items .product-payment-value").html(
      "$" + calculateItems().toFixed(2)
    );
    $(".product-tax .product-payment-value").html(
      "$" + calculateTax().toFixed(2)
    );
    $(".product-totalamount-value").html("$" + calculateSubTotal().toFixed(2));
  }

  $(".checkout-button").click(function () {
    // var $MEDIUMSIZE = 40109539229778;
    window.location.href = `${$BASE_URL}/cart/${
      $linkDataObj.productId ? $linkDataObj.productId : $MEDIUM
    }:${$linkDataObj.productQty ? $linkDataObj.productQty : 1}`;
  });

  $(".size").click(function (e) {
    $(".size").removeClass("size-selected");
    $(this).addClass("size-selected");
    var sizeText = $(this).text();
    $linkDataObj.size = sizeText;
    if (sizeText === "XS") {
      generateLink($XSMALL);
      return;
    } else if (sizeText === "S") {
      generateLink($SMALL);
      return;
    } else if (sizeText === "M") {
      generateLink($MEDIUM);
      return;
    } else if (sizeText === "L") {
      generateLink($LARGE);
      return;
    } else if (sizeText === "XL") {
      generateLink($XLARGE);
      return;
    }
  });

  // image slider
  $(".slide-next").on("click", function () {
    var currentImg = $(".active");
    var nextImg = currentImg.next();

    if (nextImg.length) {
      currentImg.removeClass("active").css("z-index", -10);
      nextImg.addClass("active").css("z-index", 10);
    }
  });
  $(".slide-prev").on("click", function () {
    var currentImg = $(".active");
    var prevImg = currentImg.prev();
    if (prevImg.length) {
      currentImg.removeClass("active").css("z-index", -10);
      prevImg.addClass("active").css("z-index", 10);
    }
  });
  // $('.slider-image').magnificPopup({type:'image', delegate: 'a'});
  $(".slider-inner").magnificPopup({
    type: "image",
    delegate: "a",
    gallery: {
      enabled: true,
    },
    mainClass: "mfp-with-zoom",
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

  // slide from 3d video to product images
  var slideup = $(".slideup");
  var slidedown = $(".slidedown");
  var slideleft = $(".slideleft");
  var slideright = $(".slideright");
  var checkproceed = $(".proceed-button");
  var summaryback = $(".summary-back-link");
  var product = $(".product-container");
  var topOffset = slidedown.offset().top;
  var rightOffset = slideright.offset().left;
  var productHeight = product.innerHeight();
  var productWidth = product.innerWidth();

  slidedown.css({ top: -(topOffset + productHeight) });
  slideleft.css({ left: -(200 + productWidth) });

  slideup.click(function () {
    slideup.animate(
      {
        top: -(topOffset + 360),
        opacity: "0",
      },
      {
        queue: false,
        duration: 1000,
      },
      "slow"
    );
    slidedown.animate(
      {
        top: 100,
        opacity: "1",
      },
      {
        queue: false,
        duration: 1000,
      },
      "slow"
    );
  });

  checkproceed.click(function () {
    populateCheckoutSummary();
    slideright.animate(
      {
        left: -(productWidth + 200),
        opacity: "0",
      },
      {
        queue: false,
        duration: 1000,
      },
      "slow"
    );
    slideleft.animate(
      {
        left: 50 + "%",
        translate: -50 + "%",
        top: 0,
        opacity: "1",
      },
      {
        queue: false,
        duration: 1000,
      },
      "slow"
    );
  });
  summaryback.click(function () {
    slideright.animate(
      {
        left: 50 + "%",
        translate: -50 + "%",
        opacity: "1",
      },
      {
        queue: false,
        duration: 1000,
      },
      "slow"
    );
    slideleft.animate(
      {
        left: -(productWidth + 200),
        opacity: "0",
      },
      {
        queue: false,
        duration: 1000,
      },
      "slow"
    );
  });
});
