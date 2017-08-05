/**
 * @Author David Casado Martínez @davidnotplay
 */
import expect from 'expect'
import MyNumbers from '../src/my-numbers'

describe('Test format object', () => {
  describe('format', () => {
    it ('1.0', () => {
      const format = MyNumbers('1.0')._fdata['1.0']
      expect(format).toBeA('object')
      expect(format.prefix).toBe(false)
      expect(format.sign).toBe(false)
      expect(format.integer).toBe(true)
      expect(format.thousands).toBe(false)
      expect(format.decimal).toBe('.')
      expect(format.decimalNumbers).toBe(1)
      expect(format.suffix).toBe(false)
      expect(format.signOptional).toBe(false)
      expect(format.decimalOptional).toBe(false)
    })

    it ('1 format', () => {
      const format = MyNumbers('1')._fdata['1']
      expect(format).toBeA('object')
      expect(format.prefix).toBe(false)
      expect(format.sign).toBe(false)
      expect(format.integer).toBe(true)
      expect(format.thousands).toBe(false)
      expect(format.decimal).toBe(false)
      expect(format.decimalNumbers).toBe(0)
      expect(format.suffix).toBe(false)
      expect(format.signOptional).toBe(false)
      expect(format.decimalOptional).toBe(false)
    })

    it('1.1,00', () => {
      const format = MyNumbers('1.1,00')._fdata['1.1,00']
      expect(format).toBeA('object')
      expect(format.prefix).toBe(false)
      expect(format.sign).toBe(false)
      expect(format.integer).toBe(true)
      expect(format.thousands).toBe('.')
      expect(format.decimal).toBe(',')
      expect(format.decimalNumbers).toBe(2)
      expect(format.suffix).toBe(false)
      expect(format.signOptional).toBe(false)
      expect(format.decimalOptional).toBe(false)
    })

    it('+1.1 00', () => {
      const format = MyNumbers('+1.1 00')._fdata['+1.1 00']
      expect(format).toBeA('object')
      expect(format.prefix).toBe(false)
      expect(format.sign).toBe(true)
      expect(format.integer).toBe(true)
      expect(format.thousands).toBe('.')
      expect(format.decimal).toBe(' ')
      expect(format.decimalNumbers).toBe(2)
      expect(format.suffix).toBe(false)
      expect(format.signOptional).toBe(false)
      expect(format.decimalOptional).toBe(false)
    })

    it('#+1.1 00#', () => {
      const format = MyNumbers('#+1.1 00#')._fdata['#+1.1 00#']
      expect(format).toBeA('object')
      expect(format.prefix).toBe(true)
      expect(format.sign).toBe(true)
      expect(format.integer).toBe(true)
      expect(format.thousands).toBe('.')
      expect(format.decimal).toBe(' ')
      expect(format.decimalNumbers).toBe(2)
      expect(format.suffix).toBe(true)
      expect(format.signOptional).toBe(false)
      expect(format.decimalOptional).toBe(false)
    })

    it('#+1', () => {
      const format = MyNumbers('#+1')._fdata['#+1']
      expect(format).toBeA('object')
      expect(format.prefix).toBe(true)
      expect(format.sign).toBe(true)
      expect(format.integer).toBe(true)
      expect(format.thousands).toBe(false)
      expect(format.decimal).toBe(false)
      expect(format.decimalNumbers).toBe(0)
      expect(format.suffix).toBe(false)
      expect(format.signOptional).toBe(false)
      expect(format.decimalOptional).toBe(false)
    })

    it('.0#', () => {
      const format = MyNumbers('.0#')._fdata['.0#']
      expect(format).toBeA('object')
      expect(format.prefix).toBe(false)
      expect(format.sign).toBe(false)
      expect(format.integer).toBe(false)
      expect(format.thousands).toBe(false)
      expect(format.decimal).toBe('.')
      expect(format.decimalNumbers).toBe(1)
      expect(format.suffix).toBe(true)
      expect(format.signOptional).toBe(false)
      expect(format.decimalOptional).toBe(false)
    })

    it('+,00', () => {
      const format = MyNumbers('+,00')._fdata['+,00']
      expect(format).toBeA('object')
      expect(format.prefix).toBe(false)
      expect(format.sign).toBe(true)
      expect(format.integer).toBe(false)
      expect(format.thousands).toBe(false)
      expect(format.decimal).toBe(',')
      expect(format.decimalNumbers).toBe(2)
      expect(format.suffix).toBe(false)
      expect(format.signOptional).toBe(false)
      expect(format.decimalOptional).toBe(false)
    })

    it('+?1.0', () => {
      const format = MyNumbers('+?1.0')._fdata['+?1.0']
      expect(format).toBeA('object')
      expect(format.prefix).toBe(false)
      expect(format.sign).toBe(true)
      expect(format.integer).toBe(true)
      expect(format.thousands).toBe(false)
      expect(format.decimal).toBe('.')
      expect(format.decimalNumbers).toBe(1)
      expect(format.suffix).toBe(false)
      expect(format.signOptional).toBe(true)
      expect(format.decimalOptional).toBe(false)
    })

    it('+?.00', () => {
      const format = MyNumbers('+?.00')._fdata['+?.00']
      expect(format).toBeA('object')
      expect(format.prefix).toBe(false)
      expect(format.sign).toBe(true)
      expect(format.integer).toBe(false)
      expect(format.thousands).toBe(false)
      expect(format.decimal).toBe('.')
      expect(format.decimalNumbers).toBe(2)
      expect(format.suffix).toBe(false)
      expect(format.signOptional).toBe(true)
      expect(format.decimalOptional).toBe(false)
    })

    it('#+?1,1.00', () => {
      const format = MyNumbers('#+?1,1.00')._fdata['#+?1,1.00']
      expect(format).toBeA('object')
      expect(format.prefix).toBe(true)
      expect(format.sign).toBe(true)
      expect(format.integer).toBe(true)
      expect(format.thousands).toBe(',')
      expect(format.decimal).toBe('.')
      expect(format.decimalNumbers).toBe(2)
      expect(format.suffix).toBe(false)
      expect(format.signOptional).toBe(true)
      expect(format.decimalOptional).toBe(false)
    })
    it('#1,1.00?', () => {
      const format = MyNumbers('#1,1.00?')._fdata['#1,1.00?']
      expect(format).toBeA('object')
      expect(format.prefix).toBe(true)
      expect(format.sign).toBe(false)
      expect(format.integer).toBe(true)
      expect(format.thousands).toBe(',')
      expect(format.decimal).toBe('.')
      expect(format.decimalNumbers).toBe(2)
      expect(format.suffix).toBe(false)
      expect(format.signOptional).toBe(false)
      expect(format.decimalOptional).toBe(true)
    })

    it('#+?1,1.00?', () => {
      const format = MyNumbers('#+?1,1.00?')._fdata['#+?1,1.00?']
      expect(format).toBeA('object')
      expect(format.prefix).toBe(true)
      expect(format.sign).toBe(true)
      expect(format.integer).toBe(true)
      expect(format.thousands).toBe(',')
      expect(format.decimal).toBe('.')
      expect(format.decimalNumbers).toBe(2)
      expect(format.suffix).toBe(false)
      expect(format.signOptional).toBe(true)
      expect(format.decimalOptional).toBe(true)
    })


    it('#+?1,1.00?', () => {
      const format = MyNumbers('#+?1,1.00?')._fdata['#+?1,1.00?']
      expect(format).toBeA('object')
      expect(format.prefix).toBe(true)
      expect(format.sign).toBe(true)
      expect(format.integer).toBe(true)
      expect(format.thousands).toBe(',')
      expect(format.decimal).toBe('.')
      expect(format.decimalNumbers).toBe(2)
      expect(format.suffix).toBe(false)
      expect(format.signOptional).toBe(true)
      expect(format.decimalOptional).toBe(true)
    })
  })

  describe('ivalid format', () => {
    it('Exception', () => {
      try {
        MyNumbers('invalid')
      } catch(err) {
        expect(err.message).toBe('The format \'invalid\' is invalid.')
      }
    }) 

    it('1.1.1', () => {
      let r = null 
      try {
        MyNumbers('1.1.1')
        r = false
      } catch(err) {
        r = true
      }
      expect(r).toBe(true)
    }) 

    it('1.11,0', () => {
      let r = null 
      try {
        MyNumbers('1.11,0')
        r = false
      } catch(err) {
        r = true
      }
      expect(r).toBe(true)
    }) 

    it('-1.1,0', () => {
      let r = null 
      try {
        MyNumbers('-1.1,0')
        r = false
      } catch(err) {
        r = true
      }
      expect(r).toBe(true)
    }) 

    it('?1.1,0', () => {
      let r = null 
      try {
        MyNumbers('?1.1,0')
        r = false
      } catch(err) {
        r = true
      }
      expect(r).toBe(true)
    }) 

    it('##', () => {
      let r = null 
      try {
        MyNumbers('##')
        r = false
      } catch(err) {
        r = true
      }
      expect(r).toBe(true)
    }) 

    it('#', () => {
      let r = null 
      try {
        MyNumbers('#')
        r = false
      } catch(err) {
        r = true
      }
      expect(r).toBe(true)
    }) 

    it('#+#', () => {
      let r = null 
      try {
        MyNumbers('#+#')
        r = false
      } catch(err) {
        r = true
      }
      expect(r).toBe(true)
    }) 

    it('+', () => {
      let r = null 
      try {
        MyNumbers('+')
        r = false
      } catch(err) {
        r = true
      }
      expect(r).toBe(true)
    }) 

    it('+?', () => {
      let r = null 
      try {
        MyNumbers('+?')
        r = false
      } catch(err) {
        r = true
      }
      expect(r).toBe(true)
    }) 

    it('#+?', () => {
      let r = null 
      try {
        MyNumbers('#+?')
        r = false
      } catch(err) {
        r = true
      }
      expect(r).toBe(true)
    }) 
  })
})


describe('Parse function', () => {

  describe('single and multi parser', () => {
    it('single', () => {
      const mn = MyNumbers('1.0')
      const r = mn.parse('332.1')
      expect(r).toEqual(332.1)
    })

    it('multiple', () => {
      const mn = MyNumbers(['1.0', '1,1_0'])
      const r = mn.parse('332.1')
      expect(r).toBeA('object')
      expect(r['1.0']).toBe(332.1)
      expect(r['1,1_0']).toBe(false)
    })
  })


  describe('formats', () => {
    it('1', () => {
      const mn = MyNumbers('1')
      expect(mn.parse('32')).toBe(32)
      expect(mn.parse('125')).toBe(125)
      expect(mn.parse('+125')).toBe(false)
      expect(mn.parse('-300')).toBe(false)
      expect(mn.parse('3.213')).toBe(false)
      expect(mn.parse('3.223,123')).toBe(false)
      expect(mn.parse('323k')).toBe(false)
    })
    it('1.0', () => {
      const mn = MyNumbers('1.0')
      expect(mn.parse('32')).toBe(32)
      expect(mn.parse('125')).toBe(125)
      expect(mn.parse('+125')).toBe(false)
      expect(mn.parse('-300')).toBe(false)
      expect(mn.parse('3.213')).toBe(3.2)
      expect(mn.parse('3.283')).toBe(3.3)
      expect(mn.parse('3.223,123')).toBe(false)
      expect(mn.parse('323k')).toBe(false)
    })

    it('1.00', () => {
      const mn = MyNumbers('1.00')
      expect(mn.parse('32')).toBe(32)
      expect(mn.parse('125')).toBe(125)
      expect(mn.parse('+125')).toBe(false)
      expect(mn.parse('-300')).toBe(false)
      expect(mn.parse('3.213')).toBe(3.21)
      expect(mn.parse('3.288')).toBe(3.29)
      expect(mn.parse('3.223,123')).toBe(false)
      expect(mn.parse('323k')).toBe(false)
    })

    it('1,1.00', () => {
      const mn = MyNumbers('1,1.00')
      expect(mn.parse('32')).toBe(32)
      expect(mn.parse('125')).toBe(125)
      expect(mn.parse('+125')).toBe(false)
      expect(mn.parse('-300')).toBe(false)
      expect(mn.parse('3.213')).toBe(3.21)
      expect(mn.parse('3.288')).toBe(3.29)
      expect(mn.parse('3.223,123')).toBe(false)
      expect(mn.parse('323k')).toBe(false)
      expect(mn.parse('1,891.233')).toBe(1891.23)
    })

    it('.00', () => {
      const mn = MyNumbers('.00')
      expect(mn.parse('32')).toBe(false)
      expect(mn.parse('125')).toBe(false)
      expect(mn.parse('+125')).toBe(false)
      expect(mn.parse('-300')).toBe(false)
      expect(mn.parse('3.213')).toBe(false)
      expect(mn.parse('3.288')).toBe(false)
      expect(mn.parse('3.223,123')).toBe(false)
      expect(mn.parse('323k')).toBe(false)
      expect(mn.parse('1,891.233')).toBe(false)
      expect(mn.parse('.323')).toBe(0.32)
      expect(mn.parse('.328')).toBe(0.33)
    })

    it('+1', () => {
      const mn = MyNumbers('+1')
      expect(mn.parse('32')).toBe(32)
      expect(mn.parse('125')).toBe(125)
      expect(mn.parse('+125')).toBe(125)
      expect(mn.parse('-300')).toBe(-300)
      expect(mn.parse('3.213')).toBe(false)
      expect(mn.parse('3.288')).toBe(false)
      expect(mn.parse('3.223,123')).toBe(false)
      expect(mn.parse('323k')).toBe(false)
      expect(mn.parse('1,891.233')).toBe(false)
      expect(mn.parse('.323')).toBe(false)
      expect(mn.parse('.328')).toBe(false)
    })
    it('+1,0', () => {
      const mn = MyNumbers('+1,0')
      expect(mn.parse('32')).toBe(32)
      expect(mn.parse('125')).toBe(125)
      expect(mn.parse('+125')).toBe(125)
      expect(mn.parse('-300')).toBe(-300)
      expect(mn.parse('3.213')).toBe(false)
      expect(mn.parse('3.288')).toBe(false)
      expect(mn.parse('3.223,123')).toBe(false)
      expect(mn.parse('7232,33')).toBe(7232.3)
      expect(mn.parse('1,891.233')).toBe(false)
      expect(mn.parse('.323')).toBe(false)
      expect(mn.parse('.328')).toBe(false)
    })

    it('+1,1 00', () => {
      const mn = MyNumbers('+1,1 00')
      expect(mn.parse('32')).toBe(32)
      expect(mn.parse('125')).toBe(125)
      expect(mn.parse('+125')).toBe(125)
      expect(mn.parse('-300')).toBe(-300)
      expect(mn.parse('3.213')).toBe(false)
      expect(mn.parse('3.288')).toBe(false)
      expect(mn.parse('3.223,123')).toBe(false)
      expect(mn.parse('7232,33')).toBe(false)
      expect(mn.parse('72,323')).toBe(72323)
      expect(mn.parse('1,891 233')).toBe(1891.23)
      expect(mn.parse('.323')).toBe(false)
      expect(mn.parse('.328')).toBe(false)
      expect(mn.parse('-1,323,323 223')).toBe(-1323323.22)
      expect(mn.parse('1,323,3231 223')).toBe(false)
    })

    it('+?1,1 00', () => {
      const mn = MyNumbers('+?1,1 00')
      expect(mn.parse('32')).toBe(32)
      expect(mn.parse('125')).toBe(125)
      expect(mn.parse('+125')).toBe(125)
      expect(mn.parse('-300')).toBe(-300)
      expect(mn.parse('3.213')).toBe(false)
      expect(mn.parse('3.288')).toBe(false)
      expect(mn.parse('3.223,123')).toBe(false)
      expect(mn.parse('7232,33')).toBe(false)
      expect(mn.parse('72,323')).toBe(72323)
      expect(mn.parse('1,891 233')).toBe(1891.23)
      expect(mn.parse('.323')).toBe(false)
      expect(mn.parse('.328')).toBe(false)
      expect(mn.parse('-1,323,323 223')).toBe(-1323323.22)
      expect(mn.parse('1,323,3231 223')).toBe(false)
    })

    it('+1.00#', () => {
      const mn = MyNumbers('+1.00#', null, { k: 1000 })
      expect(mn.parse('32k')).toBe(32000)
      expect(mn.parse('32.32k')).toBe(32320)
      expect(mn.parse('32.3289k')).toBe(32328.9)
      expect(mn.parse('32.328938k')).toBe(32328.94)
      expect(mn.parse('32.328938j')).toBe(false)
      expect(mn.parse('k32.328938')).toBe(false)
    })

    it('#+1.00', () => {
      const mn = MyNumbers('#+1.00', { k: 1000 }, null)
      expect(mn.parse('k32')).toBe(32000)
      expect(mn.parse('k32.32')).toBe(32320)
      expect(mn.parse('k32.3289')).toBe(32328.9)
      expect(mn.parse('k32.328938')).toBe(32328.94)
      expect(mn.parse('j32.328938')).toBe(false)
      expect(mn.parse('32.328938k')).toBe(false)
    })


    it('#+1.00#. Test prefix and suffix functions', () => {
      const mn = MyNumbers('#+1.00#', { k: (num) => 1000*num  }, { k: num => num*1/1000 })
      expect(mn.parse('k32')).toBe(32000)
      expect(mn.parse('32k')).toBe(0.03)
      expect(mn.parse('k32.32k')).toBe(32.32)
      expect(mn.parse('k32.3289k')).toBe(32.33)
      expect(mn.parse('j32.328938k')).toBe(false)
      expect(mn.parse('k32.328938j')).toBe(false)
    })

    describe('multi', () => {
      it('1.1,00 1,1.00', () => {
        const nm = MyNumbers(['1.1,00', '1,1.00'])
        const r = nm.parse('3.323')
        expect(r).toEqual({ '1.1,00': 3323, '1,1.00': 3.32 })

        const r2 = nm.parse('8.88')
        expect(r2).toEqual({ '1.1,00': false, '1,1.00': 8.88 })

        const r3 = nm.parse('8,88')
        expect(r3).toEqual({ '1.1,00': 8.88, '1,1.00': false })
      })
    })
  })
})

describe('stringify function', () => {
  describe('formats', () => {
    it('1', () => {
      const nm = MyNumbers('1')
      expect(nm.stringify(1)).toBe('1')
      expect(nm.stringify(12)).toBe('12')
      expect(nm.stringify(-12)).toBe(false)
      expect(nm.stringify(12.32)).toBe('12')
    })

    it('1,0', () => {
      const nm = MyNumbers('1,0')
      expect(nm.stringify(1)).toBe('1,0')
      expect(nm.stringify(12)).toBe('12,0')
      expect(nm.stringify(-12)).toBe(false)
      expect(nm.stringify(12.32)).toBe('12,3')
      expect(nm.stringify(12.39)).toBe('12,4')
    })

    it('1,1.00', () => {
      const nm = MyNumbers('1,1.00')
      expect(nm.stringify(1)).toBe('1.00')
      expect(nm.stringify(12)).toBe('12.00')
      expect(nm.stringify(-12)).toBe(false)
      expect(nm.stringify(12.32)).toBe('12.32')
      expect(nm.stringify(12.39)).toBe('12.39')
      expect(nm.stringify(1213.389)).toBe('1,213.39')
    })
    it('+1,1.00', () => {
      const nm = MyNumbers('+1,1.00')
      expect(nm.stringify(1)).toBe('+1.00')
      expect(nm.stringify(5.3)).toBe('+5.30')
      expect(nm.stringify(12)).toBe('+12.00')
      expect(nm.stringify(-12)).toBe('-12.00')
      expect(nm.stringify(12.32)).toBe('+12.32')
      expect(nm.stringify(12.39)).toBe('+12.39')
      expect(nm.stringify(1213.389)).toBe('+1,213.39')
    })

    it('+?1,1.00', () => {
      const nm = MyNumbers('+?1,1.00')
      expect(nm.stringify(1)).toBe('1.00')
      expect(nm.stringify(5.8)).toBe('5.80')
      expect(nm.stringify(12)).toBe('12.00')
      expect(nm.stringify(-12)).toBe('-12.00')
      expect(nm.stringify(12.32)).toBe('12.32')
      expect(nm.stringify(12.39)).toBe('12.39')
      expect(nm.stringify(1213.389)).toBe('1,213.39')
    })

    it('1,1.000?', () => {
      const nm = MyNumbers('1,1.000?')
      expect(nm.stringify(333)).toBe('333') 
      expect(nm.stringify(32.3)).toBe('32.3') 
      expect(nm.stringify(32.3329)).toBe('32.333') 
    })

    it('.000', () => {
      const nm = MyNumbers('.000')
      expect(nm.stringify(333)).toBe(false) 
      expect(nm.stringify(32.3)).toBe(false) 
      expect(nm.stringify(32.3329)).toBe(false) 
      expect(nm.stringify(0.332)).toBe('.332')
      expect(nm.stringify(0.332)).toBe('.332')
      expect(nm.stringify(0.8898)).toBe('.890')
    })
  })

  describe('Modifiers', () => {
    it('1.00#', () => {
      const nm = MyNumbers('1.00#', null, { k: 1000 })
      expect(nm.stringify(3232, null, 'k')).toBe('3.23k')
      expect(nm.stringify(32, null, 'k')).toBe('0.03k')
      expect(nm.stringify(3000, null, 'k')).toBe('3.00k')

      let r = false
      try {
        expect(nm.stringify(3322, null, 'j'))
      }catch(err) {
        expect(err.message).toBe('j suffix not found')
        r = true
      }
      expect(r).toBe(true)
    })
    it('#1.00?#', () => {
      const nm = MyNumbers('#1.00?#', {j: 1/1000 }, { k: 1000 })
      expect(nm.stringify(3232, null, 'k')).toBe('3.23k')
      expect(nm.stringify(32, null, 'k')).toBe('0.03k')
      expect(nm.stringify(3000, null, 'k')).toBe('3k')
      expect(nm.stringify(30, 'j', 'k')).toBe('j30k')

      let r = false
      try {
        expect(nm.stringify(3322, null, 'j'))
      }catch(err) {
        expect(err.message).toBe('j suffix not found')
        r = true
      }
      expect(r).toBe(true)
    })
  })

  describe('Multi', () => {
    it('1.1,00 +1,1.00?', () => {
      const mn = MyNumbers(['1.1,00', '+1,1.00?']) 
      const r = mn.stringify(3323.2)
      expect(r).toEqual({ '1.1,00': '3.323,20', '+1,1.00?': '+3,323.2' })
      const r1 = mn.stringify(-3323.2)
      expect(r1).toEqual({ '1.1,00': false, '+1,1.00?': '-3,323.2' })
    })
  })
})

describe('Modifiers', () => {
  it ('no modifiers', () => {
    const mn = MyNumbers('1.0', { a: 10 } , { b: 10 })
    expect(mn.parse('a32b')).toBe(false)
    expect(mn.parse('a32')).toBe(false)
    expect(mn.parse('32b')).toBe(false)

    expect(mn.stringify('32', 'a', 'b')).toBe('32.0')
    expect(mn.stringify('32', null, 'b')).toBe('32.0')
    expect(mn.stringify('32', 'a', null)).toBe('32.0')
  })
  it('Modifiers functions', () => {
    const pr = (num, inv) => !inv ? num * 1.5 : num * 2
    const su = (num, inv) => !inv ? num * 1 : num * 0.5
    const r = MyNumbers('#1,00#', { pr }, { su })

    expect(r.parse('3su')).toBe(3)
    expect(r.parse('pr3su')).toBe(4.5)
    expect(r.stringify(4, 'pr', null)).toBe('pr8,00')
    expect(r.stringify(4, 'pr', 'su')).toBe('pr4,00su')
  })

  it('Modifiers with special chars', () => {
    const pr = (num, inv) => !inv ? num * 1.5 : num * 2
    const su = (num, inv) => !inv ? num * 1 : num * 0.5
    const r = MyNumbers('#1,00#', { 'pr.': pr }, { '.su': su })

    expect(r.parse('3.su')).toBe(3)
    expect(r.stringify(3, 'pr.')).toBe('pr.6,00')
  })
})