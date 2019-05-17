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
    var author, title, text;

    $.ajax({
      url: 'json/comments.json',
      type: 'GET',
      processData: false,
      contentType: false,
      dataType: 'json',
      success: function(data){

        for (var i = 0; i < data.length; i++) {
          author = data[i].author;
          title = data[i].title;
          text = data[i].text;
          review = 'product-review' + i;


          $('#comments').append('<div id="'+review+'"><div class="product-review-heading"><div class="review-header"><h4 class="product-review-title"></h4><span class="product-review-period"></span></div><span class="product-review-author"></span><div><span data-icon="*"></span><span data-icon="*"></span><span data-icon="*"></span><span data-icon="*"></span><span data-icon="*"></span></div></div><div class="product-review-post"><p class="product-review-text"></p></div><hr></div>')

          $('#' + review + ' .product-review-author').html(author);
          $('#' + review + ' .product-review-title').html(title);
          $('#' + review + ' .product-review-text').html(text);
        }

      },
      error: function(e) {
          console.log('Error!', e);
      }
    });
  }

  loadComment();

  update();

});
