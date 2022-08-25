export type CardType = {
  image: string
  value: string
  suits: string
  code: string
}

// card: 'A',
// color: 'red',
// index: '1'

export type DeckType = {
  id: string
  remaining: number
  lastQueenPosition: number
  cards: CardType[] | []
  listCards: CardType[] | []
  orderedCards: CardType[] | []
}
