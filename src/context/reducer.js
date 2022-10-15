export const actionType = {
  SET_USER: "SET_USER",
  SET_DELIVERYZONE: "SET_DELIVERYZONE",
  SET_MENU_ITEMS: "SET_MENU_ITEMS",
  SET_CATERINGMENU_ITEMS: "SET_CATERINGMENU_ITEMS",
  SET_DROPOFFMENU_ITEMS: "SET_DROPOFFMENU_ITEMS",
  SET_CARTITEMS: "SET_CARTITEMS",
  SET_QUANTITY: "SET_QUANTITY",
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
    case actionType. SET_DROPOFFMENU_ITEMS:
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

    default:
      return state;
  }
};

export default reducer;
