import * as actionTypes from "./action";

const initialState = {
  preloading: true,
  mobileView: false,
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
    default:
      return state;
  }
};

export default reducer;
