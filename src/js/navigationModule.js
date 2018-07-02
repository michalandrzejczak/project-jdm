$(function () {

	const body = $("body"),
		navItems = $("nav li"),
		navLinks = $("nav a"),
		sections = $("section"),
		sectionsArray = [],
		arrowNext = $(".arrow-next"),
		arrowPrevious = $(".arrow-previous"),
		arrows = $(".arrows-container i");

	let pixelStep = $(window).width(),
		scrollTime,
		scrollDebounce = true; // used to delay mousewheel event trigger

	// adjust scrollTime to a viewport
	function adjustTime() {
		if (pixelStep < 800) {
			scrollTime = 700;
		} else {
			scrollTime = 1500;
		}
	}
	adjustTime();


	// mousewheel navigation
	body.mousewheel(function (event, delta) {
		if (scrollDebounce) {
			scrollDebounce = false;
			
			if (delta < 0) // if scroll down
			{
				body.animate({
					scrollLeft: `+=${pixelStep}`
				}, scrollTime)
			} else if (delta > 0) // if scroll up
			{
				body.animate({
					scrollLeft: `-=${pixelStep}`
				}, scrollTime)
			}
			event.preventDefault();
			
			setTimeout(function () {
				scrollDebounce = true;
			}, scrollTime);
		}
	});
	
	// keyboard arrows navigation
	window.addEventListener("keydown", event => {
		switch (event.keyCode) {
			case 37: // arrow left
			case 38: // arrow up
				body.animate({
					scrollLeft: `-=${pixelStep}`
				}, scrollTime);
				break;
			case 39: // arrow right
			case 40: // arrow down
				body.animate({
					scrollLeft: `+=${pixelStep}`
				}, scrollTime);
				break;
		}
	});

	// change of pixelStep when viewport is changed
	window.onresize = function () {
		pixelStep = $(window).width();
		adjustTime();
	}

	// links navigation (supporting body {position: relative})
	sections.each(function (i) {
		sectionsArray.push("#" + sections[i].getAttribute("id"));
	});

	navLinks.on("click", scrollToLink);

	function scrollToLink(event) {
		const target = this.getAttribute("href"),
			moveStep = sectionsArray.indexOf(target);
		if (!target) {
			event.preventDefault();
			body.stop().animate({
				scrollLeft: 0
			}, scrollTime);
		} else {
			event.preventDefault();
			body.stop().animate({
				scrollLeft: moveStep * pixelStep
			}, scrollTime);
		}
	};

	// following active section during movement and selecting it on navbar
	$(body).on("scroll", function () {
		let currentPos = $(this).scrollLeft() + pixelStep / 2;
		sections.each(function (i) {
			let sectionStartPos = i * pixelStep,
				sectionEndPos = i * pixelStep + pixelStep;
			if (currentPos > sectionStartPos && currentPos < sectionEndPos) {
				navItems.removeClass();
				$("nav").find('a[href="#' + $(this).attr('id') + '"]').parent().addClass('active');
			}

			// hiding useless navigation arrows
			let firstSectionPos = pixelStep,
				lastSectionPos = (sectionsArray.length - 1) * pixelStep;
			if (currentPos <= firstSectionPos) {
				arrowPrevious.css("visibility", "hidden");
			} else if (currentPos >= lastSectionPos) {
				arrowNext.css("visibility", "hidden");
			} else {
				arrowPrevious.css("visibility", "visible");
				arrowNext.css("visibility", "visible");
			}
		})
	});

	// arrows navigation
	arrows.click(function () {
		if ($(this).attr("class") == arrowPrevious.attr("class")) {
			body.animate({
				scrollLeft: `-=${pixelStep}`
			}, scrollTime);
		} else if ($(this).attr("class") == arrowNext.attr("class")) {
			body.animate({
				scrollLeft: `+=${pixelStep}`
			}, scrollTime);
		}
	})
});