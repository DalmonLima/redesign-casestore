$(document).ready(function(){

  function getRandomSuggestion() {
      return (Math.floor(Math.random() * 4) +1);
  }

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

  //Make a question
  function loadComment(){
    var author, title, text, reviewCount;

    $.ajax({
      url: 'json/comments.json',
      type: 'GET',
      processData: false,
      contentType: false,
      dataType: 'json',
      success: function(data){

        reviewCount = data.length;
        
        $('.reviewCount').append(reviewCount);

        for (var i = 0; i < data.length; i++) {
          author = data[i].author;
          title = data[i].title;
          text = data[i].text;
          date = data[i].date;
          review = 'product-review' + i;


          $('#comments').append('<div id="'+review+'" class="comment"><div class="product-review-heading"><div class="review-header row"><div class="col-sm-12 col-md-12 col-lg-6 col-xl-6"><h5 class="product-review-title"></h5></div><div class="col-sm-12 col-md-12 col-lg-6 col-xl-6 comment-note"><span><i class="fas fa-star"></i></span><span><i class="fas fa-star"></i></span><span><i class="fas fa-star"></i></span><span><i class="fas fa-star"></i></span><span><i class="far fa-star"></i></span></div></div></div><div class="product-review-post"><p class="product-review-text"></p></div><div class="comment-footer"><div id="user"><div class="user-image"><span></span></div><div class="user-info"><div><span class="product-review-author"></span></div><div><span class="product-review-period"></span></div></div></div><span class="opinion"><span><a href=""><i class="fas fa-thumbs-up"></i></a><span>5</span></span><span><a href=""><i class="fas fa-thumbs-down"></i></a><span>5</span></span></span></div></div>')

          $('#' + review + ' .product-review-author').html(author);
          $('#' + review + ' .product-review-title').html(title);
          $('#' + review + ' .product-review-text').html(text);
          $('#' + review + ' .product-review-period').html(date);
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
      console.log(myImage);
      $("#current-image").attr("src",myImage);
      $(this).addClass('active');
      return false;
    });
  }

  function colorUpdate(){
    $( ".colorPicker" ).click(function() {
      $('.colorPicker').removeClass('active');
      var newColor = $(this).find("a").attr('data-color');
      $(this).addClass('active');
      $('#actual-color').html(newColor);
      return false;
    });
  }

  function filterUpdate(){
    $( ".star-filter" ).click(function() {
      $('.star-filter').removeClass('active');
      $(this).addClass('active');
      return false;
    });
  }

  filterUpdate();

  colorUpdate();

  imageUpdate();

  loadComment();

  update();

});
