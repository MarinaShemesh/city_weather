/* Let's go FETCH our data */

var fetch = function (isbn) {
  console.log("button clicked");
  $.ajax({
    method: "GET",
    url: 'https://www.googleapis.com/books/v1/volumes?q=isbn:'+ isbn,
    dataType: "json",
    success: function(data) {
      newResult(data);
    },
    error: function(jqXHR, textStatus, errorThrown) {
      console.log(textStatus);
    }
  });
};

var source = $('#search-template').html();
var template = Handlebars.compile(source);


var newResult = function(data) {
  var newHTML = template({ title: data.items[0].volumeInfo.title , description: data.items[0].volumeInfo.description, author: data.items[0].volumeInfo.authors[0], image: data.items[0].volumeInfo.imageLinks.thumbnail });
  $('.search-results').append(newHTML);
}

$('#search-btn').on('click', function() {
  var isbn = $('.search-bar').val();
  $('.search-results').empty();
  if (isbn.length > 0) {
    fetch(isbn);
    console.log(isbn);
  } else {
    alert("Don't forget to enter an ISBN!")
  }

});