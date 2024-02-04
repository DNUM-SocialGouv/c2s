import { createStore, applyMiddleware, compose } from 'redux';
import {thunk} from 'redux-thunk';
import {rootReducer} from './rootReducer.tsx';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
    rootReducer,
    composeEnhancers(
        applyMiddleware(thunk)
    )
);

export default store;