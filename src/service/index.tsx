import axios from 'axios'

export const getNewDeck = async () => {
  console.log('entro')
  const req = await axios.get(
    'https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1'
  )
  return req.data
}

export const getCards = async (id: string) => {
  const req = await axios.get(
    `https://deckofcardsapi.com/api/deck/${id}/draw/?count=52`
  )
  return req.data
}
