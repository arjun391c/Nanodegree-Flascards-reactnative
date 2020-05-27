import { retrieveDecks } from '../utils/api'
import { receiveDecks } from './decks'

export function fetchInitialData() {
    return (dispatch) => {
        return retrieveDecks()
                .then(decks => dispatch(receiveDecks(decks)))
    }
}
