import React from 'react'
import ReactDOM from 'react-dom/client'

import {Provider} from "react-redux"
import App from "./App";
import filterReducer from "./reducers/filterReducer";
import noteReducer from "./reducers/noteReducer";
import {configureStore} from "@reduxjs/toolkit";

const store = configureStore({
  reducer: {
    notes: noteReducer,
    filter: filterReducer
  }
})

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App/>
  </Provider>
)