import * as d3 from 'd3'
import ChartTip from './tooltip'

const defaults = {
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
}

/**
 * BarChart.
 */

class BarChart {

  /**
   * Construct with the given `config`.
   */

  constructor(config) {
    this.conf = {}
    this.set(config)
    this.tooltip = new ChartTip()
    this.setDimensions()
    this.init()
  }

  /**
   * Set configuration options.
   */

  set(config) {
    Object.assign(this.conf, defaults, config)
  }

  /**
   * Dimensions without margin.
   */

  setDimensions() {
    const { width, height, margin } = this.conf
    const w = width - margin.left - margin.right
    const h = height - margin.top - margin.bottom
    this.conf.dimensions = [w, h]
  }

  /**
   * Initialize the chart.
   */

  init() {
    const { target, width, height, margin, axisPadding, interpolate } = this.conf
    const { tickSize, xTicks, yTicks } = this.conf
    const [w, h] = this.conf.dimensions

    this.chart = d3.select(target)
        .attr('width', width)
        .attr('height', height)
        .append('g')
        .attr('transform', `translate(${margin.left}, ${margin.top})`)


    this.xScale = d3.scaleTime()
      .range([0, w])

    this.yScale = d3.scaleLinear()
      .range([h, 0])

    this.xAxis = d3.axisTop()
      .scale(this.xScale)
      .ticks(xTicks)
      .tickPadding(8)
      .tickSize(-5)
      .tickFormat(d3.timeFormat("%Y.%m"))

    this.yAxis = d3.axisRight()
      .scale(this.yScale)
      .ticks(yTicks)
      .tickPadding(8)
      .tickSize(-w)

    this.chart.append('g')
      .attr('class', 'x axis')
      .attr('transform', `translate(0, ${-axisPadding})`)
      .call(this.xAxis)

    this.chart.append('g')
      .attr('class', 'y axis')
      .attr('transform', `translate(${w}, 0)`)
      .call(this.yAxis)
  }
  addMonth(date, n) {
    date = new Date(date)
    return date.setMonth(date.getMonth() + n)
  }
  /**
   * Render axis.
   */

  renderAxis(data, options) {
    const { chart, xScale, yScale, xAxis, yAxis, nice } = this
    const [min, max] = d3.extent(data, d => d.value)
    const [xmin, xmax] = d3.extent(data, d => d.date)
    const xd = xScale.domain([this.addMonth(xmin, -1), this.addMonth(xmax, 2)])
    const yd = yScale.domain([0, max+10])

    if (nice) {
      xd.nice()
      yd.nice()
    }

    const c = options.animate
      ? chart.transition()
      : chart

    c.select('.x.axis').call(xAxis)
    c.select('.y.axis').call(yAxis)
  }

  /**
   * Render line.
   */

   renderBars(data, options) {
     const { chart, xScale, yScale } = this
     const [w, h] = this.conf.dimensions
     const tchart = chart.transition()
     const prefix = options.prefix || 'chart'
     chart.selectAll('bar')
      .data(data)
      .enter().append("rect")
      .attr("class", `bar bar-${prefix}`)
      .attr("x", d => xScale(d.date))
      .attr("y", d => yScale(d.value))
      .attr("width", 30)
      .attr("height", d => h - yScale(d.value));
   }

  /**
   * Render the chart against the given `data`.
   */

   render(data, options = {}) {
     const parseValue = d3.format(".1f")
     data = data.map(d => {
       let item = {
         date: new Date(d.timestamp*1000),
         value: +parseValue(d.value),
         symbol: d.symbol,
         color: d.color
       }
       return item
     })
     this.renderAxis(data, options)
     this.renderBars(data, options)
     this.renderMoveLine(data, options)
   }
   /**
    * Rende multibar
    */
  renderMultiBars(data, options={}) {
    const parseValue = d3.format(".1f")
    data = data.map(d => {
      return {
        date: new Date(d.timestamp*1000),
        value: +parseValue(d.value || 0),
        symbol: d.symbol
      }
    })
    this.renderAxis(data, options)
    const nestData = d3.nest()
      .key(d => d.symbol)
      .entries(data)

    nestData.forEach(d => {
      this.renderBars(d.values, {prefix: d.key})
    })
    this.renderMoveLine(data)
  }
  /**
   * Render Move Line
   */
  renderMoveLine(data, options) {
    const self = this
    const prefix = 'chart-move-line'
    const [w, h] = this.conf.dimensions
    const { xScale, yScale } = this
    let moveLine = this.chart.append('g')
      .style('display', 'none')
    moveLine.append('line')
      .attr('class', `move-line y ${prefix}`)
      .attr('y1', 0)
      .attr('y2', h)
    moveLine.append('line')
      .attr('class', `move-line x ${prefix}`)
      .attr('x1', 0)
      .attr('x2', w)

    moveLine.append('rect')
      .attr('class', 'x-tip-rect')
      .attr('transform', `translate(${w+5}, -10)`)
      .style("pointer-events", "all")

    moveLine.append('text')
      .attr('class', 'x-tip-text')
      .attr('font-size', 12)
      .attr('fill', '#fff')
      .attr('transform', `translate(${w+10}, 0)`)

    this.chart
      .selectAll('.bar')
      .on("mouseover", () => {
        moveLine.style('display', null)
      })
      .on('mouseout', () => {
        moveLine.style('display', 'none')
        self.tooltip.hide()
      })
      .on('mousemove', function() {
        const bisect = d3.bisector(d => d.date).right;
        const x0 = d3.mouse(this)[0]
        const date0 = xScale.invert(x0)
        const index = bisect(data, date0)
        const y = data[index-1]
        moveLine.select('.y')
          .attr('transform', `translate(${x0}, 0)`)
        if (y) {
          moveLine.select('.x')
          .attr('transform', `translate(0, ${yScale(y.value)})`)

          moveLine.select('.x-tip-rect')
            .attr('transform', `translate(${w+5}, ${yScale(y.value)-10})`)
          moveLine.select('text')
            .attr('transform', `translate(${w+10}, ${yScale(y.value)+4})`)
            .text(`${parseFloat(y.value).toFixed(1)}`)
        }
        const bars = self.chart.selectAll('.bar').nodes();
        if (bars && bars[index-1]) {
          self.tooltip.show(bars[index-1], y)
        }
      })
  }
  /**
   * Update the chart against the given `data`.
   */

   update(data) {
     this.render(data, {
       animate: true
     })
   }
}

module.exports = BarChart
