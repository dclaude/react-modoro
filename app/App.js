import React from 'react'
import { AppContainer } from './containers'
import { createStore, applyMiddleware, combineReducers, compose } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import * as reducers from './redux'
import devTools from 'remote-redux-devtools'
import { LOGGING_OUT } from './redux/modules/authentication'

const appReducer = combineReducers(reducers) // reducers is a JS object whose properties are all our reducers exported in redux/index.js

function rootReducer(state, action) {
  if (action.type === LOGGING_OUT) {
    state = undefined // reset our state: the arg passed to the reducers below will be 'undefined' so each reducer will reset its state to its default value
  }
  return appReducer(state, action)
}

const store = createStore(
  rootReducer,
  compose(
    applyMiddleware(thunk),
    devTools()
  )
)

export default function ReactModoro (props) {
  return (
    <Provider store={store}>
      <AppContainer />
    </Provider>
  )
} 

