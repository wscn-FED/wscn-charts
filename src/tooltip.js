import offset from 'document-offset'
import * as d3 from 'd3'


export default class ChartTip {
  constructor(config) {
    this.set(config)
    this.createTip()
  }
  formatValue = d => d.value
  formatDate(d) {
    let date = new Date(d.date)
    const year = date.getFullYear()
    let month = date.getMonth()
    month = `00${month+1}`.slice(-2)
    return `${year}.${month}`
  }
  set(config) {
    Object.assign(this, config)
  }
  createTip() {
    if (document.getElementById('chart-tip')) {
      return
    }
    this.el = window.document.createElement('div')
    this.el.id = 'chart-tip'
    this.el.style.display = 'none'
    window.document.body.appendChild(this.el)
    this.timeEl = window.document.createElement('div')
    this.timeEl.id = 'chart-tip__time'
    this.valEl = window.document.createElement('div')
    this.valEl.id = 'chart-tip__value'
    this.el.appendChild(this.timeEl)
    this.el.appendChild(this.valEl)
  }
  show = (target, d) => {
    const tb = target.getBoundingClientRect()
    const o = offset(target)
    this.timeEl.textContent = `时间：${this.formatDate(d)}`
    this.valEl.textContent = `现价：${this.formatValue(d)}`
    this.el.style.display = 'block'
    this.el.style.top = o.top - this.el.offsetHeight + 'px'
    this.el.style.left = o.left - (this.el.offsetWidth / 2) + (tb.width / 2) + 'px'
    this.el.classList.add('show')
  }
  hide = () => {
    this.el.classList.remove('show')
  }
}
