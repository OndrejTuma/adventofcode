import fs from 'fs'

const input = fs.readFileSync(new URL('./input.txt', import.meta.url), 'utf8')

const parseData = ([match], splitter = '\n') =>
  match.split(splitter).filter(Boolean).slice(1)
const convertToNumbers = (string) => Number(string)

const getSeedRanges = (seedRanges) => {
  const ranges = []

  for (let i = 0; i < seedRanges.length; i += 2) {
    ranges.push({
      start: seedRanges[i],
      end: seedRanges[i] + seedRanges[i + 1] - 1,
    })
  }

  return ranges
}

const searchChain = [
  'seed',
  'soil',
  'fertilizer',
  'water',
  'light',
  'temperature',
  'humidity',
  'location',
]

// parse input data into meaningful arrays
const [seedRanges, ...locations] = searchChain.map((piece, index, arr) => {
  if (index === 0) {
    const seedData = parseData(input.match(/seeds: ([\d ]+)/g), ' ').map(
      convertToNumbers
    )

    return getSeedRanges(seedData)
  }

  const dataExp = new RegExp(
    `${arr[index - 1]}-to-${piece} map:\n(([\\d ]+)\n)+`,
    'gm'
  )
  const data = parseData(input.match(dataExp)).map((coordinates) => {
    const [destination, source, length] = coordinates
      .split(' ')
      .map(convertToNumbers)

    return { destination, source, length }
  })

  return data
})

const findSeedLocation = (seedStart, seedEnd, locations) => {
  let minLocation = Infinity

  for (let seed = seedStart; seed <= seedEnd; seed++) {
    const location = locations.reduce((item, location) => {
      const match = location.find(
        ({ source, length }) => item >= source && item <= source + length
      )

      if (!match) {
        return item
      }

      const { destination, source } = match

      return destination + item - source
    }, seed)

    minLocation = Math.min(minLocation, location)
  }

  return minLocation
}

const lowestLocation = seedRanges.reduce((loc, seedRange) => {
  const seedLocation = findSeedLocation(
    seedRange.start,
    seedRange.end,
    locations
  )

  return seedLocation < loc ? seedLocation : loc
}, Infinity)

console.log(lowestLocation)
