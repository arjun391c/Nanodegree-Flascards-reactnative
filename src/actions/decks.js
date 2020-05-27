export const CREATE_DECK = 'CREATE_DECK'
export const CREATE_CARD = 'CREATE_CARD'
export const RECEIVE_DECKS = 'RECEIVE_DECKS'

export const createDeck = (deck) => ({
  type: CREATE_DECK,
  created: deck.created,
  id: deck.id,
  questions: deck.questions,
  timestamp: deck.timestamp,
  title: deck.title,
});

export const createCard = (deckId, card) => ({
  type: CREATE_CARD,
  deckId,
  question: card.question,
  answer: card.answer
});

export const receiveDecks = decks => ({
  type: RECEIVE_DECKS,
  decks
});
