import {
	createStore,
	combineReducers,
	applyMiddleware,
	compose
} from 'redux'
import reducers from './Reducers'
import ReduxThunk from 'redux-thunk'


const preloadedState = window.__PRELOADED_STATE__;
delete window.__PRELOADED_STATE__;

const reducer = combineReducers(reducers)
const devTools = window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : f => f
const enhancer = compose(
	applyMiddleware(ReduxThunk),
	devTools
)
const store = createStore(reducer, preloadedState, enhancer)

export default store
