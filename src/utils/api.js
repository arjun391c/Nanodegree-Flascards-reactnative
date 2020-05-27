import { AsyncStorage } from "react-native";

export const FLASHCARD_STORAGE_KEY = "Udacity:FlashCards";

/* dummy data */
const dummyData = {
  CapitalCities: {
    id: 'CapitalCities',
    title: 'Capital Cities',
    timestamp: 1563796800,
    created: '2019-07-22',
    questions: [
      {
        question: 'What is the capital of Canada?',
        answer: 'Ottawa'
      },
      {
        question: 'What is the capital of China?',
        answer: 'Beijing'
      },
      {
        question: 'What is the capital of Poland?',
        answer: 'Warsaw'
      },
      {
        question: 'What is the capital of Germany?',
        answer: 'Berlin'
      }
    ]
  },
  React: {
    id: 'React',
    title: 'React',
    timestamp: 1563710400,
    created: '2019-07-21',
    questions: [
      {
        question: 'What is React?',
        answer: 'A library for managing user interfaces'
      },
      {
        question: 'Where do you make Ajax requests in React?',
        answer: 'The componentDidMount lifecycle event'
      }
    ]
  }
};


export const retrieveDecks = () => {
  return AsyncStorage.getItem(FLASHCARD_STORAGE_KEY).then(results => {
    const data = JSON.parse(results);
    return data;
  });
};

export const saveDeck = deck => {
  return AsyncStorage.mergeItem(
    FLASHCARD_STORAGE_KEY,
    JSON.stringify({ [deck.id]: deck })
  );
};

export const saveCard = (deckId, card) => {
  return AsyncStorage.getItem(FLASHCARD_STORAGE_KEY).then(results => {
    const data = JSON.parse(results);

    data[deckId] = {
      ...data[deckId],
      questions: [
        ...data[deckId].questions,
        { question: card.question, answer: card.answer }
      ]
    };

    AsyncStorage.setItem(FLASHCARD_STORAGE_KEY, JSON.stringify(data));
  });
};


