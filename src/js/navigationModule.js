$(function() {
	const doc = $("html, body");
	const pixelStep = 2020;
	
	// mousewheel navigation
	doc.mousewheel(function(event, delta) { 
		if(delta<0) // if scroll down
		{    
			doc.stop().animate({
				scrollLeft: `+=${pixelStep}`
			}, 1500);
		}
		else if(delta>0) // if scroll up
		{  
			doc.stop().animate({
				scrollLeft: `-=${pixelStep}`
			}, 1500);
		}
		event.preventDefault();
	});
	
	// arrows navigation
	window.addEventListener("keydown", event => {
		switch (event.keyCode) {
			case 37: // arrow left
			case 38: // arrow up
				doc.stop().animate({
					scrollLeft: `-=${pixelStep}`
				}, 1500);
				break;
			case 39: // arrow right
			case 40: // arrow down
				doc.stop().animate({
					scrollLeft: `+=${pixelStep}`
				}, 1500);
				break;
		}});
});