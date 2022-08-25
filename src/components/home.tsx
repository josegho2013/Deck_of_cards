import * as React from 'react'
import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import Button from '@mui/material/Button'
import { getCards, getNewDeck } from '../service'
import { cardsList } from '../constants'
import { DeckType, CardType } from '../types'

export default function Home () {
  const [hideButton, setHideButton] = React.useState(false)
  const [deck, setDeck] = React.useState<DeckType>({
    id: '',
    remaining: 0,
    lastQueenPosition: 0,
    cards: [],
    listCards: [],
    orderedCards: []
  })
  const [cards, setCards] = React.useState([])

  const onGetDeck = async () => {
    // setHideButton(true)
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
      const orderedCards = listCards.sort(
        (n1: any, n2: any) => cardsList[n1.code] - cardsList[n2.code]
      )
      if (orderedCards) {
        setCards(orderedCards)
        setDeck({
          id: newDeck.deck_id,
          remaining: newDeck.remaining,
          lastQueenPosition: queenIndex,
          cards: allCards.cards,
          orderedCards: orderedCards,
          listCards
        })
      }

      console.log('1.queenIndex: ', queenIndex)
      console.log('2.allCards: ', allCards)
      console.log('3.orderedCards: ', orderedCards)
      console.log('4.deck: ', deck)
    }
  }

  const onDealCards = () => {
    console.log('5.cards: ', cards)
    setHideButton(true)
  }

  return (
    <Box
      sx={{
        display: 'block',
        flexWrap: 'wrap',
        '& > :not(style)': {
          m: 1,
          width: 128,
          height: 128
        }
      }}
    >
      <Paper
        elevation={3}
        style={{
          display: 'flex',
          width: '100%',
          justifyContent: 'space-evenly',
          alignItems: 'center'
        }}
      >
        <Button
          style={{ width: '200px', height: '50px' }}
          disabled={hideButton}
          variant='contained'
          onClick={onDealCards}
        >
          Deal
        </Button>
        <Button
          style={{ width: '200px', height: '50px' }}
          variant='outlined'
          onClick={onGetDeck}
        >
          New deck
        </Button>
      </Paper>

      <Paper elevation={3}>
        {deck.orderedCards &&
          deck.orderedCards.map(item => {
            return (
              <img
                style={{
                  width: '100px',
                  height: '134px',
                  borderRadius: '5px'
                }}
                src={item.image}
                alt={item.code}
              />
            )
          })}
      </Paper>
    </Box>
  )
}
