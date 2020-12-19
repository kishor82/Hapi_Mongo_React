import { createStore, combineReducers, applyMiddleware, Middleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { productListReducer, productDetailsReducer } from './reducers/productReducers';
import { cartReducer } from './reducers/cartReducers';

const reducer = combineReducers({
  productList: productListReducer,
  productDetails: productDetailsReducer,
  cart: cartReducer,
});

const cartItemsFromStore = localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems') || '{}') : [];
const intitialState: any = {
  cart: {
    cartItems: cartItemsFromStore,
  },
};

const middleware: Middleware[] = [thunk];

const store = createStore(reducer, intitialState, composeWithDevTools(applyMiddleware(...middleware)));

export default store;
