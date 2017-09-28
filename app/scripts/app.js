import $ from 'jquery';
import 'flipclock/compiled/flipclock';
import '../libs/jQuery-viewport-checker-1.8.8/src/jquery.viewportchecker';

/* Example import node_modules*/
/* import 'slick-carousel'; */

const mainModule = (function () {
	let elements = {};

	const cacheDOM = function () {
		const self = {};

		self.document = $('body, html');
		self.timer = $('#timer');
		self.tags = $('#tags li');
		self.diagram = $('#diagram');
		self.diagramWrapper = $('.diagram__wrapper');
		self.navigations = $('.navigations');
		self.work = $('.work-animate');
		/* self.elementName = $(); */
		return self;
	};

	/* Usage element
	 elements.elementName and othe js code
	 */

	const timer = function () {

		/* Countdown to current date*/
		/* Set current date */
		let pastDate  = new Date(2017, 8, 30, 0, 0, 0, 0);
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
		$('.flip-clock-label').each(function (i) {
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
		$(elements.navigations).on("click","a", function (event) {
			event.preventDefault();
			var id  = $(this).attr('href'),
				top = $(id).offset().top;
			$(elements.document).animate({scrollTop: top}, 400);
		});
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
				}, 21000);
			}
		});
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
		diagram();
		rectangle();
		smooth();
		animate();
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



