import React from 'react'
import ReactDOM from 'react-dom/client'

import {Provider} from "react-redux"
import App from "./App";
import filterReducer from "./reducers/filterReducer";
import noteReducer, {appendNote} from "./reducers/noteReducer";
import {configureStore} from "@reduxjs/toolkit";
import noteService from './services/notes'

const store = configureStore({
  reducer: {
    notes: noteReducer,
    filter: filterReducer
  }
})

noteService.getAll().then(notes => {
  notes.forEach(note => {
    store.dispatch(appendNote(note))
  })
})

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App/>
  </Provider>
)