import fs from 'fs'

const input = fs.readFileSync(new URL('./input.txt', import.meta.url), 'utf8')
const engineParts = input.split('\n')

class Position {
  x
  y
  length

  constructor(x, y, length) {
    this.x = x
    this.y = y
    this.length = length
  }

  getCoordinates() {
    return { x: this.x, y: this.y }
  }
}

class Part extends Position {
  part

  constructor(part, x, y) {
    super(x, y, part.length)
    this.part = part
  }

  match(x, y) {
    return y === this.y && x >= this.x && x <= this.x + this.length - 1
  }

  getNumber() {
    return Number(this.part)
  }
}

const getPartsFactory = (parts) => (x, y) => {
  return parts.filter((part) => {
    return (
      part.match(x - 1, y - 1) ||
      part.match(x, y - 1) ||
      part.match(x + 1, y - 1) ||
      part.match(x - 1, y) ||
      part.match(x + 1, y) ||
      part.match(x - 1, y + 1) ||
      part.match(x, y + 1) ||
      part.match(x + 1, y + 1)
    )
  })
}

const getPartsSum = (engine) => {
  const parts = []
  const gears = []

  engine.forEach((line, y) => {
    Array.from(line.matchAll(/(\d+)/g)).forEach((match) => {
      parts.push(new Part(match[0], match.index, y))
    })
  })

  const getParts = getPartsFactory(parts)

  engine.forEach((line, y) => {
    Array.from(line.matchAll(/([^\d\.])/g)).forEach((match) => {
      const adjacentParts = getParts(match.index, y)
      if (adjacentParts.length !== 2) {
        return
      }
      const [gear1, gear2] = adjacentParts
      gears.push(gear1.getNumber() * gear2.getNumber())
    })
  })

  return gears.reduce((acc, part) => acc + part, 0)
}

console.log(getPartsSum(engineParts))
