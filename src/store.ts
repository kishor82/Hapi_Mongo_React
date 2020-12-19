import { createStore, combineReducers, applyMiddleware, Middleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { productListReducer, productDetailsReducer } from './reducers/productReducers';

const reducer = combineReducers({
  productList: productListReducer,
  productDetails: productDetailsReducer,
});

const intitialState = {};

const middleware: Middleware[] = [thunk];

const store = createStore(reducer, intitialState, composeWithDevTools(applyMiddleware(...middleware)));

export default store;
