const {fetch, writeJson} = require('./mapper')

async function main() {
  const people = await fetch('Authorities (People & Corporate Bodies)', peopleMap)
  writeJson(people, 'people.json')

  const subjects = await fetch('Authorities (Subjects)', subjectsMap)
  writeJson(subjects, 'subjects.json')

  const places = await fetch('Authorities (Geographic/Locations)', placesMap)
  writeJson(places, 'places.json')

  const series = await fetch('Series', seriesMap)
  writeJson(series, 'series.json')
}

const seriesMap = {
  slugId: "Series Title",
  strings: {
    "Series Title": "title",
    "Description": "description",
  }
}

const peopleMap = {
  slugId: "Name",
  strings: {
    "Name": "name",
    "Type": "type"
  },
  lists: {
    "Title, Affiliation": "affiliation"
  }
}

const subjectsMap = {
  slugId: "Name",
  strings: {
    "Name": "name",
  }
}

const placesMap = {
  slugId: "Name",
  strings: {
    "Name": "name",
  }
}

if (require.main === module) {
  main()
}