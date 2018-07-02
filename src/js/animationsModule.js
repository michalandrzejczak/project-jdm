$(function () {

	const ScrollMagic = require("scrollmagic");

	const animation =  $("*[class*='anim']"),
				sections = $("*[class*='fade']");

	let pixelStep = $(window).width();
	
	window.onresize = function () {
		pixelStep = $(window).width();
	}
	
	animation.each(triggerAnimOnElement);

	function triggerAnimOnElement() {

		const controller = new ScrollMagic.Controller({vertical: false});
		const scene = new ScrollMagic.Scene({
			
			triggerElement: this,
			triggerHook: 1,
			duration: pixelStep,

		})
		.setClassToggle(this, "animationToggle")
		.addTo(controller);  
	}
	
	sections.each(triggerAnimOnSection);
	
	function triggerAnimOnSection() {

		const controller = new ScrollMagic.Controller({vertical: false});
		const scene = new ScrollMagic.Scene({

			triggerElement: this,
			triggerHook: 0.5,
			duration: pixelStep,

		})
		.setClassToggle(this, "animationToggle")
		.addTo(controller);  
	}
});