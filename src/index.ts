const TWELVE_HOURS_REGEX = /^(1[0-2]|0?[1-9]):([0-5][0-9])\s?([AaPp][Mm])$/
const TWENTY_FOUR_HOURS_REGEX = /^([0-9]|0[0-9]|1[0-9]|2[0-3]):([0-5][0-9])$/

function createParser({
  regex,
  errorMessageFormat,
}: {
  regex: RegExp
  errorMessageFormat: string
}) {
  return (str: string) => {
    const matchObject = regex.exec(str)

    if (matchObject == null) {
      if ('development' === process.env.NODE_ENV) {
        console.error(
          `Invalid format, please check the format that you passed. Example: ${errorMessageFormat}`,
        )
      }

      return {
        hour: null,
        minutes: null,
        hasLeadingZero: false,
        isAm: false,
      }
    }

    const [, parsedHour, parsedMinutes = '00', amOrPm] = matchObject
    const hasLeadingZero =
      typeof parsedHour === 'string' && parsedHour[0] === '0'

    const hour = parseInt(parsedHour, 10)

    return {
      hour,
      minutes: parsedMinutes,
      hasLeadingZero,
      isAm: amOrPm === 'am' || amOrPm === 'AM' || hour < 12,
    }
  }
}

const twentyFourHoursParser = createParser({
  regex: TWENTY_FOUR_HOURS_REGEX,
  errorMessageFormat: '22:34',
})

const twelveHoursParser = createParser({
  regex: TWELVE_HOURS_REGEX,
  errorMessageFormat: '11:54 am',
})

function withOrWithoutLeadingZero({
  hour,
  hasLeadingZero,
}: {
  hour: number
  hasLeadingZero: boolean
}) {
  return hour < 10 && hasLeadingZero ? `0${hour}` : hour
}

export function to24Hours(str: string) {
  const {hour, minutes, hasLeadingZero, isAm} = twelveHoursParser(str)

  if (hour == null || minutes == null) return ''

  const isMidNight = hour === 12 && isAm
  const twentyFourHour = isMidNight ? 0 : 12 + (hour % 12)

  return `${withOrWithoutLeadingZero({
    hour: twentyFourHour,
    hasLeadingZero: isMidNight || hasLeadingZero,
  })}:${minutes}`
}

export function to12Hours(str: string) {
  const {hour, minutes, hasLeadingZero, isAm} = twentyFourHoursParser(str)

  if (hour == null || minutes == null) return ''

  const amPmHour = hour === 0 ? 12 : hour <= 12 ? hour : hour % 12

  return `${withOrWithoutLeadingZero({
    hour: amPmHour,
    hasLeadingZero,
  })}:${minutes}${isAm ? ' AM' : ' PM'}`
}
