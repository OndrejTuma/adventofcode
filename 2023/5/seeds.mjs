import fs from 'fs'

const input = fs.readFileSync(new URL('./input.txt', import.meta.url), 'utf8')

const parseData = ([match], splitter = '\n') =>
  match.split(splitter).filter(Boolean).slice(1)
const convertToNumbers = (string) => Number(string)

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
const [seeds, ...locations] = searchChain.map((piece, index, arr) => {
  if (index === 0) {
    return parseData(input.match(/seeds: ([\d ]+)/g), ' ').map(convertToNumbers)
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

const findSeedLocation = (seed, locations) => {
  return locations.reduce((item, location) => {
    const match = location.find(
      ({ source, length }) => item >= source && item <= source + length
    )

    if (!match) {
      return item
    }

    const { destination, source } = match

    return destination + item - source
  }, seed)
}

const lowestLocation = seeds.reduce((loc, seed) => {
  const seedLocation = findSeedLocation(seed, locations)

  return seedLocation < loc ? seedLocation : loc
}, Infinity)

console.log(lowestLocation)
