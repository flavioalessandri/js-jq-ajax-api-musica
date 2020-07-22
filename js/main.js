
// Attraverso una chiamata ajax all'Api di boolean avremo a
// disposizione una decina di dischi musicali.
// Servendoci di handlebars stampiamo tutto a schermo.
// In questo momento non è importante la parte grafica.
// Bonus: Creare una select con i seguenti generi: pop, rock,
// metal e jazz. In base a cosa scegliamo nella select vedremo i
// corrispondenti cd.
// Chiamata:
// https://flynn.boolean.careers/exercises/api/array/music



// funzione al momento funzionante ...
function getApiData(){

  $.ajax({
    url : 'https://flynn.boolean.careers/exercises/api/array/music',
    method : "GET",
    success : function (data,state){

      var array = data['response'];
      var success = data ['success'];

      console.log("Music List : ", array);



      },

    error : function(err){
      console.log("error", err);
      } // end of error-function

  }); // end of ajax function
}



function getApiDataMod(){

  $.ajax({
    url : 'https://flynn.boolean.careers/exercises/api/array/music',
    method : "GET",
    success : function (data,state){

      var array = data['response'];
      var arrayLength = array.length;
      var success = data ['success'];

      var author = array[1]['author'];
      console.log("autore" , author);

      console.log("Album List : ", array);
      console.log(" How many music Album inside : ", array.length);

      var template = $('#template').html();
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
        );// compiled objectHTML finish

        target.append(objectHTML);
      }



      },

    error : function(err){
      console.log("error", err);
      } // end of error-function

  }); // end of ajax function
}





function init(){
  console.log("init");

  getApiDataMod();

}



$(document).ready(init);


// contenuto API boolean a metodo get
//
// ElementsByClassName({
//     "success": true,
//     "response": [
//         {
//             "poster": "https://www.onstageweb.com/wp-content/uploads/2018/09/bon-jovi-new-jersey.jpg",
//             "title": "New Jersey",
//             "author": "Bon Jovi",
//             "genre": "Rock",
//             "year": "1988"
//         },
//         {
//             "poster": "https://images.pyramidshop.com/images/_popup/ACPPR48056.jpg",
//             "title": "Live at Wembley 86",
//             "author": "Queen",
//             "genre": "Pop",
//             "year": "1992"
//         },
//         {
//             "poster": "https://images-na.ssl-images-amazon.com/images/I/41JD3CW65HL.jpg",
//             "title": "Ten's Summoner's Tales",
//             "author": "Sting",
//             "genre": "Pop",
//             "year": "1993"
//         },
//         {
//             "poster": "https://cdn2.jazztimes.com/2018/05/SteveGadd-800x723.jpg",
//             "title": "Steve Gadd Band",
//             "author": "Steve Gadd Band",
//             "genre": "Jazz",
//             "year": "2018"
//         },
//         {
//             "poster": "https://images-na.ssl-images-amazon.com/images/I/810nSIQOLiL._SY355_.jpg",
//             "title": "Brave new World",
//             "author": "Iron Maiden",
//             "genre": "Metal",
//             "year": "2000"
//         },
//         {
//             "poster": "https://upload.wikimedia.org/wikipedia/en/9/97/Eric_Clapton_OMCOMR.jpg",
//             "title": "One more car, one more raider",
//             "author": "Eric Clapton",
//             "genre": "Rock",
//             "year": "2002"
//         },
//         {
//             "poster": "https://images-na.ssl-images-amazon.com/images/I/51rggtPgmRL.jpg",
//             "title": "Made in Japan",
//             "author": "Deep Purple",
//             "genre": "Rock",
//             "year": "1972"
//         },
//         {
//             "poster": "https://images-na.ssl-images-amazon.com/images/I/81r3FVfNG3L._SY355_.jpg",
//             "title": "And Justice for All",
//             "author": "Metallica",
//             "genre": "Metal",
//             "year": "1988"
//         },
//         {
//             "poster": "https://img.discogs.com/KOBsqQwKiNKH-q927oHMyVdDzSo=/fit-in/596x596/filters:strip_icc():format(jpeg):mode_rgb():quality(90)/discogs-images/R-6406665-1418464475-6120.jpeg.jpg",
//             "title": "Hard Wired",
//             "author": "Dave Weckl",
//             "genre": "Jazz",
//             "year": "1994"
//         },
//         {
//             "poster": "https://m.media-amazon.com/images/I/71K9CbNZPsL._SS500_.jpg",
//             "title": "Bad",
//             "author": "Michael Jacjson",
//             "genre": "Pop",
//             "year": "1987"
//         }
//     ]
// })
