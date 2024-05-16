import { ActionType } from './action';

const initialValue = {
  values: ['all'],
  selected: 'all',
};

function categoriesReducer(categories = initialValue, action = {}) {
  switch (action.type) {
    case ActionType.RECEIVE_CATEGORIES:
      return action.payload.categories;

    case ActionType.SET_CATEGORY:
      return {
        ...categories,
        selected: action.payload.category,
      };

    default:
      return categories;
  }
}

export default categoriesReducer;
