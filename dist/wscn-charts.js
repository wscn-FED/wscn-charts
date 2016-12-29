(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("d3"));
	else if(typeof define === 'function' && define.amd)
		define(["d3"], factory);
	else if(typeof exports === 'object')
		exports["WscnCharts"] = factory(require("d3"));
	else
		root["WscnCharts"] = factory(root["d3"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_2__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.BarChart = exports.LineChart = undefined;

	var _linechart = __webpack_require__(1);

	var _linechart2 = _interopRequireDefault(_linechart);

	var _barchart = __webpack_require__(9);

	var _barchart2 = _interopRequireDefault(_barchart);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.LineChart = _linechart2.default;
	exports.BarChart = _barchart2.default;

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _d2 = __webpack_require__(2);

	var d3 = _interopRequireWildcard(_d2);

	var _tooltip = __webpack_require__(3);

	var _tooltip2 = _interopRequireDefault(_tooltip);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var defaults = {
	  target: '#chart',
	  width: 700,
	  height: 400,
	  // margin
	  margin: { top: 10, right: 10, bottom: 10, left: 10 },
	  // axis padding
	  axisPadding: 6,
	  // axis tick size
	  tickSize: 0,
	  // number of x-axis ticks
	  xTicks: 5,
	  // number of y-axis ticks
	  yTicks: 3,
	  // nice round values for axis
	  nice: false,
	  transition: 500,
	  spaceCount: 3
	};

	/**
	 * LineChart.
	 */

	var LineChart = function () {

	  /**
	   * Construct with the given `config`.
	   */

	  function LineChart(config) {
	    _classCallCheck(this, LineChart);

	    this.conf = {};
	    this.set(config);
	    this.tooltip = new _tooltip2.default();
	    this.setDimensions();
	    this.init();
	  }

	  /**
	   * Set configuration options.
	   */

	  _createClass(LineChart, [{
	    key: 'set',
	    value: function set(config) {
	      Object.assign(this.conf, defaults, config);
	    }

	    /**
	     * Dimensions without margin.
	     */

	  }, {
	    key: 'setDimensions',
	    value: function setDimensions() {
	      var _conf = this.conf,
	          width = _conf.width,
	          height = _conf.height,
	          margin = _conf.margin;

	      var w = width - margin.left - margin.right;
	      var h = height - margin.top - margin.bottom;
	      this.conf.dimensions = [w, h];
	    }

	    /**
	     * Initialize the chart.
	     */

	  }, {
	    key: 'init',
	    value: function init() {
	      var _conf2 = this.conf,
	          target = _conf2.target,
	          width = _conf2.width,
	          height = _conf2.height,
	          margin = _conf2.margin,
	          axisPadding = _conf2.axisPadding,
	          interpolate = _conf2.interpolate;
	      var _conf3 = this.conf,
	          tickSize = _conf3.tickSize,
	          xTicks = _conf3.xTicks,
	          yTicks = _conf3.yTicks;

	      var _conf$dimensions = _slicedToArray(this.conf.dimensions, 2),
	          w = _conf$dimensions[0],
	          h = _conf$dimensions[1];

	      this.chart = d3.select(target).attr('width', width).attr('height', height).append('g').attr('transform', 'translate(' + margin.left + ', ' + margin.top + ')');

	      this.xScale = d3.scaleTime().range([0, w]);

	      this.yScale = d3.scaleLinear().range([h, 0]);

	      this.xAxis = d3.axisTop().scale(this.xScale).ticks(xTicks).tickPadding(8).tickSize(-5).tickSizeOuter(0).tickFormat(d3.timeFormat("%Y.%m"));

	      this.yAxis = d3.axisRight().scale(this.yScale).ticks(yTicks).tickPadding(8).tickSize(-w).tickSizeOuter(0);

	      this.chart.append('g').attr('class', 'x axis').attr('transform', 'translate(0, ' + -axisPadding + ')').call(this.xAxis);

	      this.chart.append('g').attr('class', 'y axis').attr('transform', 'translate(' + w + ', 0)').call(this.yAxis);

	      this.chart.append('path').attr('class', 'line');
	    }

	    /**
	     * Render axis.
	     */

	  }, {
	    key: 'renderAxis',
	    value: function renderAxis(data, options) {
	      var chart = this.chart,
	          xScale = this.xScale,
	          yScale = this.yScale,
	          xAxis = this.xAxis,
	          yAxis = this.yAxis,
	          nice = this.nice;
	      var _conf4 = this.conf,
	          transition = _conf4.transition,
	          spaceCount = _conf4.spaceCount;

	      var _d3$extent = d3.extent(data, function (d) {
	        return d.value;
	      }),
	          _d3$extent2 = _slicedToArray(_d3$extent, 2),
	          ymin = _d3$extent2[0],
	          ymax = _d3$extent2[1];

	      var spaceGutter = Math.round((ymax - ymin) / data.length);
	      var xd = xScale.domain(d3.extent(data, function (d) {
	        return d.date;
	      }));
	      if (ymin < 0 && ymax < 0) {
	        ymax = 0;
	      } else if (ymin > 0 && ymax > 0) {
	        ymin = 0;
	      } else {
	        ymin = ymin - spaceCount * spaceGutter;
	        ymax = ymax + spaceCount * spaceGutter;
	      }
	      var yd = yScale.domain([ymin, ymax]);

	      chart.transition().duration(transition).select('.x.axis').call(xAxis);
	      chart.transition().duration(transition).select('.y.axis').call(yAxis);
	    }

	    /**
	     * Render line.
	     */

	  }, {
	    key: 'renderLine',
	    value: function renderLine(data, options) {
	      var _this = this;

	      var interpolate = this.interpolate,
	          chart = this.chart;
	      var transition = this.conf.transition;

	      var line = d3.line().x(function (d) {
	        return _this.xScale(d.date);
	      }).y(function (d) {
	        return _this.yScale(d.value);
	      });

	      chart.transition().duration(transition).select('.line').attr('d', line(data));
	    }

	    /**
	     * Render the chart against the given `data`.
	     */

	  }, {
	    key: 'render',
	    value: function render(data) {
	      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

	      var parseValue = d3.format(".1f");
	      data = data.map(function (d) {
	        var item = {
	          date: new Date(d.timestamp * 1000),
	          value: +parseValue(d.value),
	          symbol: d.symbol,
	          color: d.color
	        };
	        return item;
	      });
	      this.renderAxis(data, options);
	      this.renderLine(data, options);
	      this.renderDots(data, options);
	      this.renderMoveLine(data, options);
	    }
	    /**
	     * Render dots
	     */

	  }, {
	    key: 'renderDots',
	    value: function renderDots(data, options) {
	      var xScale = this.xScale,
	          yScale = this.yScale;

	      var dots = this.chart.selectAll('.dot-container').data(data);
	      dots.enter().append('circle').merge(dots).attr('class', 'dot dot-container').attr('cx', function (d) {
	        return xScale(d.date);
	      }).attr('cy', function (d) {
	        return yScale(d.value);
	      }).attr('r', 5).attr('fill', '#fff');

	      dots.exit().remove();

	      var circles = this.chart.selectAll('.dot-circle').data(data);
	      circles.enter().append('circle').merge(circles).attr('class', function (d) {
	        return 'dot dot-circle ' + d.symbol;
	      }).attr('cx', function (d) {
	        return xScale(d.date);
	      }).attr('cy', function (d) {
	        return yScale(d.value);
	      }).attr('r', 2).attr('fill', function (d) {
	        return d.color;
	      });

	      circles.exit().remove();
	    }

	    /**
	     * Render Move Line
	     */

	  }, {
	    key: 'renderMoveLine',
	    value: function renderMoveLine(data, options) {
	      var _conf$dimensions2 = _slicedToArray(this.conf.dimensions, 2),
	          w = _conf$dimensions2[0],
	          h = _conf$dimensions2[1];

	      var xScale = this.xScale,
	          yScale = this.yScale,
	          chart = this.chart,
	          tooltip = this.tooltip;


	      if (options.animate) {
	        chart.select('.move-line-container').remove();
	        chart.select('.move-area').remove();
	      }

	      var hoverRect = chart.append('rect').attr('width', w).attr('height', h).style("pointer-events", "all").attr('fill', 'transparent').attr('class', 'move-area');
	      var moveLine = chart.append('g').attr('class', 'move-line-container');

	      moveLine.append('line').attr('class', 'move-line y').attr('y1', 0).attr('y2', h).attr('transform', 'translate(0, -5)').style('display', 'none');

	      moveLine.append('line').attr('class', 'move-line x').attr('x1', 0).attr('x2', w).style('display', 'none');

	      moveLine.append('rect').attr('class', 'x-tip-rect').attr('transform', 'translate(' + w + ', -10)').style("pointer-events", "all").style('display', 'none');

	      moveLine.append('text').attr('class', 'x-tip-text').attr('font-size', 12).attr('fill', '#fff').attr('transform', 'translate(' + (w + 10) + ', 0)').style('display', 'none');

	      var circles = chart.selectAll('.dot-circle');
	      var nodes = circles.nodes();

	      chart.select('.move-area').on("mouseover", function () {
	        moveLine.select('.y').style('display', null);
	      }).on('mouseout', function () {
	        moveLine.select('.x').style('display', 'none');
	        moveLine.select('.y').style('display', 'none');
	        moveLine.select('.x-tip-rect').style('display', 'none');
	        moveLine.select('.x-tip-text').style('display', 'none');
	        //hide tooltip
	        tooltip.hide();
	        if (nodes && nodes.length > 0) {
	          nodes.forEach(function (node) {
	            var r = node.getAttribute('r');
	            if (r === '4') {
	              node.setAttribute('r', 2);
	              node.classList.remove('active');
	            }
	          });
	        }
	      }).on('mousemove', function () {
	        var _d3$mouse = d3.mouse(this),
	            _d3$mouse2 = _slicedToArray(_d3$mouse, 2),
	            moveX = _d3$mouse2[0],
	            moveY = _d3$mouse2[1];

	        var moveXDate = xScale.invert(moveX);
	        var bisect = d3.bisector(function (d) {
	          return d.date;
	        }).left;
	        moveLine.select('.y').attr('transform', 'translate(' + moveX + ', -5)');
	        var index = bisect(data, moveXDate);
	        var d = data[index];
	        if (!d) return;
	        var y = yScale(d.value);
	        moveLine.select('.x').style('display', null).attr('transform', 'translate(0, ' + y + ')');

	        moveLine.select('.x-tip-rect').style('display', null).attr('transform', 'translate(' + w + ', ' + (y - 10) + ')');
	        moveLine.select('text').style('display', null).attr('transform', 'translate(' + (w + 5) + ', ' + (y + 4) + ')').text('' + parseFloat(d.value).toFixed(1));
	        if (nodes && nodes[index]) {
	          nodes.forEach(function (node) {
	            var r = node.getAttribute('r');
	            if (r === '4') {
	              node.setAttribute('r', 2);
	              node.classList.remove('active');
	            }
	          });
	          nodes[index].setAttribute('r', 4);
	          nodes[index].classList.add('active');
	          tooltip.show(nodes[index], d);
	        }
	      });
	    }
	    /**
	     * Update the chart against the given `data`.
	     */

	  }, {
	    key: 'update',
	    value: function update(data) {
	      this.render(data, {
	        animate: true
	      });
	    }
	  }]);

	  return LineChart;
	}();

	exports.default = LineChart;

/***/ },
/* 2 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_2__;

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _documentOffset = __webpack_require__(4);

	var _documentOffset2 = _interopRequireDefault(_documentOffset);

	var _d = __webpack_require__(2);

	var d3 = _interopRequireWildcard(_d);

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var ChartTip = function () {
	  function ChartTip(config) {
	    var _this = this;

	    _classCallCheck(this, ChartTip);

	    this.formatValue = function (d) {
	      return d.value;
	    };

	    this.show = function (target, d) {
	      var tb = target.getBoundingClientRect();
	      var o = (0, _documentOffset2.default)(target);
	      timeEl.textContent = '\u65F6\u95F4\uFF1A' + _this.formatDate(d);
	      valEl.textContent = '\u73B0\u4EF7\uFF1A' + _this.formatValue(d);
	      el.style.display = 'block';
	      el.style.top = o.top - el.offsetHeight + 'px';
	      el.style.left = o.left - el.offsetWidth / 2 + tb.width / 2 + 'px';
	      el.classList.add('show');
	    };

	    this.hide = function () {
	      el.classList.remove('show');
	    };

	    this.set(config);
	    this.createTip();
	  }

	  _createClass(ChartTip, [{
	    key: 'formatDate',
	    value: function formatDate(d) {
	      var date = new Date(d.date);
	      var year = date.getFullYear();
	      var month = date.getMonth();
	      month = ('00' + (month + 1)).slice(-2);
	      return year + '.' + month;
	    }
	  }, {
	    key: 'set',
	    value: function set(config) {
	      Object.assign(this, config);
	    }
	  }, {
	    key: 'createTip',
	    value: function createTip() {
	      if (document.getElementById('chart-tip')) {
	        return;
	      }
	      var el = window.document.createElement('div');
	      el.id = 'chart-tip';
	      el.style.display = 'none';
	      window.document.body.appendChild(el);
	      var timeEl = window.document.createElement('div');
	      timeEl.id = 'chart-tip__time';
	      var valEl = window.document.createElement('div');
	      valEl.id = 'chart-tip__value';
	      el.appendChild(timeEl);
	      el.appendChild(valEl);
	    }
	  }]);

	  return ChartTip;
	}();

	exports.default = ChartTip;

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	var support = __webpack_require__(5)
	var getDocument = __webpack_require__(7)
	var withinElement = __webpack_require__(8)

	/**
	 * Get offset of a DOM Element or Range within the document.
	 *
	 * @param {DOMElement|Range} el - the DOM element or Range instance to measure
	 * @return {Object} An object with `top` and `left` Number values
	 * @public
	 */

	module.exports = function offset(el) {
	  var doc = getDocument(el)
	  if (!doc) return

	  // Make sure it's not a disconnected DOM node
	  if (!withinElement(el, doc)) return

	  var body = doc.body
	  if (body === el) {
	    return bodyOffset(el)
	  }

	  var box = { top: 0, left: 0 }
	  if ( typeof el.getBoundingClientRect !== "undefined" ) {
	    // If we don't have gBCR, just use 0,0 rather than error
	    // BlackBerry 5, iOS 3 (original iPhone)
	    box = el.getBoundingClientRect()

	    if (el.collapsed && box.left === 0 && box.top === 0) {
	      // collapsed Range instances sometimes report 0, 0
	      // see: http://stackoverflow.com/a/6847328/376773
	      var span = doc.createElement("span");

	      // Ensure span has dimensions and position by
	      // adding a zero-width space character
	      span.appendChild(doc.createTextNode("\u200b"));
	      el.insertNode(span);
	      box = span.getBoundingClientRect();

	      // Remove temp SPAN and glue any broken text nodes back together
	      var spanParent = span.parentNode;
	      spanParent.removeChild(span);
	      spanParent.normalize();
	    }
	  }

	  var docEl = doc.documentElement
	  var clientTop  = docEl.clientTop  || body.clientTop  || 0
	  var clientLeft = docEl.clientLeft || body.clientLeft || 0
	  var scrollTop  = window.pageYOffset || docEl.scrollTop
	  var scrollLeft = window.pageXOffset || docEl.scrollLeft

	  return {
	    top: box.top  + scrollTop  - clientTop,
	    left: box.left + scrollLeft - clientLeft
	  }
	}

	function bodyOffset(body) {
	  var top = body.offsetTop
	  var left = body.offsetLeft

	  if (support.doesNotIncludeMarginInBodyOffset) {
	    top  += parseFloat(body.style.marginTop || 0)
	    left += parseFloat(body.style.marginLeft || 0)
	  }

	  return {
	    top: top,
	    left: left
	  }
	}


/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	var domready = __webpack_require__(6)

	module.exports = (function() {

		var support,
			all,
			a,
			select,
			opt,
			input,
			fragment,
			eventName,
			i,
			isSupported,
			clickFn,
			div = document.createElement("div");

		// Setup
		div.setAttribute( "className", "t" );
		div.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>";

		// Support tests won't run in some limited or non-browser environments
		all = div.getElementsByTagName("*");
		a = div.getElementsByTagName("a")[ 0 ];
		if ( !all || !a || !all.length ) {
			return {};
		}

		// First batch of tests
		select = document.createElement("select");
		opt = select.appendChild( document.createElement("option") );
		input = div.getElementsByTagName("input")[ 0 ];

		a.style.cssText = "top:1px;float:left;opacity:.5";
		support = {
			// IE strips leading whitespace when .innerHTML is used
			leadingWhitespace: ( div.firstChild.nodeType === 3 ),

			// Make sure that tbody elements aren't automatically inserted
			// IE will insert them into empty tables
			tbody: !div.getElementsByTagName("tbody").length,

			// Make sure that link elements get serialized correctly by innerHTML
			// This requires a wrapper element in IE
			htmlSerialize: !!div.getElementsByTagName("link").length,

			// Get the style information from getAttribute
			// (IE uses .cssText instead)
			style: /top/.test( a.getAttribute("style") ),

			// Make sure that URLs aren't manipulated
			// (IE normalizes it by default)
			hrefNormalized: ( a.getAttribute("href") === "/a" ),

			// Make sure that element opacity exists
			// (IE uses filter instead)
			// Use a regex to work around a WebKit issue. See #5145
			opacity: /^0.5/.test( a.style.opacity ),

			// Verify style float existence
			// (IE uses styleFloat instead of cssFloat)
			cssFloat: !!a.style.cssFloat,

			// Make sure that if no value is specified for a checkbox
			// that it defaults to "on".
			// (WebKit defaults to "" instead)
			checkOn: ( input.value === "on" ),

			// Make sure that a selected-by-default option has a working selected property.
			// (WebKit defaults to false instead of true, IE too, if it's in an optgroup)
			optSelected: opt.selected,

			// Test setAttribute on camelCase class. If it works, we need attrFixes when doing get/setAttribute (ie6/7)
			getSetAttribute: div.className !== "t",

			// Tests for enctype support on a form (#6743)
			enctype: !!document.createElement("form").enctype,

			// Makes sure cloning an html5 element does not cause problems
			// Where outerHTML is undefined, this still works
			html5Clone: document.createElement("nav").cloneNode( true ).outerHTML !== "<:nav></:nav>",

			// jQuery.support.boxModel DEPRECATED in 1.8 since we don't support Quirks Mode
			boxModel: ( document.compatMode === "CSS1Compat" ),

			// Will be defined later
			submitBubbles: true,
			changeBubbles: true,
			focusinBubbles: false,
			deleteExpando: true,
			noCloneEvent: true,
			inlineBlockNeedsLayout: false,
			shrinkWrapBlocks: false,
			reliableMarginRight: true,
			boxSizingReliable: true,
			pixelPosition: false
		};

		// Make sure checked status is properly cloned
		input.checked = true;
		support.noCloneChecked = input.cloneNode( true ).checked;

		// Make sure that the options inside disabled selects aren't marked as disabled
		// (WebKit marks them as disabled)
		select.disabled = true;
		support.optDisabled = !opt.disabled;

		// Test to see if it's possible to delete an expando from an element
		// Fails in Internet Explorer
		try {
			delete div.test;
		} catch( e ) {
			support.deleteExpando = false;
		}

		if ( !div.addEventListener && div.attachEvent && div.fireEvent ) {
			div.attachEvent( "onclick", clickFn = function() {
				// Cloning a node shouldn't copy over any
				// bound event handlers (IE does this)
				support.noCloneEvent = false;
			});
			div.cloneNode( true ).fireEvent("onclick");
			div.detachEvent( "onclick", clickFn );
		}

		// Check if a radio maintains its value
		// after being appended to the DOM
		input = document.createElement("input");
		input.value = "t";
		input.setAttribute( "type", "radio" );
		support.radioValue = input.value === "t";

		input.setAttribute( "checked", "checked" );

		// #11217 - WebKit loses check when the name is after the checked attribute
		input.setAttribute( "name", "t" );

		div.appendChild( input );
		fragment = document.createDocumentFragment();
		fragment.appendChild( div.lastChild );

		// WebKit doesn't clone checked state correctly in fragments
		support.checkClone = fragment.cloneNode( true ).cloneNode( true ).lastChild.checked;

		// Check if a disconnected checkbox will retain its checked
		// value of true after appended to the DOM (IE6/7)
		support.appendChecked = input.checked;

		fragment.removeChild( input );
		fragment.appendChild( div );

		// Technique from Juriy Zaytsev
		// http://perfectionkills.com/detecting-event-support-without-browser-sniffing/
		// We only care about the case where non-standard event systems
		// are used, namely in IE. Short-circuiting here helps us to
		// avoid an eval call (in setAttribute) which can cause CSP
		// to go haywire. See: https://developer.mozilla.org/en/Security/CSP
		if ( !div.addEventListener ) {
			for ( i in {
				submit: true,
				change: true,
				focusin: true
			}) {
				eventName = "on" + i;
				isSupported = ( eventName in div );
				if ( !isSupported ) {
					div.setAttribute( eventName, "return;" );
					isSupported = ( typeof div[ eventName ] === "function" );
				}
				support[ i + "Bubbles" ] = isSupported;
			}
		}

		// Run tests that need a body at doc ready
		domready(function() {
			var container, div, tds, marginDiv,
				divReset = "padding:0;margin:0;border:0;display:block;overflow:hidden;box-sizing:content-box;-moz-box-sizing:content-box;-webkit-box-sizing:content-box;",
				body = document.getElementsByTagName("body")[0];

			if ( !body ) {
				// Return for frameset docs that don't have a body
				return;
			}

			container = document.createElement("div");
			container.style.cssText = "visibility:hidden;border:0;width:0;height:0;position:static;top:0;margin-top:1px";
			body.insertBefore( container, body.firstChild );

			// Construct the test element
			div = document.createElement("div");
			container.appendChild( div );

	    //Check if table cells still have offsetWidth/Height when they are set
	    //to display:none and there are still other visible table cells in a
	    //table row; if so, offsetWidth/Height are not reliable for use when
	    //determining if an element has been hidden directly using
	    //display:none (it is still safe to use offsets if a parent element is
	    //hidden; don safety goggles and see bug #4512 for more information).
	    //(only IE 8 fails this test)
			div.innerHTML = "<table><tr><td></td><td>t</td></tr></table>";
			tds = div.getElementsByTagName("td");
			tds[ 0 ].style.cssText = "padding:0;margin:0;border:0;display:none";
			isSupported = ( tds[ 0 ].offsetHeight === 0 );

			tds[ 0 ].style.display = "";
			tds[ 1 ].style.display = "none";

			// Check if empty table cells still have offsetWidth/Height
			// (IE <= 8 fail this test)
			support.reliableHiddenOffsets = isSupported && ( tds[ 0 ].offsetHeight === 0 );

			// Check box-sizing and margin behavior
			div.innerHTML = "";
			div.style.cssText = "box-sizing:border-box;-moz-box-sizing:border-box;-webkit-box-sizing:border-box;padding:1px;border:1px;display:block;width:4px;margin-top:1%;position:absolute;top:1%;";
			support.boxSizing = ( div.offsetWidth === 4 );
			support.doesNotIncludeMarginInBodyOffset = ( body.offsetTop !== 1 );

			// NOTE: To any future maintainer, we've window.getComputedStyle
			// because jsdom on node.js will break without it.
			if ( window.getComputedStyle ) {
				support.pixelPosition = ( window.getComputedStyle( div, null ) || {} ).top !== "1%";
				support.boxSizingReliable = ( window.getComputedStyle( div, null ) || { width: "4px" } ).width === "4px";

				// Check if div with explicit width and no margin-right incorrectly
				// gets computed margin-right based on width of container. For more
				// info see bug #3333
				// Fails in WebKit before Feb 2011 nightlies
				// WebKit Bug 13343 - getComputedStyle returns wrong value for margin-right
				marginDiv = document.createElement("div");
				marginDiv.style.cssText = div.style.cssText = divReset;
				marginDiv.style.marginRight = marginDiv.style.width = "0";
				div.style.width = "1px";
				div.appendChild( marginDiv );
				support.reliableMarginRight =
					!parseFloat( ( window.getComputedStyle( marginDiv, null ) || {} ).marginRight );
			}

			if ( typeof div.style.zoom !== "undefined" ) {
				// Check if natively block-level elements act like inline-block
				// elements when setting their display to 'inline' and giving
				// them layout
				// (IE < 8 does this)
				div.innerHTML = "";
				div.style.cssText = divReset + "width:1px;padding:1px;display:inline;zoom:1";
				support.inlineBlockNeedsLayout = ( div.offsetWidth === 3 );

				// Check if elements with layout shrink-wrap their children
				// (IE 6 does this)
				div.style.display = "block";
				div.style.overflow = "visible";
				div.innerHTML = "<div></div>";
				div.firstChild.style.width = "5px";
				support.shrinkWrapBlocks = ( div.offsetWidth !== 3 );

				container.style.zoom = 1;
			}

			// Null elements to avoid leaks in IE
			body.removeChild( container );
			container = div = tds = marginDiv = null;
		});

		// Null elements to avoid leaks in IE
		fragment.removeChild( div );
		all = a = select = opt = input = fragment = div = null;

		return support;
	})();


/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	/*!
	  * domready (c) Dustin Diaz 2014 - License MIT
	  */
	!function (name, definition) {

	  if (true) module.exports = definition()
	  else if (typeof define == 'function' && typeof define.amd == 'object') define(definition)
	  else this[name] = definition()

	}('domready', function () {

	  var fns = [], listener
	    , doc = document
	    , hack = doc.documentElement.doScroll
	    , domContentLoaded = 'DOMContentLoaded'
	    , loaded = (hack ? /^loaded|^c/ : /^loaded|^i|^c/).test(doc.readyState)


	  if (!loaded)
	  doc.addEventListener(domContentLoaded, listener = function () {
	    doc.removeEventListener(domContentLoaded, listener)
	    loaded = 1
	    while (listener = fns.shift()) listener()
	  })

	  return function (fn) {
	    loaded ? setTimeout(fn, 0) : fns.push(fn)
	  }

	});


/***/ },
/* 7 */
/***/ function(module, exports) {

	
	/**
	 * Module exports.
	 */

	module.exports = getDocument;

	// defined by w3c
	var DOCUMENT_NODE = 9;

	/**
	 * Returns `true` if `w` is a Document object, or `false` otherwise.
	 *
	 * @param {?} d - Document object, maybe
	 * @return {Boolean}
	 * @private
	 */

	function isDocument (d) {
	  return d && d.nodeType === DOCUMENT_NODE;
	}

	/**
	 * Returns the `document` object associated with the given `node`, which may be
	 * a DOM element, the Window object, a Selection, a Range. Basically any DOM
	 * object that references the Document in some way, this function will find it.
	 *
	 * @param {Mixed} node - DOM node, selection, or range in which to find the `document` object
	 * @return {Document} the `document` object associated with `node`
	 * @public
	 */

	function getDocument(node) {
	  if (isDocument(node)) {
	    return node;

	  } else if (isDocument(node.ownerDocument)) {
	    return node.ownerDocument;

	  } else if (isDocument(node.document)) {
	    return node.document;

	  } else if (node.parentNode) {
	    return getDocument(node.parentNode);

	  // Range support
	  } else if (node.commonAncestorContainer) {
	    return getDocument(node.commonAncestorContainer);

	  } else if (node.startContainer) {
	    return getDocument(node.startContainer);

	  // Selection support
	  } else if (node.anchorNode) {
	    return getDocument(node.anchorNode);
	  }
	}


/***/ },
/* 8 */
/***/ function(module, exports) {

	
	/**
	 * Check if the DOM element `child` is within the given `parent` DOM element.
	 *
	 * @param {DOMElement|Range} child - the DOM element or Range to check if it's within `parent`
	 * @param {DOMElement} parent  - the parent node that `child` could be inside of
	 * @return {Boolean} True if `child` is within `parent`. False otherwise.
	 * @public
	 */

	module.exports = function within (child, parent) {
	  // don't throw if `child` is null
	  if (!child) return false;

	  // Range support
	  if (child.commonAncestorContainer) child = child.commonAncestorContainer;
	  else if (child.endContainer) child = child.endContainer;

	  // traverse up the `parentNode` properties until `parent` is found
	  var node = child;
	  while (node = node.parentNode) {
	    if (node == parent) return true;
	  }

	  return false;
	};


/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _d2 = __webpack_require__(2);

	var d3 = _interopRequireWildcard(_d2);

	var _tooltip = __webpack_require__(3);

	var _tooltip2 = _interopRequireDefault(_tooltip);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var defaults = {
	  target: '#chart',
	  width: 700,
	  height: 400,
	  // margin
	  margin: { top: 10, right: 10, bottom: 10, left: 10 },
	  // axis padding
	  axisPadding: 6,
	  // axis tick size
	  tickSize: 0,
	  // number of x-axis ticks
	  xTicks: 5,
	  // number of y-axis ticks
	  yTicks: 3,
	  // nice round values for axis
	  nice: false,
	  transition: 500,
	  spaceCount: 3
	};

	/**
	 * BarChart.
	 */

	var BarChart = function () {

	  /**
	   * Construct with the given `config`.
	   */

	  function BarChart(config) {
	    _classCallCheck(this, BarChart);

	    this.conf = {};
	    this.set(config);
	    this.tooltip = new _tooltip2.default();
	    this.setDimensions();
	    this.init();
	  }

	  /**
	   * Set configuration options.
	   */

	  _createClass(BarChart, [{
	    key: 'set',
	    value: function set(config) {
	      Object.assign(this.conf, defaults, config);
	    }

	    /**
	     * Dimensions without margin.
	     */

	  }, {
	    key: 'setDimensions',
	    value: function setDimensions() {
	      var _conf = this.conf,
	          width = _conf.width,
	          height = _conf.height,
	          margin = _conf.margin;

	      var w = width - margin.left - margin.right;
	      var h = height - margin.top - margin.bottom;
	      this.conf.dimensions = [w, h];
	    }

	    /**
	     * Initialize the chart.
	     */

	  }, {
	    key: 'init',
	    value: function init() {
	      var _conf2 = this.conf,
	          target = _conf2.target,
	          width = _conf2.width,
	          height = _conf2.height,
	          margin = _conf2.margin,
	          axisPadding = _conf2.axisPadding,
	          interpolate = _conf2.interpolate;
	      var _conf3 = this.conf,
	          tickSize = _conf3.tickSize,
	          xTicks = _conf3.xTicks,
	          yTicks = _conf3.yTicks;

	      var _conf$dimensions = _slicedToArray(this.conf.dimensions, 2),
	          w = _conf$dimensions[0],
	          h = _conf$dimensions[1];

	      this.chart = d3.select(target).attr('width', width).attr('height', height).append('g').attr('transform', 'translate(' + margin.left + ', ' + margin.top + ')');

	      this.xScale = d3.scaleTime().range([0, w]);

	      this.yScale = d3.scaleLinear().range([h, 0]);

	      this.xAxis = d3.axisTop().scale(this.xScale).ticks(xTicks).tickPadding(8).tickSize(-5).tickSizeOuter(0).tickFormat(d3.timeFormat("%Y.%m"));

	      this.yAxis = d3.axisRight().scale(this.yScale).ticks(yTicks).tickPadding(8).tickSize(-w).tickSizeOuter(0);

	      this.chart.append('g').attr('class', 'x axis').attr('transform', 'translate(0, ' + -axisPadding + ')').call(this.xAxis);

	      this.chart.append('g').attr('class', 'y axis').attr('transform', 'translate(' + w + ', 0)').call(this.yAxis);
	    }
	  }, {
	    key: 'addMonth',
	    value: function addMonth(date, n) {
	      date = new Date(date);
	      return date.setMonth(date.getMonth() + n);
	    }
	    /**
	     * Render axis.
	     */

	  }, {
	    key: 'renderAxis',
	    value: function renderAxis(data, options) {
	      var chart = this.chart,
	          xScale = this.xScale,
	          yScale = this.yScale,
	          xAxis = this.xAxis,
	          yAxis = this.yAxis,
	          nice = this.nice;
	      var _conf4 = this.conf,
	          transition = _conf4.transition,
	          spaceCount = _conf4.spaceCount;

	      var _d3$extent = d3.extent(data, function (d) {
	        return d.value;
	      }),
	          _d3$extent2 = _slicedToArray(_d3$extent, 2),
	          ymin = _d3$extent2[0],
	          ymax = _d3$extent2[1];

	      var _d3$extent3 = d3.extent(data, function (d) {
	        return d.date;
	      }),
	          _d3$extent4 = _slicedToArray(_d3$extent3, 2),
	          xmin = _d3$extent4[0],
	          xmax = _d3$extent4[1];

	      var xd = xScale.domain([this.addMonth(xmin, -1), this.addMonth(xmax, 1)]);
	      var spaceGutter = Math.round((ymax - ymin) / data.length);

	      if (ymin < 0 && ymax < 0) {
	        ymax = 0;
	      } else if (ymin > 0 && ymax > 0) {
	        ymin = 0;
	      } else {
	        ymin = ymin - spaceCount * spaceGutter;
	        ymax = ymax + spaceCount * spaceGutter;
	      }
	      var yd = yScale.domain([ymin, ymax]);

	      chart.transition().duration(transition).select('.x.axis').call(xAxis);
	      chart.transition().duration(transition).select('.y.axis').call(yAxis);
	    }

	    /**
	     * Render line.
	     */

	  }, {
	    key: 'renderBars',
	    value: function renderBars(data, options) {
	      var chart = this.chart,
	          xScale = this.xScale,
	          yScale = this.yScale;
	      var transition = this.conf.transition;

	      var _conf$dimensions2 = _slicedToArray(this.conf.dimensions, 2),
	          w = _conf$dimensions2[0],
	          h = _conf$dimensions2[1];

	      var barWidth = w / data.length / 2;
	      if (barWidth > 30) {
	        barWidth = 30;
	      }
	      var bars = chart.selectAll('.bar').data(data);
	      bars.enter().append("rect").merge(bars).attr("class", function (d) {
	        if (d.value > 0) {
	          return 'bar bar-' + d.symbol + ' positive';
	        } else {
	          return 'bar bar-' + d.symbol + ' negative';
	        }
	      }).transition().duration(transition).attr("x", function (d) {
	        return xScale(d.date);
	      }).attr("y", function (d) {
	        if (d.value > 0) {
	          return yScale(d.value);
	        } else {
	          return yScale(0);
	        }
	      }).attr("width", barWidth).attr("height", function (d) {
	        return Math.abs(yScale(d.value) - yScale(0));
	      });

	      bars.exit().transition().duration(transition).attr('height', 0).remove();
	    }

	    /**
	     * Render the chart against the given `data`.
	     */

	  }, {
	    key: 'render',
	    value: function render(data) {
	      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

	      var parseValue = d3.format(".1f");
	      data = data.map(function (d) {
	        var item = {
	          date: new Date(d.timestamp * 1000),
	          value: +parseValue(d.value),
	          symbol: d.symbol,
	          color: d.color
	        };
	        return item;
	      });
	      this.renderAxis(data, options);
	      this.renderBars(data, options);
	      this.renderMoveLine(data, options);
	    }

	    /**
	     * Render Move Line
	     */

	  }, {
	    key: 'renderMoveLine',
	    value: function renderMoveLine(data, options) {
	      var self = this;
	      var prefix = 'chart-move-line';

	      var _conf$dimensions3 = _slicedToArray(this.conf.dimensions, 2),
	          w = _conf$dimensions3[0],
	          h = _conf$dimensions3[1];

	      var xScale = this.xScale,
	          yScale = this.yScale;

	      if (options.animate) {
	        this.chart.select('.move-line-container').remove();
	      }
	      var moveLine = this.chart.append('g').attr('class', 'move-line-container').style('display', 'none');
	      moveLine.append('line').attr('class', 'move-line y ' + prefix).attr('y1', 0).attr('y2', h);
	      moveLine.append('line').attr('class', 'move-line x ' + prefix).attr('x1', 0).attr('x2', w);

	      moveLine.append('rect').attr('class', 'x-tip-rect').attr('transform', 'translate(' + w + ', -10)').style("pointer-events", "all");

	      moveLine.append('text').attr('class', 'x-tip-text').attr('font-size', 12).attr('fill', '#fff').attr('transform', 'translate(' + (w + 5) + ', 0)');

	      this.chart.selectAll('.bar').on("mouseover", function () {
	        moveLine.style('display', null);
	      }).on('mouseout', function () {
	        moveLine.style('display', 'none');
	        self.tooltip.hide();
	      }).on('mousemove', function () {
	        var bisect = d3.bisector(function (d) {
	          return d.date;
	        }).right;
	        var x0 = d3.mouse(this)[0];
	        var date0 = xScale.invert(x0);
	        var index = bisect(data, date0);
	        var y = data[index - 1];
	        moveLine.select('.y').attr('transform', 'translate(' + x0 + ', 0)');
	        if (y) {
	          moveLine.select('.x').attr('transform', 'translate(0, ' + yScale(y.value) + ')');

	          moveLine.select('.x-tip-rect').attr('transform', 'translate(' + (w + 5) + ', ' + (yScale(y.value) - 10) + ')');
	          moveLine.select('text').attr('transform', 'translate(' + (w + 10) + ', ' + (yScale(y.value) + 4) + ')').text('' + parseFloat(y.value).toFixed(1));
	        }
	        var bars = self.chart.selectAll('.bar').nodes();
	        if (bars && bars[index - 1]) {
	          self.tooltip.show(bars[index - 1], y);
	        }
	      });
	    }
	    /**
	     * Update the chart against the given `data`.
	     */

	  }, {
	    key: 'update',
	    value: function update(data) {
	      this.render(data, { animate: true });
	    }
	  }]);

	  return BarChart;
	}();

	exports.default = BarChart;

/***/ }
/******/ ])
});
;