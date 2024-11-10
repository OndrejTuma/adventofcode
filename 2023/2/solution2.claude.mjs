import fs from 'fs'

const input = fs.readFileSync(new URL('./input.txt', import.meta.url), 'utf8')
const games = input.split('\n')

const getPower = (games) =>
  games
    .map((game) => {
      const cubes = { red: 0, green: 0, blue: 0 }
      const [, roundsData] = game.split(': ')
      const draws = roundsData.split('; ')

      for (const draw of draws) {
        const matches = draw.matchAll(/(\d+) (\w+)/g)
        for (const [, count, color] of matches) {
          cubes[color] = Math.max(cubes[color], Number(count))
        }
      }

      return Object.values(cubes).reduce((product, value) => product * value, 1)
    })
    .reduce((acc, game) => acc + game, 0)

console.log(getPower(games))
