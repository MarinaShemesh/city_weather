var temps = [];

var fetch = function (city){//1.first get /"fetch" the information
    $.ajax({
      method: "GET",
      url: "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=d703871f861842b79c60988ccf3b17ec",
      dataType: "json",
      success: function(data) {
          //console.log(data);
          var temperature = Math.round(data.main.temp -= 273);//getting the temp. in Celsius
          var name = data.name;//getting the city's name
          var description = data.weather["0"].main;//getting the description

          addCity({
              name: name,
              temperature: temperature,
              description: description
          });  
      },
      error: function(jqXHR, textStatus, errorThrown) {
        console.log(textStatus);
      }

    });
}//put the ajax inside the fetch function


function addCity(newCity){ //2. now push to the array
  temps.push(newCity);
  renderView();
}


function renderView(){ //3. Go through your loop and add to the view
  $(".weather-list").empty();

  for (i = 0; i < temps.length; i++) {
    $(".weather-list").append('<p>' + temps[i].name + ' ' 
      + temps[i].temperature + ' ' 
      + '&deg;C' + '  -  ' //add degrees symbol and spaceholder
      + temps[i].description + '</p>'); {

      if (temps[i].temperature >= 30) 
      $("body").css({"background-color":"#D51313"});
      }

     { if (temps[i].temperature > 20 && temps[i].temperature < 30 ) 
      $("body").css({"background-color":"#feff5f"});
      }

      { if (temps[i].temperature >= 10 && temps[i].temperature <= 20 ) 
      $("body").css({"background-color":"blue"});
      }

      { if (temps[i].temperature < 10 ) 
      $("body").css({"background-color":"#B0E2FF"});
      }
              
   
    $("#input1").val(" ");//clear the input box after render
    $("body").val(" ");//change the background colour with the next city
   }

 }


$(".post-city").on("click", function(){//4. Click event talks to the fetch function
  var city = $('.city-input').val();
  // alert(city);
  fetch(city);///calling the fetch function
 });