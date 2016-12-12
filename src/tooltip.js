import offset from 'document-offset'
import * as d3 from 'd3'

const el = document.createElement('div')
el.id = 'chart-tip'
el.style.display = 'none'
document.body.appendChild(el)
const timeEl = document.createElement('div')
timeEl.id = 'chart-tip__time'
const valEl = document.createElement('div')
valEl.id = 'chart-tip__value'
el.appendChild(timeEl)
el.appendChild(valEl)


export default class ChartTip {
  constructor(config) {
    this.set(config)
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
  show = (target, d) => {
    const tb = target.getBoundingClientRect()
    const o = offset(target)
    timeEl.textContent = `时间：${this.formatDate(d)}`
    valEl.textContent = `现价：${this.formatValue(d)}`
    el.style.display = 'block'
    el.style.top = o.top - el.offsetHeight + 'px'
    el.style.left = o.left - (el.offsetWidth / 2) + (tb.width / 2) + 'px'
    el.classList.add('show')
  }
  hide = _ => {
    el.classList.remove('show')
  }
}
