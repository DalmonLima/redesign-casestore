$(document).ready(function(){

  let newColor;
  let colorCode = "ffffff";
  let author, title, reviewText, reviewCount;
  let reviewsVisible = 0;
  let nextLoad = 2;


//Fixing header on top
  let menuHeight = $('header').outerHeight();
  $('#page-content').css('margin-top',menuHeight + "px");

  function update() {
    var element = document.getElementById("offer-progress");
    var width = 1;
    var identity = setInterval(scene, 1000);
    function scene() {
      if (width >= 100) {
        clearInterval(identity);
      } else {
        width++;
        element.style.width = width + '%';
      }
    }
  }

  //Loading reviews
  function loadReviews(){

    $.ajax({
      url: 'json/reviews.json',
      type: 'GET',
      processData: false,
      contentType: false,
      dataType: 'json',
      success: function(data){

        reviewCount = data.length;
        $('.reviewCount').html(reviewCount);

        nextLoad = reviewsVisible+2;

        for (reviewsVisible; reviewsVisible < nextLoad; reviewsVisible++) {
          author = data[reviewsVisible].author;
          title = data[reviewsVisible].title;
          reviewText = data[reviewsVisible].text;
          date = data[reviewsVisible].date;
          review = 'product-review' + reviewsVisible;

          $('#reviews').append('<div id="'+review+'" class="review"><div class="product-review-heading"><div class="review-summary row"><div class="col-sm-12 col-md-12 col-lg-6 col-xl-6"><h5 class="product-review-title"></h5></div><div class="col-sm-12 col-md-12 col-lg-6 col-xl-6 review-note"><span><i class="fas fa-star"></i></span><span><i class="fas fa-star"></i></span><span><i class="fas fa-star"></i></span><span><i class="fas fa-star"></i></span><span><i class="far fa-star"></i></span></div></div></div><div class="product-review-post"><p class="product-review-text"></p></div><div class="review-footer"><div id="user"><div class="user-image"><span></span></div><div class="user-info"><div><span class="product-review-author"></span></div><div><span class="product-review-period"></span></div></div></div><span class="opinion"><span><a href=""><i class="fas fa-thumbs-up"></i></a><span>5</span></span><span><a href=""><i class="fas fa-thumbs-down"></i></a><span>5</span></span></span></div></div>')

          $('#' + review + ' .product-review-author').html(author);
          $('#' + review + ' .product-review-title').html(title);
          $('#' + review + ' .product-review-text').html(reviewText);
          $('#' + review + ' .product-review-period').html(date);
        }
        if (reviewsVisible >= reviewCount) {
          $('#more-reviews button').remove();
        }

      },
      error: function(e) {
          console.log('Error!', e);
      }
    });
  }

  function imageUpdate(){
    $( ".preview-images" ).click(function() {
      var myImage = $(this).find('img').attr('src');
      $('.preview-images').removeClass('active');
      $("#current-image").attr("src",myImage);
      $(this).addClass('active');
      return false;
    });
  }

  function colorUpdate(){
    $( ".colorPicker" ).click(function() {
      $('.colorPicker').removeClass('active');
      newColor = $(this).find("a").attr('data-color');
      $(this).addClass('active');
      $('#actual-color').html(newColor);

      return false;
    });
  }

  function colorCodeValidation() {
    if (newColor == "rosa") {
      colorCode = "FF7676";
    }
    else if(newColor == "branco"){
      colorCode = "ffffff";
    }
    else{
      return;
    }
  }

  function filterUpdate(){
    $( ".star-filter" ).click(function() {
      $('.star-filter').removeClass('active');
      $(this).addClass('active');
      return false;
    });
  }

  function preview(){

      var name = $('#clientName').val();

      var link = "https://preview.gocase.com.br/poeira-das-estrelas-manuscrita/glittercasesilver-iphone6/mockup?name=" + name + "&color=" + colorCode;

      $("#current-image").attr('src', link);

  }

  $("#apply-btn").click(function(){
    colorCodeValidation();
    preview();
  });

  $('#more-reviews button').click(function(){
    loadReviews();
  });

  $( ".dropdown" ).on( "mouseenter", function() {
      $(this).find('.dropdown-toggle').click();
      console.log("teste");
  });

  filterUpdate();

  colorUpdate();

  imageUpdate();

  loadReviews();

  update();

});
