import fs from 'fs'

const input = fs.readFileSync(new URL('./input.txt', import.meta.url), 'utf8')
const coordinates = input.split('\n')

const isNumber = (char) => !isNaN(char)
const getFirstNumber = (string) => string.split('').find(isNumber)
const getLastNumber = (string) => string.split('').reverse().find(isNumber)

const fixCoordinates = (coordinates) =>
  coordinates.reduce(
    (acc, coordinate) =>
      acc + Number(getFirstNumber(coordinate) + getLastNumber(coordinate)),
    0
  )

console.log(fixCoordinates(coordinates))
