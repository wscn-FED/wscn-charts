import * as d3 from 'd3'

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
  nice: false,
  // line interpolation
  interpolate: 'curveBasis',
}

/**
 * LineChart.
 */

class LineChart {

  /**
   * Construct with the given `config`.
   */

  constructor(config) {
    this.conf = {}
    this.set(config)
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
    console.log(margin)
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
      .tickFormat(d3.timeFormat("%Y.%m.%d"))

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

  /**
   * Render axis.
   */

  renderAxis(data, options) {
    const { chart, xScale, yScale, xAxis, yAxis, nice } = this

    const xd = xScale.domain(d3.extent(data, d => d.date))
    const yd = yScale.domain(d3.extent(data, d => d.value))

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

   renderLine(data, options) {
     const { interpolate, chart } = this
     const tchart = chart.transition()
     const prefix = options.prefix || 'chart'
     const line = d3.line()
       .x(d => this.xScale(d.date))
       .y(d => this.yScale(d.value))

     chart.append('path')
       .attr('class', `line line-${prefix}`)

     tchart.select(`.line-${prefix}`)
       .attr('d', line(data))
   }
   
  /**
   * Render the chart against the given `data`.
   */

   render(data, options = {}) {
     const parseValue = d3.format(".1f")
     data = data.map(d => {
       let item = {
         date: new Date(d.timestamp*1000),
         value: +parseValue(d.actual)
       }
       return item
     })
     this.renderAxis(data, options)
     this.renderLine(data, options)
     this.renderDots(data, options)
     this.renderMoveLine(data, options)
   }
   /**
    * Render dots
    */
    renderDots(data, options) {
      const { xScale, yScale } = this
      const prefix = options.prefix || 'line-dot'
      this.chart.selectAll('dot')
        .data(data)
        .enter()
        .append('circle')
        .attr('class', `dot ${prefix}`)
        .attr('r', 2)
        .attr('cx', d => xScale(d.date))
        .attr('cy', d => yScale(d.value))

    }
   /**
    * Render mutiple lines
    */
    renderMultiLines(data, options={}) {
      const parseValue = d3.format(".1f")
      let multiData = []
      data.forEach(d => {
        multiData.push({
          date: new Date(d.timestamp*1000),
          value: +parseValue(d.actual || 0),
          symbol: 'actual'
        })
        multiData.push({
          date: new Date(d.timestamp*1000),
          value: +parseValue(d.forecast || 0),
          symbol: 'forecast'
        })
      })
      this.renderAxis(multiData, options)
      const nestData = d3.nest()
        .key(d => d.symbol)
        .entries(multiData)

      nestData.forEach(d => {
        this.renderLine(d.values, {prefix: d.key})
        this.renderDots(d.values, {prefix: d.key})
        this.renderMoveLine(d.values, {prefix: d.key})
      })
      
    }
  /**
   * Render Move Line
   */
  renderMoveLine(data, options) {
    const self = this
    const prefix = options.prefix || 'chart-move-line'
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
    this.chart
      .append('rect')
      .attr('width', w)
      .attr('height', h)
      .style("fill", "none")
      .style("pointer-events", "all")
      .on("mouseover", () => moveLine.style('display', null))
      .on('mouseout', () => moveLine.style('display', 'none'))
      .on('mousemove', function() {
        const bisect = d3.bisector(d => d.date).left;
        const x0 = d3.mouse(this)[0]
        const date0 = xScale.invert(x0)
        const y = data[bisect(data, date0)]
        moveLine.select('.y')
          .attr('transform', `translate(${x0}, 0)`)
        if (y) {
          moveLine.select('.x')
          .attr('transform', `translate(0, ${yScale(y.value)})`)
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

   updateMulti(data) {
     this.renderMultiLines(data, {
       animate: true
     })
   }
}

module.exports = LineChart
