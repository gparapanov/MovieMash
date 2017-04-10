// For the lightbox effect on the ratings film reel
$(document).ready(function(){
			
	// link to open the dialog
	$("#dialog-link").click( function(event){
		$("#dialog").dialog("open");
		event.preventDefault();
		});

	// initialise the dialog
	$("#dialog")
		.dialog({
			autoOpen: false,
			modal: true,
			width: 650,
			buttons: 
				[{
				text: "Close",
				click: function() {
				$(this).dialog("close");						
				}
				}]
		});
	});