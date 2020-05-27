import { RECEIVE_DECKS, CREATE_CARD, CREATE_DECK } from "../actions/decks"

const decks = (state = {}, action) => {
  switch (action.type) {
    case RECEIVE_DECKS:
      return {
        ...state,
        ...action.decks
      };
    case CREATE_DECK: {      
      return {
        ...state,
        [action.id]: {
          created: action.created,
          id: action.id,
          questions: action.questions,
          timestamp: action.timestamp,
          title: action.title,
        }
      };
    }
    case CREATE_CARD: {
      return {
        ...state,
        [action.deckId]: {
          ...state[action.deckId],
          questions: [
            ...state[action.deckId].questions,
            { question: action.question, answer: action.answer }
          ]
        }
      };
    }
    default:
      return state;
  }
};

export default decks;
