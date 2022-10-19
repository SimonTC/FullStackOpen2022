import {noteReducer} from "./noteReducer";
import deepFreeze from 'deep-freeze'

describe('noteReducer', function () {
  test('returns new state with action NEW_NOTE', () => {
      const state = []
    const action = {
        type: 'NEW_NOTE',
      data: {
          content: 'the app state is in redux store',
        important: true,
        id: 1
      }
    }

    deepFreeze(state) // use deep freeze to ensure this state object isn't mutated
    const newState = noteReducer(state, action)

    expect(newState).toHaveLength(1)
    expect(newState).toContainEqual(action.data)

  })
});