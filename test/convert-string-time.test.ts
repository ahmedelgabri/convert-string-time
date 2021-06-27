import {to24Hours, to12Hours} from '../src'

const FALSY_VALUES = [null, undefined, '', 0, false, NaN]
const BAD_INPUTS = [...FALSY_VALUES, '55:2', '99:00', '00:0', '1:2am']

describe("'to12Hours' utility", () => {
  test.each([
    ['23:00', '11:00 PM'],
    ['00:00', '12:00 AM'],
    ['09:00', '09:00 AM'],
    ['17:27', '5:27 PM'],
    ['13:27', '1:27 PM'],
    ['1:27', '1:27 AM'],
    ['', null],
    ['5:27 PM', null],
    ...BAD_INPUTS.map(i => [i, null]),
  ])('convert %p to %p', (firstArg, expectedResult) => {
    const result = to12Hours(firstArg as string)
    expect(result).toEqual(expectedResult)
  })
})

describe("'to24Hours' utility", () => {
  test.each([
    ['11:00 PM', '23:00'],
    ['12:00am', '00:00'],
    ['09:00 am', '09:00'],
    ['5:27PM', '17:27'],
    ['1:27 aM', '01:27'],
    ['1:25 pm', '13:25'],
    ['', null],
    ['17:27', null],
    ...BAD_INPUTS.map(i => [i, null]),
  ])('convert %p to %p', (firstArg, expectedResult) => {
    const result = to24Hours(firstArg as string)
    expect(result).toEqual(expectedResult)
  })
})
