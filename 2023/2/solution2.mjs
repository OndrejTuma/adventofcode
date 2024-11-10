import fs from 'fs'

const input = fs.readFileSync(new URL('./input.txt', import.meta.url), 'utf8')
const games = input.split('\n')

const getPower = (games) =>
  games
    .map((game) => {
      const cubes = {
        red: 0,
        green: 0,
        blue: 0,
      }
      const draws = game.split(': ').pop().split('; ')

      draws.forEach((draw) => {
        Array.from(draw.matchAll(/(\d+) (\w+)/g)).map(
          ([, count, color]) => {
            if (Number(count) > cubes[color]) {
              cubes[color] = Number(count)
            }
          }
        )
      })

      return cubes.red * cubes.green * cubes.blue
    })
    .reduce((acc, game) => acc + game, 0)

console.log(getPower(games))
