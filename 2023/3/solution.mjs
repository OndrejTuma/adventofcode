import fs from 'fs'

const input = fs.readFileSync(new URL('./input.txt', import.meta.url), 'utf8')
const engineParts = input.split('\n')

const isSymbol = (char) => Boolean(char.match(/[^\d\.]/))
const hasAdjacentSymbol = (part, x, y, engine) => {
  if (y < 0 || y > engine.length - 1) {
    return false
  }

  const start = Math.max(0, x - 1)
  const end = Math.min(x + part.length, engine[y].length - 1)

  for (let i = start; i <= end; i++) {
    if (isSymbol(engine[y][i])) {
      return true
    }
  }

  return false
}

const getPartsSum = (engine) => {
  const parts = []
  
  engine.forEach((line, y) => {
    Array.from(line.matchAll(/(\d+)/g)).forEach((match) => {
      const [part] = match
      const x = match.index

      if (
        hasAdjacentSymbol(part, x, y - 1, engine) ||
        hasAdjacentSymbol(part, x, y + 1, engine) ||
        hasAdjacentSymbol(part, x, y, engine)
      ) {
        parts.push(Number(part))
      }
    })
  })

  return parts.reduce((acc, part) => acc + part, 0)
}

console.log(getPartsSum(engineParts))
