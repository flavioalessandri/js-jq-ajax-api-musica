// Attraverso una chiamata ajax all'Api di boolean avremo a
// disposizione una decina di dischi musicali.
// Servendoci di handlebars stampiamo tutto a schermo.

// Bonus: Creare una select con i seguenti generi: pop, rock,
// metal e jazz. In base a cosa scegliamo nella select vedremo i
// corrispondenti cd.

// function to return Data(values) from Api Objects----------

// ---non funziona------
function sortAlbumByGenre(){
  $(document).on("change",'#select', function(){
    // $('.album-container').addClass('hidden');
    $('div[class="album-container"]').addClass('hidden');
    var input = $('#select').val();
    var target = $('div[class="album-container"][data-genere ="'+ input +'"]');
    target.removeClass('hidden');
    target.addClass('active');
  });

}


function selectGenre(){
  console.log("genre");
  $.ajax({
    url : 'https://flynn.boolean.careers/exercises/api/array/music',
    method : "GET",
    success : function(data,state){

      var array = data['response'];
      var arrayLength = array.length;
      var success = data ['success'];

      if(success){
        var template = $('#search_template').html();
        var compiled = Handlebars.compile(template);
        var target= $('.container #select');
        var lista = [];

        for (var i = 0; i < arrayLength; i++) {
          var genre_type = array[i]['genre'];
          if(lista.indexOf(genre_type)=== -1){
            lista.push(genre_type);
            var selectHTML = compiled({'genre' : genre_type});
            target.append(selectHTML);

          } else{
            console.log("esiste gia");
        }
          console.log("ecco i generi", genre_type);
        }//end of for cycle
      } //end of if(success)
    },

    error : function(err){
      console.log("error", err);
      } // end of error-function

  }); // end of ajax function
}


function getApiData(){

  $.ajax({
    url : 'https://flynn.boolean.careers/exercises/api/array/music',
    method : "GET",
    success : function(data,state){

      var array = data['response'];
      var arrayLength = array.length;
      var success = data ['success'];

      console.log("Album List : ", array);
      console.log(" How many music Album inside : ", array.length);

      if(success){
        cycleThroughAlbum(arrayLength,array);
        sortAlbumByGenre();

      } //end of if(success)
    },

    error : function(err){
      console.log("error", err);
      } // end of error-function

  }); // end of ajax function
}


// function to cycle into the Album list to get usefull values----------
function cycleThroughAlbum(arrayLength,array){

  var template = $('#album_template').html();
  var compiled = Handlebars.compile(template);
  var target= $('.cds-container.container');

  // ciclo gli oggetti della lista prendendone i valori dalle chiavi rispettive

  for (var i = 0; i < arrayLength; i++) {

    var author_name = array[i]['author'];
    var genre_type = array[i]['genre'];
    var img_cover_album = array[i]['poster'];
    var title_album = array[i]['title'];
    var date_album = array[i]['year'];

    var objectHTML = compiled(
      {
        //key value to be compiled
        'author' : author_name,
        'genre'  : genre_type,
        'poster' : img_cover_album,
        'title'  : title_album,
        'year'   : date_album
        //key value to be compiled
      }
    );  // compiled objectHTML finish

    target.append(objectHTML);



  }//end of for cycle
}

 // My Functions Container------------------------------

function init(){
  console.log("init");
  getApiData();
  selectGenre();
  // sortAlbumByGenre();
}

$(document).ready(init);
