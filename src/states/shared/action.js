import { showLoading, hideLoading } from 'react-redux-loading-bar';
import api from '../../utils/api';
import { receiveUsersActionCreator } from '../users/action';
import { receiveThreadsActionCreator } from '../threads/action';
import { receiveCategoriesActionCreator } from '../categories/action';

function asyncPopulateUsersThreadsAndCategories() {
  return async (dispatch) => {
    try {
      dispatch(showLoading());

      const users = await api.getAllUsers();
      const threads = await api.getAllThreads();

      dispatch(receiveUsersActionCreator(users));
      dispatch(receiveThreadsActionCreator(users));

      const categories = api.getAllCategories();
      dispatch(receiveCategoriesActionCreator(categories));

      return { users, threads, categories };
    } catch (error) {
      dispatch(receiveThreadsActionCreator([]));
      throw new Error(error.message);
    } finally {
      dispatch(hideLoading());
    }
  };
}

export { asyncPopulateUsersThreadsAndCategories };