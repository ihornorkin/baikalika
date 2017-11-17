import $ from 'jquery';
import 'flipclock/compiled/flipclock';
import '../libs/jQuery-viewport-checker-1.8.8/src/jquery.viewportchecker';
import 'bootstrap/js/modal';
import 'malihu-custom-scrollbar-plugin/jquery.mCustomScrollbar.concat.min.js';

/* Example import node_modules*/
/* import 'slick-carousel'; */

const mainModule = (function () {
	let elements = {};

	const cacheDOM = function () {
		const self = {};

		self.document = $('body, html');
		self.timer = $('#timer');
		self.timer_ru = $('#timer_ru');
		self.timer_ch = $('#timer_ch');
		self.tags = $('#tags li');
		self.diagram = $('#diagram');
		self.diagramWrapper = $('.diagram__wrapper');
		self.navigations = $('.navigations');
		self.work = $('.work-animate');
		self.video = $('#video-background');
		self.input = $('.subscribe-form__field');
		self.form = $('form');
		self.modal = $('#thank-modal');
		self.menu = $('.site-navigation');
		self.navigation_teaser = $('.navigation-teaser');
		self.team_container = $('.team-container');
		/* self.elementName = $(); */
		return self;
	};

	/* Usage element
	 elements.elementName and othe js code
	 */

	const timer = function () {

		/* Countdown to current date*/
		/* Set current date */
		let pastDate  = new Date(2018, 0, 11, 10, 0, 0, 0);
		/* Grab the current date */
		let currentDate = new Date();
		let diff = pastDate.getTime() / 1000 - currentDate.getTime() / 1000;
		if (diff < 0) {
			diff = 0;
		}

		elements.timer.FlipClock(diff, {
			clockFace: 'DailyCounter',
			countdown: true
		});
		let words = ['day', 'hour', 'min', 'sec'];
		$('#timer .flip-clock-label').each(function (i) {
			$(this).text(words[i]);
		});
	};

	const timer_ru = function () {

		/* Countdown to current date*/
		/* Set current date */
		let pastDate  = new Date(2018, 0, 11, 10, 0, 0, 0);
		/* Grab the current date */
		let currentDate = new Date();
		let diff = pastDate.getTime() / 1000 - currentDate.getTime() / 1000;
		if (diff < 0) {
			diff = 0;
		}

		elements.timer_ru.FlipClock(diff, {
			clockFace: 'DailyCounter',
			countdown: true
		});
		let words = ['Дни', 'Часы', 'Минуты', 'Секунды'];
		$('#timer_ru .flip-clock-label').each(function (i) {
			$(this).text(words[i]);
		});
	};

	const timer_ch = function () {

		/* Countdown to current date*/
		/* Set current date */
		let pastDate  = new Date(2018, 0, 11, 10, 0, 0, 0);
		/* Grab the current date */
		let currentDate = new Date();
		let diff = pastDate.getTime() / 1000 - currentDate.getTime() / 1000;
		if (diff < 0) {
			diff = 0;
		}

		elements.timer_ch.FlipClock(diff, {
			clockFace: 'DailyCounter',
			countdown: true
		});
		let words = ['天', '小时', '分钟', '秒'];
		$('#timer_ch .flip-clock-label').each(function (i) {
			$(this).text(words[i]);
		});
	};

	const diagram = function () {
		const newData = [];

		elements.tags.each(function () {
			let element = {};
			element.value = +$(this).attr('data-procent');
			element.color = $(this).attr('data-color');
			newData.push(element);
		});

		let maxValue = 25;
		let container = elements.diagram;

		let addSector = function (data, startAngle, collapse) {
			let sectorDeg = 3.6 * data.value;
			let skewDeg = 90 + sectorDeg;
			let rotateDeg = startAngle;
			if (collapse) {
				skewDeg++;
			}

			let sector = $('<div>', {
				'class': 'sector'
			}).css({
				'background': data.color,
				'transform': 'rotate(' + rotateDeg + 'deg) skewY(' + skewDeg + 'deg)'
			});
			container.append(sector);

			return startAngle + sectorDeg;
		};

		newData.reduce(function (prev, curr) {
			return (function addPart(data, angle) {
				if (data.value <= maxValue) {
					return addSector(data, angle, false);
				}

				return addPart({
					value: data.value - maxValue,
					color: data.color
				}, addSector({
					value: maxValue,
					color: data.color,
				}, angle, true));
			})(curr, prev);
		}, 0);

		$(elements.diagramWrapper).append('<ul class="diagram__procent"></ul>');
		for (let i = 0; i < newData.length; i++) {
			$('.diagram__procent').append('<li class="diagram__lines"><span class="diagram__doten"></span><p>' + newData[i].value + '%</p></li>');
		}
	};

	const rectangle = function() {
		elements.tags.each(function() {
			let color = $(this).attr('data-color')
			$(this).append('<div class="rectangle" style="background-color: ' + color + ';"></div>');
		});
	}

	const smooth = function () {
		if(elements.navigation_teaser) {
			$(elements.navigation_teaser).on("click","a", function (event) {
				event.preventDefault();
				var id  = $(this).attr('href');
				var top = 0;
				switch (id) {
					case '#home':
						top = 0;
						break;
					case '#tokens':
						top = 830;
						break;
					case '#roadmap':
						top = 6100;
						break;
					case '#contacts':
						top = 0;
						break;
					default:
						break;
				}
				$('.teaser-block').animate({scrollTop: top}, 400);
			});
		} else {
			$(elements.navigations).on("click","a", function (event) {
				event.preventDefault();
				var id  = $(this).attr('href'),
					top = $(id).offset().top;
				$(elements.document).animate({scrollTop: top}, 400);
			});
		}
	};

	const animate = function() {
		$(elements.work).viewportChecker({
			classToAdd: 'work-animate_start-animate',
			offset: 400,
			callbackFunction: function animate() {
				setInterval(function() {
					$(elements.work).removeClass('work-animate_start-animate');
					setTimeout(function() {
						$(elements.work).addClass('work-animate_start-animate');
					}, 1500);
				}, 23000);
			}
		});
	};

	const parallax = function () {
		$(window).on('load scroll', function () {
			let scrolled = $(this).scrollTop();
			let speed = 0.28;
			$(elements.video).css('transform', 'translate(-50%, ' + -(scrolled * speed) + 'px)');
		});
	};

	const input = function() {
		elements.input.on('input', function() {
			console.log('test');
			if ($(this).val().length > 0) {
				$(this).addClass('subscribe-form__field_active');
			} else {
				$(this).removeClass('subscribe-form__field_active');
			}
		});
	};

	const formSend = function() {
		$(elements.form).on('submit', function() {
			$(elements.modal).modal('show');
		});
	};

	const menu = function() {
		$(window).on('scroll', function () {
			if ($(window).scrollTop() > 50) {
				$(elements.menu).addClass('site-navigation--fixed');
			} else {
				$(elements.menu).removeClass('site-navigation--fixed');
			}
		});
	};

	const team_container = function() {
		$('.team__description').mCustomScrollbar();
	};

	/* Example function
	 const exampleFunction = function () {
	 do code
	 }
	 */

	/* Declarate function in array */
	const init = function () {
		elements = cacheDOM();
		timer();
		timer_ru();
		timer_ch();
		diagram();
		rectangle();
		smooth();
		animate();
		parallax();
		input();
		formSend();
		menu();
		team_container();
		/* exampleFunction(); */
	};

	return {
		init
	};
})();

/* Initilisation function */

$(document).ready(function () {
	mainModule.init();
});



