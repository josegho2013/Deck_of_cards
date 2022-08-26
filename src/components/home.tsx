import * as React from 'react'
import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import Button from '@mui/material/Button'
import { getCards, getNewDeck } from '../service'
import { cardsList } from '../constants'
import { DeckType } from '../types'
import { Card } from './card'
import '../styles/index.css'

export default function Home () {
  const [hideButton, setHideButton] = React.useState(true)
  const [showCards, setShowCards] = React.useState(false)
  const [cards, setCards] = React.useState<any[]>([])
  const [shuffle, setShuffle] = React.useState('')
  const [deck, setDeck] = React.useState<DeckType>({
    id: '',
    remaining: 0,
    indexQueen: 0,
    listCards: [],
    orderedCards: []
  })

  const onGetDeck = async () => {
    setCards([])
    setShuffle('')
    setShowCards(false)
    setHideButton(false)
    setDeck({
      id: '',
      remaining: 0,
      indexQueen: 0,
      listCards: [],
      orderedCards: []
    })

    const newDeck = await getNewDeck()
    if (newDeck.success) {
      const allCards = await getCards(newDeck.deck_id)
      let queenIndex: number = 0

      allCards.cards?.forEach((card: any, index: number) => {
        if (card.value === 'QUEEN') {
          return (queenIndex = index)
        }
      })
      const listCards = allCards.cards?.filter(
        (_: any, index: number) => index <= queenIndex
      )
      const orderedCards = allCards.cards
        ?.filter((_: any, index: number) => index <= queenIndex)
        .sort((n1: any, n2: any) => cardsList[n1.code] - cardsList[n2.code])

      if (orderedCards.length > 0) {
        setDeck({
          id: newDeck.deck_id,
          remaining: newDeck.remaining,
          indexQueen: queenIndex,
          listCards: listCards,
          orderedCards: orderedCards
        })
        setCards(listCards)
        setShuffle('FilterList')
      }
    }
  }

  const onDealCards = () => {
    setShowCards(true)
    setHideButton(true)

    setTimeout(() => {
      setShuffle('HIDDEN')
      setTimeout(() => {
        setShuffle('OrderedList')
        setCards(deck.orderedCards)
      }, (deck.indexQueen + 1) * 100)
    }, (deck.indexQueen + 1) * 1000 + 1000)
  }

  return (
    <Box className='container'>
      <Paper elevation={3} className='navbar'>
        <Button
          className='general_button btn-left'
          disabled={hideButton}
          variant='contained'
          onClick={onDealCards}
        >
          Deal Cards
        </Button>
        <Button
          className='general_button btn-right'
          variant='outlined'
          onClick={onGetDeck}
        >
          New Deck
        </Button>
      </Paper>

      {showCards && (
        <Paper className='card-container' elevation={3}>
          {cards &&
            cards?.map((item, index) => {
              return (
                <Card
                  key={index}
                  src={item.image}
                  alt={item.value}
                  index={index}
                  shuffle={shuffle}
                />
              )
            })}
        </Paper>
      )}
      {!showCards && (
        <Paper className='empty-state' elevation={3}>
          <h3>To start, press the "New Deck" button to get a new deck.</h3>
          <h3>Then press "Deel Card" to shuffle it and draw all the queens.</h3>
          <h2>Good luck!</h2>
        </Paper>
      )}
    </Box>
  )
}
