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
		freeMode: true,

		simulateTouch: true,
		touchRatio: 1.5, // Увеличиваем чувствительность свайпа
		touchAngle: 60, // Разрешаем свайп под углом до 60 градусов
		grabCursor: true,
		resistanceRatio: 0.85, // Смягчение при достижении границы

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

	$(".btn-cookie").on("click", function () {
		writeCookie("cookie-block", "hide", 30);
		document.querySelector(".cookie-block").classList.add("d-none");
	});

	function writeCookie(name, val, expires) {
		var date = new Date();
		date.setDate(date.getDate() + expires);
		document.cookie =
			name + "=" + val + "; path=/; expires=" + date.toUTCString();
	}

	function readCookie(name) {
		var matches = document.cookie.match(
			new RegExp(
				"(?:^|; )" +
					name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, "\\$1") +
					"=([^;]*)"
			)
		);
		return matches ? decodeURIComponent(matches[1]) : undefined;
	}
	let test = readCookie("cookie-block");
	if (!test) document.querySelector(".cookie-block").classList.remove("d-none");

	form();
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

function form() {
	(function () {
		let isFormLocked = false;
		let reCaptcha;
		let isCaptchaReady;
		const formType = "deal";
		const contractorType = "human";
		const formId = "mp45c48cce2e2d7fbdea1afc51c7c6ad26";
		const formRootElement = document.querySelector("#" + formId);
		const submitButton = formRootElement.querySelector(".form .form__button");
		const restartButton = formRootElement.querySelector(".form__restart");
		const phoneInputs = formRootElement.querySelectorAll(
			'.form__item [type="tel"]'
		);
		const successText = formRootElement.querySelector(".success");
		const formElement = formRootElement.querySelector(".form");
		const formError = formRootElement.querySelector(
			".form .form__item.form__error"
		);
		const useCaptcha = false;
		const formData = {
			"contractor.firstName": {
				name: "contractor.firstName",
				value: null,
				validators: [requiredValidator],
				type: "input",
				isLogicField: false,
				logicHandler: function () {},
				settings: {},
			},
			"contractor.email": {
				name: "contractor.email",
				value: null,
				validators: [requiredValidator, emailValidator],
				type: "email",
				isLogicField: false,
				logicHandler: function () {},
				settings: {},
			},
			"contractor.phone": {
				name: "contractor.phone",
				value: null,
				validators: [phoneValidator],
				type: "phone",
				isLogicField: false,
				logicHandler: function () {},
				settings: {},
			},
			description: {
				name: "description",
				value: null,
				validators: [],
				type: "input",
				isLogicField: false,
				logicHandler: function () {},
				settings: {},
			},
		};
		const elementInitializers = [];
		initForm();
		function initForm() {
			phoneInputs.forEach(element =>
				element.addEventListener("input", phoneInputHandler, false)
			);
			restartButton.addEventListener("click", clearForm);
			submitButton.onclick = submitHandler;
			initFields();
			elementInitializers.forEach(initializer => initializer.init());
		}
		function initFields() {
			Object.values(formData).map(item => {
				if (item.isLogicField) {
					item.value = item.logicHandler();
					return;
				}
				switch (item.type) {
					case "email":
					case "phone":
						const contactElement = formRootElement.querySelector(
							".form__item.item__" +
								item.name.replace(".", "_") +
								" .form__input"
						);
						contactElement.oninput = function () {
							setField(item.name, {
								contentType: "ContactInfo",
								type: item.type,
								value: contactElement.value.trim(),
							});
						};
						break;
					case "input":
						const inputElement = formRootElement.querySelector(
							".form__item.item__" +
								item.name.replace(".", "_") +
								" .form__input"
						);
						inputElement.oninput = function () {
							setField(item.name, inputElement.value);
						};
						break;
					case "float":
						const floatElement = formRootElement.querySelector(
							".form__item.item__" +
								item.name.replace(".", "_") +
								" .form__input"
						);
						floatElement.oninput = function () {
							setField(item.name, parseFloat(floatElement.value));
						};
						break;
					case "checkbox":
						const checkboxElement = formRootElement.querySelector(
							".form__item.item__" +
								item.name.replace(".", "_") +
								" .form__checkbox_hidden"
						);
						checkboxElement.oninput = function () {
							setField(item.name, checkboxElement.checked);
						};
						break;
				}
			});
		}
		function clearForm() {
			successText.style.display = "none";
			successText.querySelector("p").innerHTML = "";
			formElement.style.display = "block";
			Object.keys(formData).forEach(key => (formData[key].value = null));
			elementInitializers.forEach(item => item.clear());
			formRootElement
				.querySelectorAll(".form .form__input")
				.forEach(input => (input.value = ""));
			unLockButton();
		}
		function showFormError(text) {
			formError.style.display = "block";
			formError.innerHTML = text;
			unLockButton();
		}
		function showFieldError(field, message) {
			if (!field || !formData[field]) {
				showFormError(message);
				return;
			}
			formRootElement
				.querySelector(".form .item__" + field.replace(".", "_"))
				?.classList.add("error");
			const errField = formRootElement.querySelector(
				".form .item__" + field.replace(".", "_") + " .form__error"
			);
			if (errField) {
				errField.innerHTML = message;
				errField.style.display = "block";
			} else {
				showFormError(message);
			}
		}
		function handleErrors(errors) {
			errors.forEach(err => {
				showFieldError(err.field, err.message);
			});
			unLockButton();
		}
		function hideError() {
			formError.style.display = "none";
			formRootElement
				.querySelectorAll(".form .error")
				.forEach(element => element.classList.remove("error"));
			formRootElement
				.querySelectorAll(".form .form__error")
				.forEach(errorField => {
					errorField.style.display = "none";
					errorField.innerHTML = "";
				});
		}
		function showSuccess(text) {
			formElement.style.display = "none";
			successText.style.display = "block";
			successText.querySelector("p").innerHTML = text;
			unLockButton();
		}
		function setField(fieldName, value) {
			hideError();
			formData[fieldName].value = value;
		}
		function getContentTypeForContractor(contractorType) {
			return contractorType === "human"
				? "ContractorHuman"
				: "ContractorCompany";
		}
		async function submitHandler() {
			if (isFormLocked) {
				return;
			}
			lockButton();
			const fields = Object.values(formData);
			const isValid =
				fields
					.map(
						item =>
							item.validators
								.map(validator => {
									const validateError = validator(item.value);
									if (validateError) {
										showFieldError(item.name, validateError);
									}
									return !validateError;
								})
								.filter(Boolean).length === item.validators.length
					)
					.filter(Boolean).length === fields.length;
			const contactInfo = [];
			if (isValid) {
				const request = fields.reduce((dataObj, item) => {
					if (["email", "phone"].includes(item.type)) {
						if (item.value?.value?.trim()) {
							contactInfo.push(item.value);
						}
						return dataObj;
					}
					if (item.name.startsWith("contractor.")) {
						if (!dataObj.contractor) {
							dataObj.contractor = {
								contentType: getContentTypeForContractor(contractorType),
							};
						}
						dataObj.contractor[item.name.replace("contractor.", "")] =
							item.value;
					} else {
						dataObj[item.name] = item.value;
					}
					return dataObj;
				}, {});
				if (formType === "deal") {
					request.contentType = "Deal";
					if (!!request.contractor) {
						request.contractor.contactInfo = contactInfo;
					}
				} else {
					request.contentType = getContentTypeForContractor(contractorType);
					request.contactInfo = contactInfo;
				}
				sendRequest(request);
			} else {
				unLockButton();
			}
		}
		function lockButton() {
			isFormLocked = true;
			submitButton.classList.add("form__button_disabled");
			submitButton.onclick = null;
		}
		function unLockButton() {
			isFormLocked = false;
			submitButton.classList.remove("form__button_disabled");
			submitButton.onclick = submitHandler;
		}
		function phoneInputHandler(e) {
			e.target.value = e.target.value.replace(/[^\d()\-+]/g, "");
		}
		function requiredValidator(value) {
			return !value ? "Поле обязательно для заполнения" : "";
		}
		function emailValidator(contactInfo) {
			return contactInfo &&
				contactInfo.value &&
				!contactInfo.value.match(/.+@.+\..+/i)
				? "Некорректный email"
				: "";
		}
		function phoneValidator(contactInfo) {
			return contactInfo &&
				contactInfo.value &&
				!contactInfo.value.match(/^\+?\d[\d()\-\s]+$/)
				? "Некорректный номер телефона"
				: "";
		}
		function sendRequest(request) {
			const reqParams = useCaptcha
				? "?" + JSON.stringify({token: reCaptcha.getToken()})
				: "";
			fetch(
				"https://ruvents.megaplan.ru/api/v3/customLeadForm/9/process/deal" +
					reqParams,
				{
					method: "POST",
					headers: {
						Accept: "application/json, text/plain, */*",
						"Content-Type": "application/json",
					},
					body: JSON.stringify(request),
				}
			)
				.then(response => response.json())
				.then(data => {
					if (data?.meta?.status !== 200) {
						if (!data?.meta?.errors || data?.meta?.status > 500) {
							throw new Error();
						}
						handleErrors(data.meta.errors);
						return;
					}
					showSuccess("Благодарим за обращение. Мы скоро с Вами свяжемся");
				})
				.catch(() => {
					showFormError(
						"При отправке формы произошла ошибка. Попробуйте позже."
					);
				});
		}
	})();
}
