const printArray = arr => `<div class="pretty-array">
  <div class="pretty-inner">
    <div class="pretty-spacer"></div>` +
    arr.reduce(
      (carry, item) =>
        carry + `<div class="pretty-item">${ prettify(item) }</div>`, ''
    ) +
    `<div class="pretty-spacer"></div>
  </div>
</div>`

class MapVisualizer {
  constructor(targetId, array, f) {
    this._output = []
    this._array = array
    this._counter = 0
    this._f = f
    this._id = this.getId()
    this._target = $(`#${targetId}`)
    this._wrap = $(
      `<div class="visualizer" id="${this._id}"></div>`
    ).appendTo(this._target)
    this._next = $(
      `<button class="btn btn-primary" style="float:right">&raquo;</button>`
    )
    .appendTo( this._wrap )


    const inputArrayBox = $(printArray(this._array)).appendTo(this._wrap)
    const inputBoxHeight = inputArrayBox.height()

    const funcCode = this.getFuncCode()
    this._funcBox = $(
      `<div class="pretty-func"><pre><code>${funcCode}</code></pre></div>`
    ).appendTo(this._wrap)

   this._outputArrayBox = $(`<div class="pretty-array">
        <div class="pretty-inner">
          <div class="pretty-spacer"></div>
          <div class="result-placeholder" style="height: ${inputBoxHeight}px;width:10px"></div>
          <div class="pretty-spacer closing-spacer"></div>
        </div>
      </div>`).appendTo(this._wrap)

    // this._wrap.find('.pretty-arrow').click((e) => $(e.target).parent().toggleClass('expanded'))
    this._inputItems = this._wrap.find('.pretty-item')
    this._inputItems.each((idx, item) => {
      $(item).append(`<div class="pretty-item-idx">${idx}</div>`)
    })
    this.clickHandler = this.clickHandler.bind(this)
    this._next.on('click', this.clickHandler)
  }
  getFuncCode() {
    const lines = this._f.toString().split('\n')
    const lastLine = lines[lines.length - 1]
    const closingBracePos = lastLine.indexOf('}')
    const firstLine = lines.shift()
    lines.forEach((l, idx) => {
      lines[idx] = l.substr(closingBracePos)
    })
    lines.unshift(firstLine)
    return lines.join('\n')
  }
  getId() {
    return 'viz-' + (Math.floor(10000000 * Math.random())).toString(36)
  }
  clickHandler(e) {
    const previousItem = $(this._inputItems[this._counter - 1])
    const currentItem = $(this._inputItems[this._counter])
    if(this._counter > 0) {
      previousItem.removeClass('highlighted')
    }
    currentItem.addClass('highlighted')
    const { left } = currentItem.offset()
    const leftOffset = Math.floor(left)
    const item = this._array[this._counter]
    const result = this._f(item)
    // this._funcBox.find('.pretty-item').remove()
    if(this._resultBox) {
      this._resultBox.removeClass('highlighted')
    }

    const resultBoxHtml = `<div class="result-item out highlighted">${ prettify(result) }</div>`

    this._resultBox = $(resultBoxHtml)
    .insertBefore(this._outputArrayBox.find('.closing-spacer'))
    this._outputArrayBox.find('.result-placeholder').remove()
    setTimeout(() => {
      this._funcBox.addClass('output')
      this._resultBox.removeClass('out')
    }, 500)
    setTimeout(() => {
      this._funcBox.removeClass('output')
    }, 1000)
    this._output.push(result)
    // this._wrap.append(`<div>${this._counter} => ${item} => ${result} [${this._output.join(', ')}]</div>`)
    this._counter++
    if(this._counter >= this._array.length) {
      this._next.removeClass('btn-primary')
      .prop('disabled', true)
      this._next.off('click')
    }
  }
}


Array.prototype.map = function(f) {
  this._visualizer = new MapVisualizer('main', this, f)
  // this._output = []
  // this._counter = 0
  // this._f = f
  // this._next = $('<button class="btn btn-primary">&raquo;</button>')
  // .appendTo( $('#main') )

  // console.log('setup map', this)
  // const clickHandler = (e => {
  //   console.log('output before', this._output)
  //   const item = this[this._counter]
  //   const result = f(item)
  //   this._output.push(result)
  //   $('#main').append(`<div>${this._counter} => ${item} => ${result} [${this._output.join(', ')}]</div>`)
  //   console.log('output after', this._output)
  //   this._counter++
  //   if(this._counter >= this.length) {
  //     console.log('done')
  //     this._next.removeClass('btn-primary')
  //     .prop('disabled', true)
  //     this._next.off('click')
  //   }
  // }).bind(this)

  // this._next.on('click', clickHandler)
}