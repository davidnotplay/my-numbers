My Numbers
==========
Parse and *stringify* numbers using the format that you want.

Install
------------
```
$ npm --save install my-numbers
```

or you can use externally
```html
<script src="dist/my-numbers.js">
```

Usage
-----

```js
import MyNumbers from 'MyNumbers'

// use the 1.1,00 format
const mnumbers = MyNumbers('1.1,00')

mnumbers.parse('1.323,32') // 1323.32
mnumbers.stringify(1323.32) // '1.323,32'
```

### Formats

Complete format: 
```
#+?1,1.0000?#
```

#### Format examples:
`1`

Only integer numbers

| parse | stringify |
| ----- | --------- |
| `'33' => 33` | `123 => '123'` |
| `'33.32' => false` | `123.3 => false` |


`1,0`

Parse decimals, using the `,` as decimal character, and one round in one decimal.

| parse | stringify |
| ----- | --------- |
| `'33' => 33` | `123 => '123,0'` |
| `'33,39' => 33.4` | `123.38 => '123,4'` |
| `'33.39' => false` ( the decimal characters isn't `,` ) | `0.73 => '0,7'` |

`1_000`

Now the decimal characters is `_` and the number of decimal is 3. 
| parse | stringify |
| ----- | --------- |
| `'33' => 33` | `123 => '123_000'` |
| `'33_32' => 33.32` | `123.3 => '123_300'` |
| `'33_3248' => 33.325` | `8.34328 => '8_343'` |


`1,000?`

Decimal character is `,`. 3 decimals, and the character `?` indicate the 3 decimals are optionals in the `stringify` function.

| parse | stringify |
| ----- | --------- |
| `'33' => 33` | `123 => '123'` |
| `'33,32' => 33.32` | `123.3 => '123,3'` |
| `'33,3248' => 33.325` | `8.34328 => '8,343'` |


`1.1,00`
The integer part has as thousands separator the character `.` .
And the decimal separator is `,`.

| parse | stringify |
| ----- | --------- |
| `'88' => 88` | `328 => '328,3'` |
| `'1.732,23' => 1732.23` | `10839 => '10.839,00'` |
| `'33.324.883,23' => 33324883.23` | `834328.323 => '834.328,32'` |
|`'333.32,33'` => false (incorrect format number) ||

`+1_1'00`

Now you can add the `+` and the `-` sign in the numbers, and the numbers string always have that symbols. The thousands separator is `_`
and the decimal separator is `'`
| parse | stringify |
| ----- | --------- |
| `'88' => 88` | `328 => '+328,3'` |
| `"-1_732'23" => -1732.23` | `-10839 => "-10_839'00"` |
| `"33_324_883'23" => 33324883.23` | `834328.323 => "+834_328'32"` |
|`"333_32'33"` => false (incorrect format number) ||

`+?1 00`

Parse numbers with sign and the `+` and `-` symbols are optional in the `stringify` function. And the decimal separator is `<space>`
| parse | stringify |
| ----- | --------- |
| '99 32' => 99.32 | 132.489 => '132 49'|
| '-99 32' => -99.32 | -132.489 => '-132 49'|

`,000`

Only decimals. The decimal separator is `,`


| parse | stringify |
| ----- | --------- |
| ',323' => 0.323 | 0.442 => ',442' |
| '3,323' => false (number has integer part) | 0.8 => ',800'

> This only are some examples of formats. You can combine the before formats for makes others.


### MyNumber Object

`MyNumbers(string|array format[, object prefixes[, object suffixes ] ])`
- See the [formats](#formats) section for more info about `format` parameter.
- See the [prefixes and suffixes](#prefixes-and-suffixes) section for more info about `prefixes` and suffixes` parameters 

### Parse function

`MyNumbers(...).parse(float|int number)`

This function transform a string number in a number depending of the format. If the string number no match with the format then return false.

```js
// example
const mn = MyNumbers('1.1,000')

mn.parse('3.323') // 3233
mn.parse('4.323.323,1') // 4323323.1
mn.parse('4_323_323,1') // false
mn.parse('4.33,1') // false
```

#### Multiparse
You can add two or more format. Parse returns an object with the formats and his results.

```js
// example
const mn = MyNumbers(['1.1,000', '1,1.000'])

mn.parse('3.323') // { '1.1,000': 3323, '1,1.000': 3.323}
mn.parse('3.32') // { '1.1,000': false, '1,1.000': 3.320}
```


### Stringify function
Transform a number in a string number depending of the format. If the number isn't compatible with the format the return false.

`MyNumbers(...).stringify(float|int number[, string prefix[, string suffix]])`

```js
// example
const mn = MyNumbers('1_1 000')

mn.s(3323) // '3_233 000'
mn.parse(888323.3) // '888_323 300'
mn.parse(-1) // false. The format not admit negative number.
```

### multiformat
You can add two or more format. Stringify function returns an object with the formats and his results.

```js
// example
const mn = MyNumbers(['1_1 000', '+?1,000?'])

mn.s(3323) // {'1_1 000': '3_323 000' '+?1,000?': '3323'}
mn.parse(432.3) // {'1_1 000': '432 300', '+?1,000?': '432,3'} 
mn.parse(-1) // {'1_1 000': false, '+?1,000?': '-1'}
```

### Prefixes and suffixes

You can use prefixes and suffixes in the numbers. Firstly you must specify the prefixes and the suffixes in the number format.
```js

const format = '#1.1,00#' // The characters # indicate you can use prefix and suffix in the numbers.

// More format examples 
'#1.00' // number with prefix.
'1.1,000#' // number with suffix
'#1.0#' // number with prefix and suffix

// you make the prefixes and the suffixes that you want
const pr = {'a': 20, 'b': 30 }
const su = {'dm': 10, 'hm': 100, 'km': 1000}
// the key is the prefix/suffix and the value is the multiplier. the number will multiply with this value when parse and divide when stringify

const mn = MyNumbers(format, pr, su)
mn.parse('3dm') // 30
mn.parse('3,3244hm') // 332.44 
mn.parse('1.100km') // 1100000
mn.parse('a32') // 640
// can use prefix and suffix
mn.parse('a32dm') // 6400
```

#### Customize the prefixes and suffixes.
You can use functions for make suffixes and prefixes

```js
/*
  @param {int} num the number
  @param {boolean} False in the parse function, True in stringify function
  @return {int} Number modified.
*/
const kelvin = (num, inv) => !inv num + 273.15 : num - 273.15
const su = { K: kelvin }
const mn = MyNumbers('+1,00#', null, su)

mn.parse('100K') // 373.15
mn.stringify(10, null, 'K') // '-263,15K'
```

## LICENSE
The license is MIT. See `LICENSE` file to more info.