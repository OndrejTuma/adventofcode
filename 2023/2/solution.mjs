import fs from 'fs'

const input = fs.readFileSync(new URL('./input.txt', import.meta.url), 'utf8')
const games = input.split('\n')

const cubes = {
  red: 12,
  green: 13,
  blue: 14,
}

const getPossibleGames = (games) =>
  games
    .map((game) => {
      const [gameInfo, drawsBulk] = game.split(': ')

      const gameNumber = Number(gameInfo.match(/\d+/).pop())
      const draws = drawsBulk.split('; ')

      const isValidGame = draws.every(draw => {
        const redMatch = draw.match(/(\d+) red/)
        const greenMatch = draw.match(/(\d+) green/)
        const blueMatch = draw.match(/(\d+) blue/)

        if (redMatch && Number(redMatch.at(1)) > cubes.red) {
          return false
        }
        if (greenMatch && Number(greenMatch.at(1)) > cubes.green) {
          return false
        }
        if (blueMatch && Number(blueMatch.at(1)) > cubes.blue) {
          return false
        }

        return true
      })

      return isValidGame ? gameNumber : 0
    })
    .reduce((acc, game) => acc + game, 0)

console.log(getPossibleGames(games))
