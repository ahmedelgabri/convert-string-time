import {describe, test} from 'bun:test'
import {expect} from 'bun:test'
import {to24Hours, to12Hours, parseTime, isValidTimeFormat} from './index.js'

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
    ['12:00', '12:00 PM'], // noon edge case
    ['12:30', '12:30 PM'], // noon with minutes
    ['00:30', '12:30 AM'], // midnight with minutes
    ['15:05', '3:05 PM'], // single-digit minutes padding
    ['08:05', '08:05 AM'], // single-digit minutes with leading zero hour
    ['', null],
    ['5:27 PM', null],
    ...BAD_INPUTS.map((i) => [i, null] as [unknown, null]),
  ])('convert %p to %p', (input, expected) => {
    const result = to12Hours(input as string)
    expect(result).toEqual(expected)
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
    ['12:00 PM', '12:00'], // noon edge case
    ['12:30 pm', '12:30'], // noon with minutes
    ['12:30 AM', '00:30'], // midnight with minutes
    ['3:05 PM', '15:05'], // single-digit minutes padding
    ['', null],
    ['17:27', null],
    ...BAD_INPUTS.map((i) => [i, null] as [unknown, null]),
  ])('convert %p to %p', (input, expected) => {
    const result = to24Hours(input as string)
    expect(result).toEqual(expected)
  })
})

describe("'parseTime' utility", () => {
  test('detects and converts 12-hour format', () => {
    const result = parseTime('11:00 PM')
    expect(result).toEqual({
      format: '12h',
      time12h: '11:00 PM',
      time24h: '23:00',
    })
  })

  test('detects and converts 24-hour format', () => {
    const result = parseTime('23:00')
    expect(result).toEqual({
      format: '24h',
      time12h: '11:00 PM',
      time24h: '23:00',
    })
  })

  test('handles noon correctly', () => {
    const result12h = parseTime('12:00 PM')
    expect(result12h).toEqual({
      format: '12h',
      time12h: '12:00 PM',
      time24h: '12:00',
    })

    const result24h = parseTime('12:00')
    expect(result24h).toEqual({
      format: '24h',
      time12h: '12:00 PM',
      time24h: '12:00',
    })
  })

  test('handles midnight correctly', () => {
    const result12h = parseTime('12:00 AM')
    expect(result12h).toEqual({
      format: '12h',
      time12h: '12:00 AM',
      time24h: '00:00',
    })

    const result24h = parseTime('00:00')
    expect(result24h).toEqual({
      format: '24h',
      time12h: '12:00 AM',
      time24h: '00:00',
    })
  })

  test('handles various 12-hour formats', () => {
    expect(parseTime('9:30 AM')).toEqual({
      format: '12h',
      time12h: '9:30 AM',
      time24h: '09:30',
    })

    expect(parseTime('5:45PM')).toEqual({
      format: '12h',
      time12h: '5:45PM',
      time24h: '17:45',
    })
  })

  test('handles various 24-hour formats', () => {
    expect(parseTime('09:30')).toEqual({
      format: '24h',
      time12h: '09:30 AM',
      time24h: '09:30',
    })

    expect(parseTime('17:45')).toEqual({
      format: '24h',
      time12h: '5:45 PM',
      time24h: '17:45',
    })
  })

  test('returns null for invalid formats', () => {
    expect(parseTime('invalid')).toEqual({
      format: null,
      time12h: null,
      time24h: null,
    })

    expect(parseTime('25:00')).toEqual({
      format: null,
      time12h: null,
      time24h: null,
    })

    expect(parseTime('')).toEqual({
      format: null,
      time12h: null,
      time24h: null,
    })
  })
})

describe("'isValidTimeFormat' utility", () => {
  test.each([
    ['23:00', true],
    ['00:00', true],
    ['12:30', true],
    ['09:15', true],
    ['11:00 PM', true],
    ['12:00 AM', true],
    ['9:30 am', true],
    ['5:45PM', true],
    ['1:05 Pm', true],
    ['25:00', false],
    ['24:00', false],
    ['13:00 PM', false],
    ['00:00 AM', false],
    ['invalid', false],
    ['', false],
    ['12:60', false],
    ['12:5', false],
  ])('validates %p as %p', (input, expected) => {
    expect(isValidTimeFormat(input)).toBe(expected)
  })
})
