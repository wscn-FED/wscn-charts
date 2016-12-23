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
  nice: false,
  transition: 500,
  spaceCount: 3
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
      .tickSizeOuter(0)
      .tickFormat(d3.timeFormat("%Y.%m"))

    this.yAxis = d3.axisRight()
      .scale(this.yScale)
      .ticks(yTicks)
      .tickPadding(8)
      .tickSize(-w)
      .tickSizeOuter(0)

    this.chart.append('g')
      .attr('class', 'x axis')
      .attr('transform', `translate(0, ${-axisPadding})`)
      .call(this.xAxis)

    this.chart.append('g')
      .attr('class', 'y axis')
      .attr('transform', `translate(${w}, 0)`)
      .call(this.yAxis)

    this.chart.append('path')
       .attr('class', 'line')
  }

  /**
   * Render axis.
   */

  renderAxis(data, options) {
    const { chart, xScale, yScale, xAxis, yAxis, nice } = this
    const { transition, spaceCount } = this.conf
    const [min, max] = d3.extent(data, d => d.value)
    const spaceGutter = Math.round((max-min)/data.length)
    const xd = xScale.domain(d3.extent(data, d => d.date))
    //here more 5 for y to make style better
    const yd = yScale.domain([min-spaceCount*spaceGutter, max+(spaceCount+5)*spaceGutter])

    chart.transition().duration(transition).select('.x.axis').call(xAxis)
    chart.transition().duration(transition).select('.y.axis').call(yAxis)
  }

  /**
   * Render line.
   */

   renderLine(data, options) {
     const { interpolate, chart } = this
     const { transition } = this.conf
     const line = d3.line()
       .x(d => this.xScale(d.date))
       .y(d => this.yScale(d.value))

     chart.transition().duration(transition).select(`.line`)
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
         value: +parseValue(d.value),
         symbol: d.symbol,
         color: d.color
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
      if (options.animate) {
        this.chart.selectAll('.dot').remove()
      }
      this.chart.selectAll('.dot-container')
        .data(data)
        .enter()
        .append('circle')
        .attr('class', 'dot dot-container')
        .attr('cx', d => xScale(d.date))
        .attr('cy', d => yScale(d.value))
        .attr('r', 5)
        .attr('fill', '#fff')
        .exit()
        .remove()


      this.chart.selectAll('.dot-circle')
        .data(data)
        .enter()
        .append('circle')
        .attr('class', d => `dot dot-circle ${d.symbol}`)
        .attr('cx', d => xScale(d.date))
        .attr('cy', d => yScale(d.value))
        .attr('r', 2)
        .attr('fill', d => d.color)
        .exit()
        .remove()
    }

  /**
   * Render Move Line
   */
  renderMoveLine(data, options) {
    const [w, h] = this.conf.dimensions
    const { xScale, yScale, chart, tooltip } = this

    if (options.animate) {
      chart.select('.move-line-container').remove()
      chart.select('.move-area').remove()
    }

    let hoverRect = chart.append('rect')
      .attr('width', w)
      .attr('height', h)
      .style("pointer-events", "all")
      .attr('fill', 'transparent')
      .attr('class', 'move-area')
    let moveLine = chart.append('g').attr('class', 'move-line-container')


    moveLine.append('line')
      .attr('class', `move-line y`)
      .attr('y1', 0)
      .attr('y2', h)
      .attr('transform', `translate(0, -5)`)
      .style('display', 'none')

    moveLine.append('line')
      .attr('class', `move-line x`)
      .attr('x1', 0)
      .attr('x2', w)
      .style('display', 'none')

    moveLine.append('rect')
      .attr('class', 'x-tip-rect')
      .attr('transform', `translate(${w}, -10)`)
      .style("pointer-events", "all")
      .style('display', 'none')

    moveLine.append('text')
      .attr('class', 'x-tip-text')
      .attr('font-size', 12)
      .attr('fill', '#fff')
      .attr('transform', `translate(${w+10}, 0)`)
      .style('display', 'none')


    const circles = chart.selectAll('.dot-circle')
    const nodes = circles.nodes()
    
    chart
      .select('.move-area')
      .on("mouseover", () => {
        moveLine.select('.y').style('display', null)
      })
      .on('mouseout', () => {
        moveLine.select('.x').style('display', 'none')
        moveLine.select('.y').style('display', 'none')
        moveLine.select('.x-tip-rect').style('display', 'none')
        moveLine.select('.x-tip-text').style('display', 'none')
        //hide tooltip
        tooltip.hide()
        if (nodes && nodes.length > 0) {
          nodes.forEach(node => {
            const r = node.getAttribute('r')
            if (r === '4') {
              node.setAttribute('r', 2)
              node.classList.remove('active')
            }
          })
        }
      })
      .on('mousemove', function() {
        const [moveX, moveY] = d3.mouse(this)
        const moveXDate = xScale.invert(moveX)
        const bisect = d3.bisector(d => d.date).left;
        moveLine.select('.y')
          .attr('transform', `translate(${moveX}, -5)`)
        const index = bisect(data, moveXDate)
        const d = data[index]
        if (!d) return
        const y = yScale(d.value)
        moveLine.select('.x')
          .style('display', null)
          .attr('transform', `translate(0, ${y})`)

          moveLine.select('.x-tip-rect')
            .style('display', null)
            .attr('transform', `translate(${w}, ${y-10})`)
          moveLine.select('text')
            .style('display', null)
            .attr('transform', `translate(${w+5}, ${y+4})`)
            .text(`${parseFloat(d.value).toFixed(1)}`)
        if (nodes && nodes[index]) {
          nodes.forEach(node => {
            const r = node.getAttribute('r')
            if (r === '4') {
              node.setAttribute('r', 2)
              node.classList.remove('active')
            }
          })
          nodes[index].setAttribute('r', 4)
          nodes[index].classList.add('active')
          tooltip.show(nodes[index], d)
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

export default LineChart
