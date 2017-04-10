$(document).ready(function(){
	//functions to make the search bar go at the top of the page when enter is clicked
	//!!!RUN IN CHROME FOR BEST RESULTS!!!
	//1.0 - Search bar dynamical vertical align
	var height = $(window).height()/5.5;
	$(".searchBox").css({"padding-top": height});
	$("#secondPos").css({"padding-top": height});
	
	$( window ).resize(function() {
	var height = $(window).height()/5.5;
	$(".searchBox").css({"padding-top": height});
	$("#secondPos").css({"padding-top": height});
	});
	//1.0 - End
	
	//1.1 - Search bar onClick Event function
	$(".input-group-btn").click(function(e){
		//if the button is clicked, the searchbar goes at the top
		e.preventDefault();
		changePage();
		window.sessionStorage.setItem("savedSearch",$('.form-control').val());
	});
	
	function changePage(){
		$(".searchBox").animate({"padding-top": "40px"},"1000","swing");
		$("#mainLogo").css({"width": "30%", "height": "30%"});
		$("#mainLogo").delay(1000).animate({"padding-left": "470px"},"600");
		$("#mainLogo").detach().appendTo("#secondPos").delay(2000);
		setTimeout(function() {window.open ('filled.html','_self',false);}, 1000);
	}
		
	//1.1 - End
	
	//1.2 - Drop down menu for the search bar
});

