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
      
      const isValidGame = drawsBulk.split('; ').every(draw => {
        const colorCounts = Object.fromEntries(
          Array.from(draw.matchAll(/(\d+) (\w+)/g))
            .map(([, count, color]) => [color, Number(count)])
        )
        
        return Object.entries(colorCounts)
          .every(([color, count]) => count <= cubes[color])
      })

      return isValidGame ? gameNumber : 0
    })
    .reduce((acc, game) => acc + game, 0)

console.log(getPossibleGames(games))
