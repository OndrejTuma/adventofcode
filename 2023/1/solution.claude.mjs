import fs from 'fs'

const input = fs.readFileSync(new URL('./input.txt', import.meta.url), 'utf8')
const coordinates = input.split('\n')

const readableNumbers = {
  one: '1',
  two: '2',
  three: '3',
  four: '4',
  five: '5',
  six: '6',
  seven: '7',
  eight: '8',
  nine: '9',
}

const getFixedCoordinate = (coordinate) => {
  const pattern = /(?=(\d|one|two|three|four|five|six|seven|eight|nine))/g
  const matches = [...coordinate.matchAll(pattern)].map(m => m[1])
  
  const firstMatch = matches[0]
  const lastMatch = matches.at(-1)
  
  const firstNumber = readableNumbers[firstMatch] || firstMatch
  const lastNumber = readableNumbers[lastMatch] || lastMatch
  
  return Number(firstNumber + lastNumber)
}

const fixCoordinates = (coordinates) =>
  coordinates.reduce(
    (acc, coordinate) => acc + getFixedCoordinate(coordinate),
    0
  )

console.log(fixCoordinates(coordinates))
