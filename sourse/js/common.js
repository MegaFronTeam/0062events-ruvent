"use strict";

// import Swiper from '../libs/swiper/swiper-bundle.min.mjs';
// import JSCCommon from "./JSCCommon.js";

function eventHandler() {
	// const $ = jQuery;
	JSCCommon.init();

	function whenResize() {
		JSCCommon.setFixedNav();
	}

	window.addEventListener(
		"scroll",
		() => {
			JSCCommon.setFixedNav();
		},
		{passive: true}
	);
	window.addEventListener("resize", whenResize, {passive: true});

	whenResize();

	let defaultSl = {
		spaceBetween: 0,
		lazy: {
			loadPrevNext: true,
		},
		watchOverflow: true,
		loop: true,
		navigation: {
			nextEl: ".swiper-button-next",
			prevEl: ".swiper-button-prev",
		},
		pagination: {
			el: " .swiper-pagination",
			type: "bullets",
			clickable: true,

			// renderBullet: function (index, className) {
			// 	return '<span class="' + className + '">' + (index + 1) + '</span>';
			// }
		},
	};

	new Swiper(".headerBlock__slider--js", {
		slidesPerView: 1,
		loop: true,
		watchOverflow: true,
		navigation: {
			nextEl: ".headerBlock .swiper-button-next",
			prevEl: ".headerBlock .swiper-button-prev",
		},
	});

	new Swiper(".sLogos__slider--js", {
		loop: true,
		slidesPerView: "auto",
		speed: 16000,

		autoplay: {
			delay: 100,
			disableOnInteraction: false,
			draggable: true,
		},
	});

	new Swiper(".slider-auto-js", {
		slidesPerView: "auto",
		mousewheel: true,
		freeMode: true,

		scrollbar: {
			el: ".slider-auto-js .swiper-scrollbar",
			hide: true,
			draggable: true,
			hide: false,
		},
	});

	const swiperEl = document.querySelectorAll(".sPhotos__slider--js");

	swiperEl.forEach(el => {
		const autoplaySpeed = el.dataset.autoplay || 2000;
		const isReverse = el.dataset.reverse === "true"; // Читаем data-reverse

		new Swiper(el, {
			loop: true,
			mousewheelControl: true,
			slidesPerView: "auto",
			freeMode: true,
			followFinger: true,
			speed: 16000,

			autoplay: {
				delay: parseInt(autoplaySpeed),
				disableOnInteraction: false,
				reverseDirection: isReverse, // Включает реверс
			},
		});
	});

	let isOpen = false;

	$(document).on("click", ".more-js", function (e) {
		e.preventDefault();
		$(this).toggleClass("active");
		let defaultHeight = "10em"; // Фиксированная высота
		let autoHeight = $(".seo").prop("scrollHeight") + "px";
		$(".seo").toggleClass("opened");

		if (isOpen) {
			$(".seo").animate({height: defaultHeight}, 300);
			$(this).text("Читать польностью... ");
		} else {
			$(".seo").animate({height: autoHeight}, 300, function () {
				$(this).css("height", "auto"); // Сбрасываем height после анимации
			});

			$(this).text("Свернуть");
		}
		isOpen = !isOpen;
	});
}
if (document.readyState !== "loading") {
	eventHandler();
} else {
	document.addEventListener("DOMContentLoaded", eventHandler);
}

// window.onload = function () {
// 	document.body.classList.add('loaded_hiding');
// 	window.setTimeout(function () {
// 		document.body.classList.add('loaded');
// 		document.body.classList.remove('loaded_hiding');
// 	}, 500);
// }
