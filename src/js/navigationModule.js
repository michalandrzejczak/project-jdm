$(function() {
	
	const html = $("html"),
				navItems = $("nav li"),
				navLinks = $("nav a"),
				sections = $("section"),
				arrowNext = $(".arrow-next"),
				arrowPrevious = $(".arrow-previous"),
				arrows = $(".arrows-container i");
	
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
	
	// links navigation
	navLinks.on("click", scrollToLink);
	function scrollToLink(event) {
		const target = $(this.getAttribute("href"));
		if (!target) {
			event.preventDefault();
			html.stop().animate({
				scrollLeft: 0
			}, scrollTime);
		} else {
			event.preventDefault();
			html.stop().animate({
				scrollLeft: target.offset().left
			}, scrollTime);
		}
	};
	
	// following active section during movement and selecting it on navbar
	$(window).on("scroll", function () {
		let currentPos = $(this).scrollLeft() + pixelStep/2;
		currentPos = $(this).scrollLeft() + pixelStep/2;
		sections.each(function (i) {
			let leftPos = $(this).offset().left,
					rightPos = leftPos + $(this).outerWidth();
			if (currentPos > leftPos && currentPos < rightPos) {
				navItems.removeClass();
				$("nav").find('a[href="#' + $(this).attr('id') + '"]').parent().addClass('active');
			}
		
			// hiding useless navigation arrows
			let firstSectionPos = ($("#page-intro").offset().left + $("#page-intro").outerWidth()),
					 lastSectionPos = $("#page-outro").offset().left;
			if (currentPos <= firstSectionPos) {
				arrowPrevious.css("visibility", "hidden");
			}
			else if (currentPos >= lastSectionPos) {
				arrowNext.css("visibility", "hidden");
			} 
			else {
				arrowPrevious.css("visibility", "visible");
				arrowNext.css("visibility", "visible");
			}
		})
	});
		
	// arrows navigation
	arrows.click(function() {
		if ($(this).attr("class") == arrowPrevious.attr("class")) {
			html.animate({
				scrollLeft: `-=${pixelStep}`
			}, scrollTime);
		} else if ($(this).attr("class") == arrowNext.attr("class")) {
			html.animate({
				scrollLeft: `+=${pixelStep}`
			}, scrollTime);
		}
	})
});