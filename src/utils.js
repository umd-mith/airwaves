import moment from 'moment'

export function formatDuration(seconds) {
  const duration = moment.duration({seconds})
  return moment.utc(duration.as('milliseconds')).format('HH:mm:ss')
}

/**
 * Create an excerpt of a string using a desired substring, and 
 * a desired length of the excerpt.
 * @param {string} s - a string to search in 
 * @param {string} query - a substring to search for
 * @param {number} desiredLength - the desired length of the excerpt
 */

export function excerpt(s, query, desiredLength) {
  if (s.length <= desiredLength) {
    return s
  }

  const words = s.split(/ +/)
  const pattern = new RegExp(`.*${query}.*`, 'i')
  let pos = -1

  for (let i = 0; i < words.length; i += 1) {
    if (pos === -1 && words[i].match(pattern)) pos = i
  }

  if (pos === -1) {
    return s.substr(0, desiredLength)
  }

  if (pos !== 0) words.shift()
  if (pos !== words.length - 1) words.pop()

  return excerpt(words.join(' '), query, desiredLength)
}