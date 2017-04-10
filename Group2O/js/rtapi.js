/*
* jQuery UI Autocomplete: Load Data via AJAX
* Function for the autocomplete using rotten tomatoes api as a source.
*/
$(function() {
	$("#searchInput").autocomplete({
			delay: 500,
			minLength: 3,
			source: function(request, response) {
				$.getJSON("http://api.rottentomatoes.com/api/public/v1.0/movies.json?callback=?", {
					apikey: "6czx2pst57j3g47cvq9erte5",
					q: request.term,
					page_limit: 10
				}, function(data) {
					// data is an array of objects and must be transformed for autocomplete to use
					var array = data.error ? [] : $.map(data.movies, function(m) {
						return {
							label: m.title + " (" + m.year + ")",
							url: m.links.alternate
						};
					});
					response(array);
					
				});
			},
			select: function(event, ui){
				window.sessionStorage.setItem("savedSearch",ui.item.value.toString());
				$(".searchBox").animate({"padding-top": "40px"},"1000","swing");
				$("#mainLogo").css({"width": "30%", "height": "30%"});
				$("#mainLogo").delay(1000).animate({"padding-left": "470px"},"600");
				$("#mainLogo").detach().appendTo("#secondPos").delay(2000);
				setTimeout(function() {window.open ('filled.html','_self',false);}, 1000);
			}
	});
});
//TMDb key 13aa3998c48bee6eb658bbd2ae1a926f