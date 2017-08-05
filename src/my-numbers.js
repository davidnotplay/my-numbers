/**
 * @preserve
 * My numbers
 * @Author David Casado Martínez @davidnotplay
 * @license MIT
 */

/**
 * Regular expression for get the format parts.
 */
const formatRegex = new RegExp(
  /^(#)?(\+\??)?((?:1([^\d]))?1)?(?:([^\d])(0+\??))?(#)?$/ 
)

// this are invalid formats but the `formatRegex` regular expression accept as valids.
const invalidFormats = [
  '#',
  '##',
  '#+#',
  '+',
  '#+?#',
  '+?',
  '#+?',
  '+?#'
]

/**
 * Round the `num` number.
 * @param {float} num number to round
 * @param {int} decimalNumbers number of decimals
 * @return {float} Number rounded.
 */
const round = (num, decimalNumbers) => {
  return Math.round(num * Math.pow(10, decimalNumbers)) / Math.pow(10, decimalNumbers) 
}

/**
 * Escape the regular expression characters of the `str` string.
 * @param {string} str string with you want escape
 * @return {string} String escaped
 */
const escapeRegEx = (str) => {
  return str.replace(/([.+?*\\|()\][{}])/g, r => '\\' + r[0])
}

/**
 * Parse the `formatStr` format and return a object with his components.
 * @param {string} formatStr String format
 * @return {object}
 */
const parseFormatStr = (formatStr) => {
  if (invalidFormats.indexOf(formatStr) !== -1) {
    return false
  }

  const result = formatRegex.exec(formatStr)

  if (result === null) {
    return false
  }

  const format = {}
  const [
    str, prefix, sign, integer, thousands, decimal, decimalNumbers, suffix
  ] = result

  if (str === '') {
    return false
  }

  format.prefix = prefix === '#'
  format.suffix = suffix === '#'
  format.sign = sign === '+' || sign === '+?'
  format.signOptional = format.sign && sign.endsWith('?')
  format.integer = integer !== undefined
  format.decimal = decimal || false
  format.thousands = thousands || false
  format.decimalOptional = (decimalNumbers || '').endsWith('?')
  format.decimalNumbers = `${decimalNumbers || ''}`.length - (format.decimalOptional ? 1 : 0)


  return format
}

/**
 * Apply the `modifier` modifier in the `num` number
 * @param {float} num Number for the mofifier
 * @param {float|function} modifier modifier will apply in the number
 * @param {boolean} inv Indicate if the conversion is str -> num or num -> str
 * @return {float} number with the modifier applied.
 */
const parseModifiers = (num, modifier, inv) => {
  if (typeof modifier === 'number') {
    return !inv ? num * modifier : num * (1/modifier)
  }

  return modifier(num, inv)
}

/**
 * Make the regulars expressions using the `formatObj` data.
 * @param {objec} formatObj Object with the format data
 * @return {object} 
 *    - {RegExp} _regex: Regular expression necessary for parse the number.
 *    - {function} _replaceThousands: Function for replace the thousands number.
 */
const makeFormatRegex = (formatObj)  => {
  let regex = ''

  const pkeys = formatObj.prefix ? Object.keys(formatObj._prefixes).map(p => escapeRegEx(p)) : []
  regex = `(${pkeys.join('|')})?`

  regex = formatObj.sign ? `${regex}(\\+|-)?` : `${regex}()`

  if (formatObj.integer) {
    if (!formatObj.thousands) {
      regex = `${regex}([0-9]+)`
    } else {
      regex = `${regex}([1-9][0-9]{0,2}(?:\\${formatObj.thousands}[0-9]{3,3})*)`
    }
  } else {
    regex = regex + '()'
  }

  if(formatObj.decimal) {
    regex = `${regex}(?:\\${formatObj.decimal}([0-9]+))?`
  }

  const skeys = formatObj.suffix ? Object.keys(formatObj._suffixes).map(s => escapeRegEx(s)) : []
  regex = `${regex}(${skeys.join('|')})?`

  return {
    _regex: new RegExp(`^${regex}$`),
    _replaceThousands: int => parseInt(
      formatObj.thousands ? int.replace(new RegExp(`\\${formatObj.thousands}`, 'g'), '') : int
    )
  }
}

/**
 * Parse the `number` string in a number using the `format` data.
 * @param {string} number number will be parsed
 * @param {object} format Format data
 * @return {int} number parsed.
 */
const parseNumber = (number, format) => {
  const r = format._regex.exec(number)

  if (r === null) {
    return false
  }

  //eslint-disable-next-line no-unused-vars
  const [ _, prefix, sign, integer, decimal, suffix ] = r
  let num = 0

  if (integer) {
    num = format._replaceThousands(integer)
  }

  if (decimal) {
    num += parseFloat(`0.${decimal}`)
  }

  if (sign === '-') {
    num *= -1
  }

  if (prefix && format.prefix) {
    num = parseModifiers(num, format._prefixes[prefix], false)
  }

  if (suffix && format.suffix) {
    num = parseModifiers(num, format._suffixes[suffix], false)
  }

  return round(num, format.decimalNumbers)
}


/**
 * Transform a number in a number string formatted.
 * @param {int} num number will transform in a string
 * @param {object} format Format data
 * @param {string} prefix prefix will add to the string
 * @param {string} suffix suffix will add to the string.
 * @return {string} number formatted
 */
const stringify = (num, format, prefix = null, suffix = null) => {
  if (prefix && format.prefix) {
    const p = format._prefixes[prefix]
    if (!p) {
      throw new Error(`${prefix} prefix not found`)
    }

    num = parseModifiers(num, p, true)
  }

  if (suffix && format.suffix) {
    const s = format._suffixes[suffix]

    if (!s) {
      throw new Error(`${suffix} suffix not found`)
    }

    num = parseModifiers(num, s, true)
  }

  num = round(num, format.decimalNumbers)
  const [int, dec] = `${num}`.split(/\./)
  let strNum = ''

  if(num < 0 && format.sign === false) {
    return false
  }

  // integer part and no integer format
  if (!format.integer && int !== '0') {
    return false
  }

  // transform integer part
  if (format.integer) {
    strNum = int.split('').reverse().join('').match(/[0-9]{1,3}/g)
      .join(format.thousands).split('').reverse().join('')
  }

  // decimal part
  if (format.decimalNumbers > 0) {
    if (!format.decimalOptional) {
      const dln = (dec || '').length
      const zeros = dln < format.decimalNumbers
        ? '0'.repeat(format.decimalNumbers - dln)
        : ''
      
      strNum = `${strNum}${format.decimal}${dec || ''}${zeros}`
    } else if (parseInt(dec || '0') !== 0) {
      strNum = `${strNum}${format.decimal}${dec}`
    }
  }

  if (format.sign) {
    strNum = (num < 0 ? '-' : (!format.signOptional ? '+' : '')) + strNum
  }

  if (prefix && format.prefix) {
    strNum = prefix + strNum
  }

  if (suffix && format.suffix) {
    strNum = strNum + suffix
  }
  
  return strNum
}


/**
 * @param {string|array} formats Formats it will use for parse and stringify the numbers
 * @param {object} prefixes Object with the prefix and his values
 * @param {object} suffixes Object with the suffix and his values
 */
const MyNumbers = (formats, prefixes = {}, suffixes = {}) => {
  const multi = Array.isArray(formats)
  formats = multi ? formats : [formats]

  const myNumber = {}
  myNumber._fdata = {}

  formats.forEach(formatStr => {
    let format = parseFormatStr(formatStr)

    // invalid format
    if (!format) {
      throw new Error(`The format '${formatStr}' is invalid.`)
    }

    format._prefixes = prefixes || {}
    format._suffixes = suffixes || {}
    format = { ...format, ...makeFormatRegex(format) }
    myNumber._fdata[formatStr] = format
  })

  myNumber.parse = (number) => {
    const r = {} 

    Object.keys(myNumber._fdata).forEach(formatStr => {
      r[formatStr] = parseNumber(number, myNumber._fdata[formatStr])
    })
    return multi ? r : r[formats[0]]
  }

  myNumber.stringify = (number, prefix = null, suffix = null) => {
    const r = {}

    Object.keys(myNumber._fdata).forEach(formatStr => {
      r[formatStr] = stringify(number, myNumber._fdata[formatStr], prefix, suffix)
    })

    return multi ? r : r[formats[0]]

  }

  return myNumber 
}

export default MyNumbers
