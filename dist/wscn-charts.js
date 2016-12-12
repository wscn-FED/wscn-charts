(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require(undefined));
	else if(typeof define === 'function' && define.amd)
		define(["d3"], factory);
	else if(typeof exports === 'object')
		exports["WscnCharts"] = factory(require(undefined));
	else
		root["WscnCharts"] = factory(root[undefined]);
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

	module.exports = {
	  LineChart: __webpack_require__(1),
	  BarChart: __webpack_require__(13)
	};

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

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
	  nice: false
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

	      this.xAxis = d3.axisTop().scale(this.xScale).ticks(xTicks).tickPadding(8).tickSize(-5).tickFormat(d3.timeFormat("%Y.%m"));

	      this.yAxis = d3.axisRight().scale(this.yScale).ticks(yTicks).tickPadding(8).tickSize(-w);

	      this.chart.append('g').attr('class', 'x axis').attr('transform', 'translate(0, ' + -axisPadding + ')').call(this.xAxis);

	      this.chart.append('g').attr('class', 'y axis').attr('transform', 'translate(' + w + ', 0)').call(this.yAxis);
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

	      var _d3$extent = d3.extent(data, function (d) {
	        return d.value;
	      }),
	          _d3$extent2 = _slicedToArray(_d3$extent, 2),
	          min = _d3$extent2[0],
	          max = _d3$extent2[1];

	      console.log(min);
	      console.log(max);
	      var xd = xScale.domain(d3.extent(data, function (d) {
	        return d.date;
	      }));
	      var yd = yScale.domain([min - 10, max + 10]);

	      if (nice) {
	        xd.nice();
	        yd.nice();
	      }

	      var c = options.animate ? chart.transition() : chart;

	      c.select('.x.axis').call(xAxis);
	      c.select('.y.axis').call(yAxis);
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

	      var tchart = chart.transition();
	      var prefix = options.prefix || 'chart';
	      var line = d3.line().x(function (d) {
	        return _this.xScale(d.date);
	      }).y(function (d) {
	        return _this.yScale(d.value);
	      });

	      chart.append('path').attr('class', 'line line-' + prefix);

	      tchart.select('.line-' + prefix).attr('d', line(data));
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

	      var prefix = options.prefix || 'line-dot';
	      this.chart.selectAll('dot').data(data).enter().append('circle').attr('class', 'dot ' + prefix).attr('r', 4).attr('cx', function (d) {
	        return xScale(d.date);
	      }).attr('cy', function (d) {
	        return yScale(d.value);
	      }).attr('fill', function (d) {
	        return d.color;
	      }).exit().remove();
	    }
	    /**
	     * Render mutiple lines
	     */

	  }, {
	    key: 'renderMultiLines',
	    value: function renderMultiLines(data) {
	      var _this2 = this;

	      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

	      var parseValue = d3.format(".1f");
	      data = data.map(function (d) {
	        return {
	          date: new Date(d.timestamp * 1000),
	          value: +parseValue(d.value || 0),
	          symbol: d.symbol
	        };
	      });
	      this.renderAxis(data, options);
	      var nestData = d3.nest().key(function (d) {
	        return d.symbol;
	      }).entries(data);

	      nestData.forEach(function (d) {
	        _this2.renderLine(d.values, { prefix: d.key });
	        _this2.renderDots(d.values, { prefix: d.key });
	      });
	      this.renderMoveLine(data);
	    }
	    /**
	     * Render Move Line
	     */

	  }, {
	    key: 'renderMoveLine',
	    value: function renderMoveLine(data, options) {
	      var self = this;
	      var prefix = 'chart-move-line';

	      var _conf$dimensions2 = _slicedToArray(this.conf.dimensions, 2),
	          w = _conf$dimensions2[0],
	          h = _conf$dimensions2[1];

	      var xScale = this.xScale,
	          yScale = this.yScale;

	      var moveLine = this.chart.append('g').style('display', 'none');
	      moveLine.append('line').attr('class', 'move-line y ' + prefix).attr('y1', 0).attr('y2', h);
	      moveLine.append('line').attr('class', 'move-line x ' + prefix).attr('x1', 0).attr('x2', w);

	      moveLine.append('rect').attr('class', 'x-tip-rect').attr('transform', 'translate(' + (w + 5) + ', -10)').style("pointer-events", "all");

	      moveLine.append('text').attr('class', 'x-tip-text').attr('font-size', 12).attr('fill', '#fff').attr('transform', 'translate(' + (w + 10) + ', 0)');

	      this.chart.selectAll('.dot').on("mouseover", function () {
	        moveLine.style('display', null);
	      }).on('mouseout', function () {
	        moveLine.style('display', 'none');
	        self.tooltip.hide();
	      }).on('mousemove', function () {
	        var bisect = d3.bisector(function (d) {
	          return d.date;
	        }).left;
	        var x0 = d3.mouse(this)[0];
	        var date0 = xScale.invert(x0);
	        var index = bisect(data, date0);
	        var y = data[index];
	        moveLine.select('.y').attr('transform', 'translate(' + x0 + ', 0)');
	        if (y) {
	          moveLine.select('.x').attr('transform', 'translate(0, ' + yScale(y.value) + ')');

	          moveLine.select('.x-tip-rect').attr('transform', 'translate(' + (w + 5) + ', ' + (yScale(y.value) - 10) + ')');
	          moveLine.select('text').attr('transform', 'translate(' + (w + 10) + ', ' + (yScale(y.value) + 4) + ')').text('' + parseFloat(y.value).toFixed(1));
	        }
	        var circles = self.chart.selectAll('circle').nodes();
	        if (circles && circles[index]) {
	          self.tooltip.show(circles[index], y);
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
	  }, {
	    key: 'updateMulti',
	    value: function updateMulti(data) {
	      this.renderMultiLines(data, {
	        animate: true
	      });
	    }
	  }]);

	  return LineChart;
	}();

	module.exports = LineChart;

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

	__webpack_require__(9);
	var el = document.createElement('div');
	el.id = 'chart-tip';
	el.style.display = 'none';
	document.body.appendChild(el);
	var timeEl = document.createElement('div');
	timeEl.id = 'chart-tip__time';
	var valEl = document.createElement('div');
	valEl.id = 'chart-tip__value';
	el.appendChild(timeEl);
	el.appendChild(valEl);

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

	    this.hide = function (_) {
	      el.classList.remove('show');
	    };

	    this.set(config);
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

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(10);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(12)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../node_modules/css-loader/index.js!./../node_modules/postcss-loader/index.js!./../node_modules/sass-loader/index.js!./tooltip.scss", function() {
				var newContent = require("!!./../node_modules/css-loader/index.js!./../node_modules/postcss-loader/index.js!./../node_modules/sass-loader/index.js!./tooltip.scss");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(11)();
	// imports


	// module
	exports.push([module.id, "#chart-tip.show {\n  animation-name: show;\n  animation-duration: 300ms;\n  animation-fill-mode: forwards;\n  animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1); }\n\n#chart-tip {\n  position: absolute;\n  text-transform: none;\n  background: #fff;\n  color: #333;\n  padding: 6px;\n  border-radius: 2px;\n  z-index: 100;\n  pointer-events: none;\n  font-size: 12px;\n  line-height: 13px;\n  transition: all 150ms cubic-bezier(0.175, 0.885, 0.32, 1.275);\n  opacity: 0;\n  border: 1px solid #333; }\n  #chart-tip #chart-tip__value {\n    margin-top: 5px; }\n\n#chart-tip:after {\n  top: 100%;\n  left: 50%;\n  border: solid transparent;\n  content: \" \";\n  height: 0;\n  width: 0;\n  position: absolute;\n  pointer-events: none; }\n\n@keyframes show {\n  from {\n    opacity: 0;\n    transform: translateY(5px); }\n  to {\n    opacity: 1;\n    transform: translateY(-10px); } }\n", ""]);

	// exports


/***/ },
/* 11 */
/***/ function(module, exports) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	// css base code, injected by the css-loader
	module.exports = function() {
		var list = [];

		// return the list of modules as css string
		list.toString = function toString() {
			var result = [];
			for(var i = 0; i < this.length; i++) {
				var item = this[i];
				if(item[2]) {
					result.push("@media " + item[2] + "{" + item[1] + "}");
				} else {
					result.push(item[1]);
				}
			}
			return result.join("");
		};

		// import a list of modules into the list
		list.i = function(modules, mediaQuery) {
			if(typeof modules === "string")
				modules = [[null, modules, ""]];
			var alreadyImportedModules = {};
			for(var i = 0; i < this.length; i++) {
				var id = this[i][0];
				if(typeof id === "number")
					alreadyImportedModules[id] = true;
			}
			for(i = 0; i < modules.length; i++) {
				var item = modules[i];
				// skip already imported module
				// this implementation is not 100% perfect for weird media query combinations
				//  when a module is imported multiple times with different media queries.
				//  I hope this will never occur (Hey this way we have smaller bundles)
				if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
					if(mediaQuery && !item[2]) {
						item[2] = mediaQuery;
					} else if(mediaQuery) {
						item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
					}
					list.push(item);
				}
			}
		};
		return list;
	};


/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	var stylesInDom = {},
		memoize = function(fn) {
			var memo;
			return function () {
				if (typeof memo === "undefined") memo = fn.apply(this, arguments);
				return memo;
			};
		},
		isOldIE = memoize(function() {
			return /msie [6-9]\b/.test(window.navigator.userAgent.toLowerCase());
		}),
		getHeadElement = memoize(function () {
			return document.head || document.getElementsByTagName("head")[0];
		}),
		singletonElement = null,
		singletonCounter = 0,
		styleElementsInsertedAtTop = [];

	module.exports = function(list, options) {
		if(false) {
			if(typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
		}

		options = options || {};
		// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
		// tags it will allow on a page
		if (typeof options.singleton === "undefined") options.singleton = isOldIE();

		// By default, add <style> tags to the bottom of <head>.
		if (typeof options.insertAt === "undefined") options.insertAt = "bottom";

		var styles = listToStyles(list);
		addStylesToDom(styles, options);

		return function update(newList) {
			var mayRemove = [];
			for(var i = 0; i < styles.length; i++) {
				var item = styles[i];
				var domStyle = stylesInDom[item.id];
				domStyle.refs--;
				mayRemove.push(domStyle);
			}
			if(newList) {
				var newStyles = listToStyles(newList);
				addStylesToDom(newStyles, options);
			}
			for(var i = 0; i < mayRemove.length; i++) {
				var domStyle = mayRemove[i];
				if(domStyle.refs === 0) {
					for(var j = 0; j < domStyle.parts.length; j++)
						domStyle.parts[j]();
					delete stylesInDom[domStyle.id];
				}
			}
		};
	}

	function addStylesToDom(styles, options) {
		for(var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];
			if(domStyle) {
				domStyle.refs++;
				for(var j = 0; j < domStyle.parts.length; j++) {
					domStyle.parts[j](item.parts[j]);
				}
				for(; j < item.parts.length; j++) {
					domStyle.parts.push(addStyle(item.parts[j], options));
				}
			} else {
				var parts = [];
				for(var j = 0; j < item.parts.length; j++) {
					parts.push(addStyle(item.parts[j], options));
				}
				stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
			}
		}
	}

	function listToStyles(list) {
		var styles = [];
		var newStyles = {};
		for(var i = 0; i < list.length; i++) {
			var item = list[i];
			var id = item[0];
			var css = item[1];
			var media = item[2];
			var sourceMap = item[3];
			var part = {css: css, media: media, sourceMap: sourceMap};
			if(!newStyles[id])
				styles.push(newStyles[id] = {id: id, parts: [part]});
			else
				newStyles[id].parts.push(part);
		}
		return styles;
	}

	function insertStyleElement(options, styleElement) {
		var head = getHeadElement();
		var lastStyleElementInsertedAtTop = styleElementsInsertedAtTop[styleElementsInsertedAtTop.length - 1];
		if (options.insertAt === "top") {
			if(!lastStyleElementInsertedAtTop) {
				head.insertBefore(styleElement, head.firstChild);
			} else if(lastStyleElementInsertedAtTop.nextSibling) {
				head.insertBefore(styleElement, lastStyleElementInsertedAtTop.nextSibling);
			} else {
				head.appendChild(styleElement);
			}
			styleElementsInsertedAtTop.push(styleElement);
		} else if (options.insertAt === "bottom") {
			head.appendChild(styleElement);
		} else {
			throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
		}
	}

	function removeStyleElement(styleElement) {
		styleElement.parentNode.removeChild(styleElement);
		var idx = styleElementsInsertedAtTop.indexOf(styleElement);
		if(idx >= 0) {
			styleElementsInsertedAtTop.splice(idx, 1);
		}
	}

	function createStyleElement(options) {
		var styleElement = document.createElement("style");
		styleElement.type = "text/css";
		insertStyleElement(options, styleElement);
		return styleElement;
	}

	function createLinkElement(options) {
		var linkElement = document.createElement("link");
		linkElement.rel = "stylesheet";
		insertStyleElement(options, linkElement);
		return linkElement;
	}

	function addStyle(obj, options) {
		var styleElement, update, remove;

		if (options.singleton) {
			var styleIndex = singletonCounter++;
			styleElement = singletonElement || (singletonElement = createStyleElement(options));
			update = applyToSingletonTag.bind(null, styleElement, styleIndex, false);
			remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true);
		} else if(obj.sourceMap &&
			typeof URL === "function" &&
			typeof URL.createObjectURL === "function" &&
			typeof URL.revokeObjectURL === "function" &&
			typeof Blob === "function" &&
			typeof btoa === "function") {
			styleElement = createLinkElement(options);
			update = updateLink.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
				if(styleElement.href)
					URL.revokeObjectURL(styleElement.href);
			};
		} else {
			styleElement = createStyleElement(options);
			update = applyToTag.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
			};
		}

		update(obj);

		return function updateStyle(newObj) {
			if(newObj) {
				if(newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap)
					return;
				update(obj = newObj);
			} else {
				remove();
			}
		};
	}

	var replaceText = (function () {
		var textStore = [];

		return function (index, replacement) {
			textStore[index] = replacement;
			return textStore.filter(Boolean).join('\n');
		};
	})();

	function applyToSingletonTag(styleElement, index, remove, obj) {
		var css = remove ? "" : obj.css;

		if (styleElement.styleSheet) {
			styleElement.styleSheet.cssText = replaceText(index, css);
		} else {
			var cssNode = document.createTextNode(css);
			var childNodes = styleElement.childNodes;
			if (childNodes[index]) styleElement.removeChild(childNodes[index]);
			if (childNodes.length) {
				styleElement.insertBefore(cssNode, childNodes[index]);
			} else {
				styleElement.appendChild(cssNode);
			}
		}
	}

	function applyToTag(styleElement, obj) {
		var css = obj.css;
		var media = obj.media;

		if(media) {
			styleElement.setAttribute("media", media)
		}

		if(styleElement.styleSheet) {
			styleElement.styleSheet.cssText = css;
		} else {
			while(styleElement.firstChild) {
				styleElement.removeChild(styleElement.firstChild);
			}
			styleElement.appendChild(document.createTextNode(css));
		}
	}

	function updateLink(linkElement, obj) {
		var css = obj.css;
		var sourceMap = obj.sourceMap;

		if(sourceMap) {
			// http://stackoverflow.com/a/26603875
			css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
		}

		var blob = new Blob([css], { type: "text/css" });

		var oldSrc = linkElement.href;

		linkElement.href = URL.createObjectURL(blob);

		if(oldSrc)
			URL.revokeObjectURL(oldSrc);
	}


/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

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
	  nice: false
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

	      this.xAxis = d3.axisTop().scale(this.xScale).ticks(xTicks).tickPadding(8).tickSize(-5).tickFormat(d3.timeFormat("%Y.%m"));

	      this.yAxis = d3.axisRight().scale(this.yScale).ticks(yTicks).tickPadding(8).tickSize(-w);

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

	      var _d3$extent = d3.extent(data, function (d) {
	        return d.value;
	      }),
	          _d3$extent2 = _slicedToArray(_d3$extent, 2),
	          min = _d3$extent2[0],
	          max = _d3$extent2[1];

	      var _d3$extent3 = d3.extent(data, function (d) {
	        return d.date;
	      }),
	          _d3$extent4 = _slicedToArray(_d3$extent3, 2),
	          xmin = _d3$extent4[0],
	          xmax = _d3$extent4[1];

	      var xd = xScale.domain([this.addMonth(xmin, -1), this.addMonth(xmax, 2)]);
	      var yd = yScale.domain([0, max + 10]);

	      if (nice) {
	        xd.nice();
	        yd.nice();
	      }

	      var c = options.animate ? chart.transition() : chart;

	      c.select('.x.axis').call(xAxis);
	      c.select('.y.axis').call(yAxis);
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

	      var _conf$dimensions2 = _slicedToArray(this.conf.dimensions, 2),
	          w = _conf$dimensions2[0],
	          h = _conf$dimensions2[1];

	      var tchart = chart.transition();
	      var prefix = options.prefix || 'chart';
	      chart.selectAll('bar').data(data).enter().append("rect").attr("class", 'bar bar-' + prefix).attr("x", function (d) {
	        return xScale(d.date);
	      }).attr("y", function (d) {
	        return yScale(d.value);
	      }).attr("width", 30).attr("height", function (d) {
	        return h - yScale(d.value);
	      });
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
	     * Rende multibar
	     */

	  }, {
	    key: 'renderMultiBars',
	    value: function renderMultiBars(data) {
	      var _this = this;

	      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

	      var parseValue = d3.format(".1f");
	      data = data.map(function (d) {
	        return {
	          date: new Date(d.timestamp * 1000),
	          value: +parseValue(d.value || 0),
	          symbol: d.symbol
	        };
	      });
	      this.renderAxis(data, options);
	      var nestData = d3.nest().key(function (d) {
	        return d.symbol;
	      }).entries(data);

	      nestData.forEach(function (d) {
	        _this.renderBars(d.values, { prefix: d.key });
	      });
	      this.renderMoveLine(data);
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

	      var moveLine = this.chart.append('g').style('display', 'none');
	      moveLine.append('line').attr('class', 'move-line y ' + prefix).attr('y1', 0).attr('y2', h);
	      moveLine.append('line').attr('class', 'move-line x ' + prefix).attr('x1', 0).attr('x2', w);

	      moveLine.append('rect').attr('class', 'x-tip-rect').attr('transform', 'translate(' + (w + 5) + ', -10)').style("pointer-events", "all");

	      moveLine.append('text').attr('class', 'x-tip-text').attr('font-size', 12).attr('fill', '#fff').attr('transform', 'translate(' + (w + 10) + ', 0)');

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
	      this.render(data, {
	        animate: true
	      });
	    }
	  }]);

	  return BarChart;
	}();

	module.exports = BarChart;

/***/ }
/******/ ])
});
;