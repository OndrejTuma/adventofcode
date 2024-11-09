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
  const matches = []
  for (let i = 0; i < coordinate.length; i++) {
    const substring = coordinate.slice(i)
    const digit = substring.match(
      /^(one|two|three|four|five|six|seven|eight|nine|1|2|3|4|5|6|7|8|9)/
    )
    if (digit) {
      matches.push(digit[0])
    }
  }

  const firstMatch = matches.at(0)
  const lastMatch = matches.at(-1)

  const firstNumber =
    firstMatch.length === 1 ? firstMatch : readableNumbers[firstMatch]
  const lastNumber =
    lastMatch.length === 1 ? lastMatch : readableNumbers[lastMatch]

  return Number(firstNumber + lastNumber)
}

const fixCoordinates = (coordinates) =>
  coordinates.reduce(
    (acc, coordinate) => acc + getFixedCoordinate(coordinate),
    0
  )

console.log(fixCoordinates(coordinates))
