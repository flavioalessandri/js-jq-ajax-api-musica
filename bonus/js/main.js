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
        selectMusicGenre(arrayLength,array);
        sortAlbumByGenre();  // function to sort album using select tag

      } //end of if(success)
    },

    error : function(err){
      console.log("error", err);
      } // end of error-function

  }); // end of ajax function
}

// function to sort album using <select> tag-----------------------------
function sortAlbumByGenre(){
  $(document).on("change",'#select', function(){
    var input = $('#select').val();

    var stringa = "all_genre";

    $('.album-container').addClass('hidden');
    $('.album-container').removeClass('active');

    $('.album-container').each(function(){

      if(input === $(this).attr('data-genere')){

      $(this).removeClass('hidden');
      $(this).addClass('active');


    }else if(input === stringa ) {
      $('.album-container').addClass('active');
      $('.album-container').removeClass('hidden');
      }
    })  //end of each() function
  }); //end of on."change" function
}

// function to get genre value from API and append them into <option> tag-----------------------------
function selectMusicGenre(arrayLength,array){

  var src_template = $('#search_template').html();
  var src_compiled = Handlebars.compile(src_template);
  var src_target= $('.container #select');
  var lista = [];

  for (var i = 0; i < arrayLength; i++) {

    var genre_type = array[i]['genre'];
    if(lista.indexOf(genre_type)=== -1){
      lista.push(genre_type);
      var selectHTML = src_compiled({'genre' : genre_type});
      src_target.append(selectHTML);

    } else{
      console.log("esiste gia");
    }
  }//end of for cycle
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
  getApiData();
}

$(document).ready(init);
