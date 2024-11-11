import fs from 'fs'

const input = fs.readFileSync(new URL('./input.txt', import.meta.url), 'utf8')
const scratchcards = input.split('\n')

const getPoints = (card) => {
  const [, winning, playing] = card.match(/: ([\d ]+) \| ([\d ]+)/)

  const winningNumbers = winning
    .split(' ')
    .filter(Boolean)
    .map((string) => Number(string))

  return playing.split(' ').reduce((acc, play) => {
    if (!winningNumbers.includes(Number(play))) {
      return acc
    }

    return acc === 0 ? 1 : acc * 2
  }, 0)
}

const getScratchCardsSum = (cards) =>
  cards.map(getPoints).reduce((acc, points) => acc + points, 0)

console.log(getScratchCardsSum(scratchcards))
