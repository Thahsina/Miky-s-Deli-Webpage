export const actionType = {
  SET_USER: "SET_USER",
  SET_DELIVERYZONE: "SET_DELIVERYZONE",
  SET_MENU_ITEMS: "SET_MENU_ITEMS",
  SET_CATERINGMENU_ITEMS: "SET_CATERINGMENU_ITEMS",
  SET_DROPOFFMENU_ITEMS: "SET_DROPOFFMENU_ITEMS",
  SET_CARTITEMS: "SET_CARTITEMS",
  // Order Types
  SET_ORDER_HISTORY_START: "SET_ORDER_HISTORY_START",
  GET_USER_ORDER_HISTORY: "GET_USER_ORDER_HISTORY",
  SET_USER_ORDER_HISTORY: "SET_USER_ORDER_HISTORY",
};

const reducer = (state, action) => {
  // console.log(action);

  switch (action.type) {
    case actionType.SET_USER:
      return {
        ...state,
        user: action.user,
      };
    case actionType.SET_DELIVERYZONE:
      return {
        ...state,
        deliveryZone: action.deliveryZone,
      };
    case actionType.SET_MENU_ITEMS:
      return {
        ...state,
        menuItems: action.menuItems,
      };
    case actionType.SET_CATERINGMENU_ITEMS:
      return {
        ...state,
        cateringMenuItems: action.cateringMenuItems,
      };
    case actionType.SET_DROPOFFMENU_ITEMS:
      return {
        ...state,
        dropoffMenuItems: action.dropoffMenuItems,
      };
    case actionType.SET_CARTITEMS:
      return {
        ...state,
        cartItems: action.cartItems,
        // quantity: state.cartItems?.map((cartItem) => cartItem.qty),
      };
    case actionType.SET_TOTAL:
      return {
        ...state,
        total: state.cartItems.map((item) => item.price),
      };
    case actionType.SET_ORDER_HISTORY_START:
      return {
        ...state,
        order: action.order,
      };
    case actionType.GET_ORDER_HISTORY:
      return {
        ...state,
        uid: action.user.uid,
      };
    case actionType.SET_USER_ORDER_HISTORY:
      return {
        ...state,
        history: action.history,
      };

    default:
      return state;
  }
};

export default reducer;
