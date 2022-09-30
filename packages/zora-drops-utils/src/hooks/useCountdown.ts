import { useEffect, useState, useMemo } from 'react'
import { intervalToDuration, fromUnixTime, getUnixTime } from 'date-fns'

export const useCountdown = (start?: string, end?: string) => {
  console.log(start, end)

  const [ready, setReady] = useState(false)

  useEffect(() => {
    if (start && end) {
      setReady(true)
    }
  }, [start, end])

  const [now, setNow] = useState(new Date())

  useEffect(() => {
    const interval = setInterval(() => {
      setNow(new Date())
    }, 500)

    return () => clearInterval(interval)
  })

  const endTime = useMemo(() => {
    /* @ts-ignore */
    if (ready) return fromUnixTime(end)
  }, [end])

  const isEnded = useMemo(() => {
    if (!end) return true

    if (ready) return getUnixTime(now) >= parseInt(end)
  }, [end, now])

  const countdownText = useMemo(() => {
    if (!ready) return ''
    if (isEnded || !start) return ''

    const { hours, minutes, seconds } = intervalToDuration({
      start: now,
      end: endTime,
    })

    return [hours + 'h', minutes + 'm', seconds + 's'].join(' ')
  }, [isEnded, start, now, endTime])

  const text = (ready && countdownText) || '...'

  return {
    text,
    isStarted: !isEnded,
    isEnded,
  }
}
