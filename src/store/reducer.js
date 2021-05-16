import * as actionTypes from "./action";

const initialState = {
  auth: false,
  id: "",
  name: "",
  email: "",
  mobile: "",
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

    case actionTypes.LOGIN: {
      const myState = { ...state };
      myState.auth = true;
      myState.id = action.id;
      myState.name = action.name;
      myState.email = action.email;
      myState.mobile = action.mobile;
      myState.cart = action.cart || [];

      return myState;
    }
    case actionTypes.LOGOUT: {
      const myState = { ...state };
      myState.auth = false;
      myState.id = "";
      myState.name = "";
      myState.email = "";
      myState.mobile = "";
      localStorage.removeItem("vastr-token");

      return myState;
    }
    case actionTypes.UPDATE: {
      const myState = { ...state };
      myState.name = action.name || myState.name;
      myState.mobile = action.mobile || myState.mobile;

      return myState;
    }
    case actionTypes.ADD_PRODUCT: {
      const myState = { ...state };
      const cart = [...myState.cart];
      const product = action.product;
      const pid = product.id;
      const pSize = product.size;

      const index = cart.findIndex(
        (item) => item.id === pid && item.size === pSize
      );
      if (index > -1) {
        if (cart[index].size === pSize) {
          cart[index].qty += 1;
        } else {
          product.qty = 1;
          cart.push(product);
        }
      } else {
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
      const pSize = action.productSize;

      const index = cart.findIndex(
        (item) => item.id === pid && item.size === pSize
      );
      cart[index].qty += 1;

      myState.cart = cart;
      return myState;
    }
    case actionTypes.DECREMENT_PRODUCT: {
      const myState = { ...state };
      const cart = [...myState.cart];
      const pid = action.productId;
      const pSize = action.productSize;

      const index = cart.findIndex(
        (item) => item.id === pid && item.size === pSize
      );
      if (cart[index].qty > 1) cart[index].qty -= 1;
      else cart.splice(index, 1);

      myState.cart = cart;
      return myState;
    }

    case actionTypes.REMOVE_PRODUCT: {
      const myState = { ...state };
      const cart = [...myState.cart];
      const pid = action.productId;
      const pSize = action.productSize;

      const index = cart.findIndex(
        (item) => item.id === pid && item.size === pSize
      );
      cart.splice(index, 1);

      myState.cart = cart;
      return myState;
    }

    default:
      return state;
  }
};

export default reducer;
