import moment from 'moment'

export function formatDuration(seconds) {
  const duration = moment.duration({seconds})
  return moment.utc(duration.as('milliseconds')).format('HH:mm:ss')
}