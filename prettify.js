
const prettify = (input) => {
  // console.log('prettify input', input)
  style = `style="padding-left:25px"`
  // console.log('input', input)
  if(typeof input === 'string') {
    return `<span class="pretty-string">"${input}"</span>`
  }
  if(typeof input === 'number') {
    return `<span class="pretty-value">${input}</span>`
  }
  if(typeof input === 'object') {
    if(input.constructor.name === 'Array') {
      return `<div class="pretty-wrap expanded">
      <span class="pretty-arrow"></span>[<span class="pretty-arrlen">(${input.length})</span><div ${style}>${
        _.map(input, item => `${prettify(item)}`
        , '').join(`,</div><div ${style}>`)
      }</div>]</div>`
    }
    else {
// console.log( 'map on input keys', input, Object.keys(input),
//           _.map(Object.keys(input),
//             function(k){ return 'aa' + k } // `${k}: ${prettify(input[k], indent + 1)}`
//           ) //.join(`,</div><div ${style}>`),'\n\n'
// )
//     console.log(Object.keys(input))
      return `<div class="pretty-wrap expanded">
        <span class="pretty-arrow"></span>{
        <span class="pretty-arrlen">(${Object.keys(input).length})</span>
        <div ${style}>${
          _.map(Object.keys(input),
            k => `${k}: ${prettify(input[k])}`
          ).join(`,</div><div ${style}>`)
        }</div>}</div>`
    }
  }
}

// $('#main').append(prettify('a pretty string'))
// $('#main').append(prettify(3.14))
// $('#main').append(prettify(['pi', 'is', 3.14, ['a', 'b', { a: 'aVal', b: 'bVal', c: 33 }]]))
// $('#main').append(prettify({ name: 'John Mayer', age: 40, hobbies: ['Guitar', 'Girls']}))
$('.pretty-arrow').click((e) => $(e.target).parent().toggleClass('expanded'))