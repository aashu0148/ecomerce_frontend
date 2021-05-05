import * as actionTypes from "./action";

const initialState = {
  preloading: true,
  mobileView: false,
  cart: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.LOADED: {
      const myState = { ...state };
      myState.preloading = false;
      return myState;
    }

    case actionTypes.MOBILE_VIEW: {
      const myState = { ...state };
      myState.mobileView = action.mobileView;
      return myState;
    }

    case actionTypes.ADD_PRODUCT: {
      const myState = { ...state };
      const cart = [...myState.cart];
      const product = action.product;
      const pid = product.id;

      const index = cart.findIndex((item) => item.id === pid);
      if (index > -1) cart[index].qty += 1;
      else {
        product.qty = 1;
        cart.push(product);
      }

      myState.cart = cart;
      return myState;
    }
    case actionTypes.INCREMENT_PRODUCT: {
      const myState = { ...state };
      const cart = [...myState.cart];
      const pid = action.productId;

      const index = cart.findIndex((item) => item.id === pid);
      cart[index].qty += 1;

      myState.cart = cart;
      return myState;
    }
    case actionTypes.DECREMENT_PRODUCT: {
      const myState = { ...state };
      const cart = [...myState.cart];
      const pid = action.productId;

      const index = cart.findIndex((item) => item.id === pid);
      if (cart[index].qty > 1) cart[index].qty -= 1;
      else cart.splice(index, 1);

      myState.cart = cart;
      return myState;
    }

    case actionTypes.REMOVE_PRODUCT: {
      const myState = { ...state };
      const cart = [...myState.cart];
      const pid = action.productId;

      const index = cart.findIndex((item) => item.id === pid);
      cart.splice(index, 1);

      myState.cart = cart;
      return myState;
    }

    default:
      return state;
  }
};

export default reducer;
