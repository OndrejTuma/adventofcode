import fs from 'fs'

const input = fs.readFileSync(new URL('./input.txt', import.meta.url), 'utf8')
const scratchcards = input.split('\n')

const getMatches = (card) => {
  const [, winning, playing] = card.match(/: ([\d ]+) \| ([\d ]+)/)

  const winningNumbers = winning
    .split(' ')
    .filter(Boolean)
    .map((string) => Number(string))

  return playing
    .split(' ')
    .reduce(
      (acc, play) => (winningNumbers.includes(Number(play)) ? acc + 1 : acc),
      0
    )
}

const getScratchCardsSum = (cards) => {
  const cardsTotal = Array.from({ length: cards.length }).fill(1)

  cards.forEach((card, index) => {
    const matches = getMatches(card)

    const start = index + 1
    const end = Math.min(start + matches, cards.length)
    const amount = cardsTotal[index]

    if (start === end) {
      return
    }

    for (let i = start; i < end; i++) {
      cardsTotal[i] += amount
    }
  })

  return cardsTotal.reduce((acc, count) => acc + count, 0)
}

console.log(getScratchCardsSum(scratchcards))
