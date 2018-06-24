$(function() {
	const html = $("html");
	let pixelStep = $(window).width(),
			scrollTime,
			scrollDebounce = true; // used to delay mousewheel event trigger
	
	// adjust scrollTime to a viewport
	function adjustTime() {
		if (pixelStep<800) {
			scrollTime = 700; 
		}
		else {
			scrollTime = 1500;
		}
	}
	adjustTime();
	
	
	// mousewheel navigation
	html.mousewheel(function(event, delta) { 
		if (scrollDebounce) {
			scrollDebounce = false;
			if(delta < 0) // if scroll down
			{    
				html.animate({
					scrollLeft: `+=${pixelStep}`
				}, scrollTime)
			}
			else if(delta > 0) // if scroll up
			{  
				html.animate({
					scrollLeft: `-=${pixelStep}`
				}, scrollTime)
			}
			event.preventDefault();
			setTimeout(function() {
				scrollDebounce = true;
			}, scrollTime);
		}
		
	});
	
	// arrows navigation
	window.addEventListener("keydown", event => {
		switch (event.keyCode) {
			case 37: // arrow left
			case 38: // arrow up
				html.animate({
					scrollLeft: `-=${pixelStep}`
				}, scrollTime);
				break;
			case 39: // arrow right
			case 40: // arrow down
				html.animate({
					scrollLeft: `+=${pixelStep}`
				}, scrollTime);
				break;
		}});
	
	// change of pixelStep when viewport is changed
	window.onresize = function() {
		pixelStep = $(window).width();
		adjustTime();
	}
});