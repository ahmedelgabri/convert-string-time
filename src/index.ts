///////////////////////////////////////////////////////
// Parsing
//////////////////////////////////////////////////////

const TWELVE_HOURS_REGEX = /^(?<hour>(1[0-2]|0?[1-9])):(?<minutes>([0-5][0-9]))\s?(?<amOrPm>([AaPp][Mm]))$/
const TWENTY_FOUR_HOURS_REGEX = /^(?<hour>(([0-9]|0[0-9]|1[0-9]|2[0-3]))):(?<minutes>([0-5][0-9]))$/

function createParser({regex}: {regex: RegExp}) {
  return (str: string) => {
    const matchObject = regex.exec(str)

    if (matchObject == null) {
      return {
        hour: null,
        minutes: null,
        hasLeadingZero: false,
        isAm: false,
      }
    }

    const {
      groups: {hour: parsedHour, minutes: parsedMinutes, amOrPm} = {},
    } = matchObject
    const hasLeadingZero =
      typeof parsedHour === 'string' && parsedHour[0] === '0'

    const hour = parseInt(parsedHour, 10)
    const minutes = parseInt(parsedMinutes, 10)

    return {
      hour,
      minutes,
      hasLeadingZero,
      // if amOrPm is available then we have a 12hrs format so we can check
      // 'AM' otherwise we have a 24hrs format then all hours less than 12 are AM
      isAm: amOrPm != null ? amOrPm.toLowerCase() === 'am' : hour < 12,
    }
  }
}

///////////////////////////////////////////////////////
// Setup & utils
//////////////////////////////////////////////////////

const twentyFourHoursParser = createParser({
  regex: TWENTY_FOUR_HOURS_REGEX,
})

const twelveHoursParser = createParser({
  regex: TWELVE_HOURS_REGEX,
})

function formatHour({
  hour,
  hasLeadingZero,
}: {
  hour: number
  hasLeadingZero: boolean
}) {
  return hour < 10 && hasLeadingZero ? `0${hour}` : hour
}

function formatMinutes(minutes: number) {
  return minutes === 0 ? '00' : minutes
}

///////////////////////////////////////////////////////
// Exports
//////////////////////////////////////////////////////

export function isValidTimeFormat(str: string) {
  return TWELVE_HOURS_REGEX.test(str) || TWENTY_FOUR_HOURS_REGEX.test(str)
}

export function to24Hours(str: string) {
  const {hour, minutes, hasLeadingZero, isAm} = twelveHoursParser(str)

  if (hour == null || minutes == null) return null

  // if it's AM & we are converting from 12 then we return 0 (12:00 AM -> 00:00) (special case)
  // otherwise use the parsedHour
  // otherwise if PM then just do the default conversion
  const twentyFourHour = isAm ? (hour === 12 ? 0 : hour) : 12 + (hour % 12)

  return `${formatHour({
    hour: twentyFourHour,
    hasLeadingZero: isAm || hasLeadingZero,
  })}:${formatMinutes(minutes)}`
}

export function to12Hours(str: string) {
  const {hour, minutes, hasLeadingZero, isAm} = twentyFourHoursParser(str)

  if (hour == null || minutes == null) return null

  return `${formatHour({
    hour: hour === 0 ? 12 : hour % 12,
    hasLeadingZero,
  })}:${formatMinutes(minutes)}${isAm ? ' AM' : ' PM'}`
}
