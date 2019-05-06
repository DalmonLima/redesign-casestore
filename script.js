console.log("teste");

function getRandomSuggestion() {
    return (Math.floor(Math.random() * 4) +1);
}

function suggest(){
var rdm = getRandomSuggestion();
console.log(rdm);

$.ajax({
    url: 'json/suggestion.json',
    type: 'GET',
    processData: false,
    contentType: false,
    dataType: 'json',
    success: function(data){
    console.log(data.suggestion[rdm]);
    correctName = data.suggestion[rdm];
    },
    error: function(e) {
      console.log('Error!', e);
    }
    });
    console.log( rdm );
    $('#picture>img').remove();
    $('#picture').append('<img src="imagens/normal/'+rdm+'.png" />');
}