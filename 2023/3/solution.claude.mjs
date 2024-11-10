import fs from 'fs'

const input = fs.readFileSync(new URL('./input.txt', import.meta.url), 'utf8')
const engineParts = input.split('\n')

const isSymbol = char => /[^\d.]/.test(char)
const hasAdjacentSymbol = (part, x, y, engine) => {
  if (y < 0 || y >= engine.length) return false
  
  const start = Math.max(0, x - 1)
  const end = Math.min(x + part.length, engine[y].length - 1)
  
  return [...engine[y].slice(start, end + 1)].some(isSymbol)
}

const getPartsSum = engine => {
  return engine.reduce((sum, line, y) => {
    const numbers = [...line.matchAll(/\d+/g)]
    const validParts = numbers
      .filter(match => [-1, 0, 1].some(dy => 
        hasAdjacentSymbol(match[0], match.index, y + dy, engine)
      ))
      .map(match => Number(match[0]))
    
    return sum + validParts.reduce((a, b) => a + b, 0)
  }, 0)
}

console.log(getPartsSum(engineParts))