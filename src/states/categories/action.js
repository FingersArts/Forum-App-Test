const ActionType = {
  RECEIVE_CATEGORIES: 'RECEIVE_CATEGORIES',
  SET_CATEGORY: 'SET_CATEGORY',
};

function receiveCategoriesActionCreator(categories) {
  return {
    type: ActionType.RECEIVE_CATEGORIES,
    payload: {
      categories,
    },
  };
}

function setCategoryActionCreator(category) {
  return {
    type: ActionType.SET_CATEGORY,
    payload: {
      category,
    },
  };
}

export {
  ActionType,
  receiveCategoriesActionCreator,
  setCategoryActionCreator,
};
