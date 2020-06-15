import mapper from './mapper'

test('map a subject to map to a theme', () => {
  const themes = mapper.subjectToThemes('Jazz--History and criticism')
  expect(themes.length).toBe(1)
  expect(themes[0]).toBe('Music')
})

test('map a subdivided subject to a general theme', () => {
  const themes = mapper.subjectToThemes('Jazz--Fake--Subdivision')
  expect(themes.length).toBe(1)
  expect(themes[0]).toBe('Music')
})

test('map a subject to multiple themes', () => {
  const themes = mapper.subjectToThemes('Public broadcasting--Congresses')
  expect(themes.length).toBe(2)
  expect(themes).toStrictEqual(['Broadcasting', 'U.S. Government'])
})

test('map a list of subjects to a list of subjects with relevant themes', () => {
  const subjects = [
    {
      id: 'jazz-history',
      name: 'Jazz--History'
    },
    {
      id: 'public-broadcasting-congresses',
      name: 'Public broadcasting--Congresses'
    }
  ]

  const newSubjects = mapper.subjectsToThemes(subjects)
  expect(newSubjects.length).toBe(5)
  expect(newSubjects).toStrictEqual([
    {
      id: 'broadcasting',
      name: 'Broadcasting'
    },
    {
      id: 'jazz-history',
      name: 'Jazz--History'
    },
    {
      id: 'music',
      name: 'Music'
    },
    {
      id: 'public-broadcasting-congresses',
      name: 'Public broadcasting--Congresses'
    },
    {
      id: 'us-government',
      name: 'U.S. Government'
    }
  ])

}) 
