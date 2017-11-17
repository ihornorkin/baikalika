webpackHotUpdate(0,[
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	var _jquery = __webpack_require__(1);
	
	var _jquery2 = _interopRequireDefault(_jquery);
	
	__webpack_require__(4);
	
	__webpack_require__(5);
	
	__webpack_require__(6);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	/* Example import node_modules*/
	/* import 'slick-carousel'; */
	
	var mainModule = function () {
		var elements = {};
	
		var cacheDOM = function cacheDOM() {
			var self = {};
	
			self.document = (0, _jquery2.default)('body, html');
			self.timer = (0, _jquery2.default)('#timer');
			self.timer_ru = (0, _jquery2.default)('#timer_ru');
			self.tags = (0, _jquery2.default)('#tags li');
			self.diagram = (0, _jquery2.default)('#diagram');
			self.diagramWrapper = (0, _jquery2.default)('.diagram__wrapper');
			self.navigations = (0, _jquery2.default)('.navigations');
			self.work = (0, _jquery2.default)('.work-animate');
			self.video = (0, _jquery2.default)('#video-background');
			self.input = (0, _jquery2.default)('.subscribe-form__field');
			self.form = (0, _jquery2.default)('form');
			self.modal = (0, _jquery2.default)('#thank-modal');
			self.menu = (0, _jquery2.default)('.site-navigation');
			self.navigation_teaser = (0, _jquery2.default)('.navigation-teaser');
			/* self.elementName = $(); */
			return self;
		};
	
		/* Usage element
	  elements.elementName and othe js code
	  */
	
		var timer = function timer() {
	
			/* Countdown to current date*/
			/* Set current date */
			var pastDate = new Date(2018, 0, 11, 10, 0, 0, 0);
			/* Grab the current date */
			var currentDate = new Date();
			var diff = pastDate.getTime() / 1000 - currentDate.getTime() / 1000;
			if (diff < 0) {
				diff = 0;
			}
	
			elements.timer.FlipClock(diff, {
				clockFace: 'DailyCounter',
				countdown: true
			});
			var words = ['day', 'hour', 'min', 'sec'];
			(0, _jquery2.default)('#timer .flip-clock-label').each(function (i) {
				(0, _jquery2.default)(this).text(words[i]);
			});
		};
	
		var timer_ru = function timer_ru() {
	
			/* Countdown to current date*/
			/* Set current date */
			var pastDate = new Date(2018, 0, 11, 10, 0, 0, 0);
			/* Grab the current date */
			var currentDate = new Date();
			var diff = pastDate.getTime() / 1000 - currentDate.getTime() / 1000;
			if (diff < 0) {
				diff = 0;
			}
	
			elements.timer_ru.FlipClock(diff, {
				clockFace: 'DailyCounter',
				countdown: true
			});
			var words = ['Дни', 'Часы', 'Минуты', 'Секунды'];
			(0, _jquery2.default)('#timer_ru .flip-clock-label').each(function (i) {
				(0, _jquery2.default)(this).text(words[i]);
			});
		};
	
		var diagram = function diagram() {
			var newData = [];
	
			elements.tags.each(function () {
				var element = {};
				element.value = +(0, _jquery2.default)(this).attr('data-procent');
				element.color = (0, _jquery2.default)(this).attr('data-color');
				newData.push(element);
			});
	
			var maxValue = 25;
			var container = elements.diagram;
	
			var addSector = function addSector(data, startAngle, collapse) {
				var sectorDeg = 3.6 * data.value;
				var skewDeg = 90 + sectorDeg;
				var rotateDeg = startAngle;
				if (collapse) {
					skewDeg++;
				}
	
				var sector = (0, _jquery2.default)('<div>', {
					'class': 'sector'
				}).css({
					'background': data.color,
					'transform': 'rotate(' + rotateDeg + 'deg) skewY(' + skewDeg + 'deg)'
				});
				container.append(sector);
	
				return startAngle + sectorDeg;
			};
	
			newData.reduce(function (prev, curr) {
				return function addPart(data, angle) {
					if (data.value <= maxValue) {
						return addSector(data, angle, false);
					}
	
					return addPart({
						value: data.value - maxValue,
						color: data.color
					}, addSector({
						value: maxValue,
						color: data.color
					}, angle, true));
				}(curr, prev);
			}, 0);
	
			(0, _jquery2.default)(elements.diagramWrapper).append('<ul class="diagram__procent"></ul>');
			for (var i = 0; i < newData.length; i++) {
				(0, _jquery2.default)('.diagram__procent').append('<li class="diagram__lines"><span class="diagram__doten"></span><p>' + newData[i].value + '%</p></li>');
			}
		};
	
		var rectangle = function rectangle() {
			elements.tags.each(function () {
				var color = (0, _jquery2.default)(this).attr('data-color');
				(0, _jquery2.default)(this).append('<div class="rectangle" style="background-color: ' + color + ';"></div>');
			});
		};
	
		var smooth = function smooth() {
			if (elements.navigation_teaser) {
				(0, _jquery2.default)(elements.navigation_teaser).on("click", "a", function (event) {
					(0, _jquery2.default)(".teaser-iframe").prop('src', 'Baikalika-teaser-RU.pdf#page=3');
	
					console.log((0, _jquery2.default)(".teaser-iframe"));
					// if($('.teaser-iframe').length) {
					//  $('.teaser-iframe').remove();
					// }
					// $('<iframe class="teaser-iframe" src="Baikalika-teaser-RU.pdf#page=3">').appendTo('.teaser-block');
	
					// $(".teaser-iframe").contentWindow.location.reload(true);
				});
			} else {
				(0, _jquery2.default)(elements.navigations).on("click", "a", function (event) {
					event.preventDefault();
					var id = (0, _jquery2.default)(this).attr('href'),
					    top = (0, _jquery2.default)(id).offset().top;
					(0, _jquery2.default)(elements.document).animate({ scrollTop: top }, 400);
				});
			}
		};
	
		var animate = function animate() {
			(0, _jquery2.default)(elements.work).viewportChecker({
				classToAdd: 'work-animate_start-animate',
				offset: 400,
				callbackFunction: function animate() {
					setInterval(function () {
						(0, _jquery2.default)(elements.work).removeClass('work-animate_start-animate');
						setTimeout(function () {
							(0, _jquery2.default)(elements.work).addClass('work-animate_start-animate');
						}, 1500);
					}, 23000);
				}
			});
		};
	
		var parallax = function parallax() {
			(0, _jquery2.default)(window).on('load scroll', function () {
				var scrolled = (0, _jquery2.default)(this).scrollTop();
				var speed = 0.28;
				(0, _jquery2.default)(elements.video).css('transform', 'translate(-50%, ' + -(scrolled * speed) + 'px)');
			});
		};
	
		var input = function input() {
			elements.input.on('input', function () {
				console.log('test');
				if ((0, _jquery2.default)(this).val().length > 0) {
					(0, _jquery2.default)(this).addClass('subscribe-form__field_active');
				} else {
					(0, _jquery2.default)(this).removeClass('subscribe-form__field_active');
				}
			});
		};
	
		var formSend = function formSend() {
			(0, _jquery2.default)(elements.form).on('submit', function () {
				(0, _jquery2.default)(elements.modal).modal('show');
			});
		};
	
		var menu = function menu() {
			(0, _jquery2.default)(window).on('scroll', function () {
				if ((0, _jquery2.default)(window).scrollTop() > 50) {
					(0, _jquery2.default)(elements.menu).addClass('site-navigation--fixed');
				} else {
					(0, _jquery2.default)(elements.menu).removeClass('site-navigation--fixed');
				}
			});
		};
	
		/* Example function
	  const exampleFunction = function () {
	  do code
	  }
	  */
	
		/* Declarate function in array */
		var init = function init() {
			elements = cacheDOM();
			timer();
			timer_ru();
			diagram();
			rectangle();
			smooth();
			animate();
			parallax();
			input();
			formSend();
			menu();
			/* exampleFunction(); */
		};
	
		return {
			init: init
		};
	}();
	
	/* Initilisation function */
	
	(0, _jquery2.default)(document).ready(function () {
		mainModule.init();
	});

/***/ })
])
//# sourceMappingURL=0.2058ed9bf9d431e7a24c.hot-update.js.map