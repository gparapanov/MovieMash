$(document).ready(function(){
	//!!!RUN IN CHROME FOR BEST RESULTS!!!
	//functions, which get data from obdb api and tmdb api, used to fill the results for a movie.
	var searchFill = window.sessionStorage.getItem("savedSearch");
	$(".form-control").val(searchFill);
	$(".input-group-btn").click(function(){
	    var searchValue=$('.form-control').val();
	    window.sessionStorage.setItem("savedSearch",searchValue); 
	});
	getResultsFromOmdbApi(searchFill);
	getResultsFromTmdb(searchFill);
	
});

function getResultsFromOmdbApi (searchterms) {
	// get results about a movie from omdb api
	var searchVal;
	var year;
	var url;
	if(searchterms.substring(searchterms.length-1)==')'){
		searchVal=searchterms.substring(0,searchterms.length-6);
		year=searchterms.substring(searchterms.length-5,searchterms.length-1);
		url = "http://www.omdbapi.com/?t="+searchVal+"&plot=full&tomatoes=true&y="+year;
		//when the autocomplete is clicked the value of the searchbox is the title + (year)
		//it will detect if a year is present, then it would be included in the search
	}else{
		//otherwise just use everything that's in the search bar i.e. title
		searchVal=searchterms;
		url = "http://www.omdbapi.com/?t="+searchVal+"&plot=full&tomatoes=true";
	}
		//use jquery json shortcut
		$.getJSON(url, function(jsondata){
			//handle the results
			addResultTitles(jsondata);
		});
}

function getResultsFromTmdb (searchterms) {
	//this function gets the trailer and movie poster from tmdb 
	var searchVal;
	var year;
	var url;
	if(searchterms.substring(searchterms.length-1)==')'){
		//when the autocomplete is clicked the value of the searchbox is the title + (year)
		//it will detect if a year is present, then it would be included in the search
		searchVal=searchterms.substring(0,searchterms.length-6);
		year=searchterms.substring(searchterms.length-5,searchterms.length-1);
		url = "http://api.themoviedb.org/3/search/movie?query="+searchVal+"&year="+year+"&api_key=2a0f566dc0d41ba71da4232f359c4bce";
	}else{
		//otherwise just use everything that's in the search bar i.e. title
		searchVal=searchterms;
		url = "http://api.themoviedb.org/3/search/movie?query="+searchVal+"&api_key=2a0f566dc0d41ba71da4232f359c4bce";
	}
		//use jquery json shortcut
		$.getJSON(url, function(jsondata){
			//handle the results
			addPoster(jsondata);
			getTrailer(jsondata);
		});
}

function addPoster(jsondata){
	//add the movie poster to filled.html
	var poster=jsondata.results[0].poster_path;
	var posterURL="http://image.tmdb.org/t/p/w500"+poster;
	$("#filmPoster").attr("src",posterURL);
}
function getTrailer(jsondata){
	var id=jsondata.results[0].id;//get the actual link to the movie in tmdb so that another
	//json could be requested for the video link only
	var url="http://api.themoviedb.org/3/movie/"+id+"/videos?api_key=2a0f566dc0d41ba71da4232f359c4bce";
	$.getJSON(url, function(jsondata){
			//handle the results
			addTrailer(jsondata);
		});
}
function addTrailer(jsondata){
	//once we have the link to the trailer
	//add the movie trailer from youtube to filled.html
	var source=jsondata.results[0].key;
	var url="https://www.youtube.com/embed/"+source;
	$("#trailer").attr("src",url);
}

function addResultTitles(jsondata) {
	//create a string to contain our HTML code to inject
	//iterate over the collection of results
	//here we find all the data from the json, returned from the other function
	//and insert it in the filled.html
	var title = jsondata.Title;
	var year = jsondata.Year;
	var description = jsondata.Plot;
	var actors = jsondata.Actors;
	var director = jsondata.Director;
	var ratingIMDB = parseFloat(jsondata.imdbRating);
	var ratingTomato = (parseFloat(jsondata.tomatoUserRating)) * 2;
	var metascore = jsondata.Metascore;
	var movieScore = parseFloat(metascore) / 10;
	var overall = (ratingIMDB + ratingTomato + movieScore) / 3;
	var imdbid=jsondata.imdbID;
	var imdbLink="http://www.imdb.com/title/"+imdbid;
	var imdbSmall="<img src=\"http://img4.wikia.nocookie.net/__cb20130124112826/logopedia/images/8/8e/IMDB.png\" height=\"27\" width\"33\" id=\"imdbLogo\" alt=\"imdbLogo\">";
	var tomatoSmall="<img src=\"http://www.esotericarticles.com/wp-content/uploads/rotten-tomatoes-logo.png\" height=\"35\" width\"49\" id=\"tomatoLogo\" alt=\"imdbLogo\">";
	var mmSmall="<img src=\"./img/MovieMashLogo.png\" height=\"26\" width\"33\" id=\"mmLogo\" alt=\"movieMashLogo\">";

    $("#movieTitle").html(title+" ("+year+")<br>");
    $("#description").append(description);
    $("#actors").append(actors);
    $("#directorName").append(director);
    $("#imdbScore").html(ratingIMDB+imdbSmall);
    $("#tomatoScore").html(ratingTomato+tomatoSmall);
    $("#ourScore").html(movieScore+mmSmall);
    $("#totalScore").html(overall.toPrecision(2));
    $("#imdbLINK").attr("href",imdbLink);

}

//TMDb key 13aa3998c48bee6eb658bbd2ae1a926f
