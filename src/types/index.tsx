export type CardType = {
  code: string
  value: string
  image: string
  suits: string
}

export type DeckType = {
  id: string
  remaining: number
  indexQueen: number
  listCards: CardType[] | []
  orderedCards: CardType[] | []
}

export type CardProps = {
  index: number
  shuffle: any
  src: string
  alt?: string
}
