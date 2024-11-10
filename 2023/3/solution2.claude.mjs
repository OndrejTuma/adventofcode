import fs from 'fs'

const input = fs.readFileSync(new URL('./input.txt', import.meta.url), 'utf8')
const engineParts = input.split('\n')

class EnginePart {
  constructor(number, x, y) {
    this.number = Number(number)
    this.x = x
    this.y = y
    this.length = number.length
  }

  isAdjacent(x, y) {
    return y >= this.y - 1 && 
           y <= this.y + 1 && 
           x >= this.x - 1 && 
           x <= this.x + this.length
  }
}

const getPartsSum = (engine) => {
  const parts = []
  let sum = 0

  engine.forEach((line, y) => {
    for (const match of line.matchAll(/(\d+)/g)) {
      parts.push(new EnginePart(match[0], match.index, y))
    }
  })

  engine.forEach((line, y) => {
    for (const match of line.matchAll(/\*/g)) {
      const adjacentParts = parts.filter(part => part.isAdjacent(match.index, y))
      if (adjacentParts.length === 2) {
        sum += adjacentParts[0].number * adjacentParts[1].number
      }
    }
  })

  return sum
}

console.log(getPartsSum(engineParts))
