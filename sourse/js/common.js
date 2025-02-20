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
		if (!formRootElement) return;

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
			},
			"contractor.email": {
				name: "contractor.email",
				value: null,
				validators: [requiredValidator, emailValidator],
				type: "email",
			},
			"contractor.phone": {
				name: "contractor.phone",
				value: null,
				validators: [phoneValidator],
				type: "phone",
			},
			description: {
				name: "description",
				value: null,
				validators: [],
				type: "input",
			},
		};

		const elementInitializers = [];

		initForm();

		function initForm() {
			phoneInputs.forEach(element =>
				element.addEventListener("input", phoneInputHandler, false)
			);
			restartButton?.addEventListener("click", clearForm);
			submitButton?.addEventListener("click", submitHandler);
			initFields();
			elementInitializers.forEach(initializer => initializer.init());
		}

		function initFields() {
			Object.values(formData).forEach(item => {
				const fieldClass = `.form__item.item__${item.name.replace(".", "_")} .form__input`;
				const element = formRootElement.querySelector(fieldClass);

				if (!element) return;

				element.addEventListener("input", function () {
					setField(
						item.name,
						item.type === "phone" || item.type === "email"
							? {
									contentType: "ContactInfo",
									type: item.type,
									value: element.value.trim(),
								}
							: item.type === "float"
								? parseFloat(element.value)
								: item.type === "checkbox"
									? element.checked
									: element.value.trim()
					);
				});
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
			if (formError) {
				formError.style.display = "block";
				formError.innerHTML = text;
			}
			unLockButton();
		}

		function showFieldError(field, message) {
			if (!field || !formData[field]) {
				showFormError(message);
				return;
			}

			const fieldElement = formRootElement.querySelector(
				`.form .item__${field.replace(".", "_")}`
			);
			fieldElement?.classList.add("error");

			const errField = fieldElement?.querySelector(".form__error");
			if (errField) {
				errField.innerHTML = message;
				errField.style.display = "block";
			} else {
				showFormError(message);
			}
		}

		function handleErrors(errors) {
			errors.forEach(err => showFieldError(err.field, err.message));
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
			if (isFormLocked) return;
			lockButton();

			const fields = Object.values(formData);
			const isValid = fields.every(item =>
				item.validators.every(validator => {
					const validateError = validator(item.value);
					if (validateError) showFieldError(item.name, validateError);
					return !validateError;
				})
			);

			if (!isValid) {
				unLockButton();
				return;
			}

			const contactInfo = [];
			const request = fields.reduce((dataObj, item) => {
				if (
					["email", "phone"].includes(item.type) &&
					item.value?.value?.trim()
				) {
					contactInfo.push(item.value);
				}

				if (item.name.startsWith("contractor.")) {
					dataObj.contractor ??= {
						contentType: getContentTypeForContractor(contractorType),
					};
					dataObj.contractor[item.name.replace("contractor.", "")] = item.value;
				} else {
					dataObj[item.name] = item.value;
				}

				return dataObj;
			}, {});

			if (formType === "deal") {
				request.contentType = "Deal";
				if (request.contractor) request.contractor.contactInfo = contactInfo;
			} else {
				request.contentType = getContentTypeForContractor(contractorType);
				request.contactInfo = contactInfo;
			}

			sendRequest(request);
		}

		function lockButton() {
			isFormLocked = true;
			submitButton?.classList.add("form__button_disabled");
			submitButton.onclick = null;
		}

		function unLockButton() {
			isFormLocked = false;
			submitButton?.classList.remove("form__button_disabled");
			submitButton.onclick = submitHandler;
		}

		function phoneInputHandler(e) {
			e.target.value = e.target.value.replace(/[^\d()\-+]/g, "");
		}

		function requiredValidator(value) {
			return !value ? "Поле обязательно для заполнения" : "";
		}

		function emailValidator(contactInfo) {
			return contactInfo?.value && !/.+@.+\..+/i.test(contactInfo.value)
				? "Некорректный email"
				: "";
		}

		function phoneValidator(contactInfo) {
			return contactInfo?.value && !/^\+?\d[\d()\-\s]+$/.test(contactInfo.value)
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
						Accept: "application/json",
						"Content-Type": "application/json",
					},
					body: JSON.stringify(request),
				}
			)
				.then(response => response.json())
				.then(data => {
					if (data?.meta?.status !== 200) {
						handleErrors(data.meta.errors || []);
						return;
					}
					showSuccess("Благодарим за обращение. Мы скоро с Вами свяжемся");
				})
				.catch(() =>
					showFormError(
						"При отправке формы произошла ошибка. Попробуйте позже."
					)
				);
		}
	})();
}
