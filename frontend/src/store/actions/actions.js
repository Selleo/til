import * as actionTypes from "../actionTypes";
import { fetchUser, fetchUserPosts, fetchData } from "../../utils";

// CATEGORIES
export const getAllCategories = (categories) => ({
  type: actionTypes.GET_ALL_CATEGORIES,
  categories,
});

export const saveAllCategories = () => async (dispatch) => {
  const categoriesArray = await fetchData("/api/categories");

  dispatch(getAllCategories(categoriesArray));
};

// USER
export const getCurrentUser = (currentUser) => ({
  type: actionTypes.GET_CURRENT_USER,
  currentUser,
});

export const saveCurrentUser = () => async (dispatch) => {
  const currentUser = await fetchUser("/api/me");

  dispatch(getCurrentUser(currentUser));
};

export const getCurrentUserPosts = (currentUserPosts) => ({
  type: actionTypes.GET_CURRENT_USER_POSTS,
  currentUserPosts,
});

export const saveCurrentUserPosts = (id) => async (dispatch) => {
  const posts = await fetchUserPosts("/api/users/", id);

  dispatch(getCurrentUserPosts(posts));
};

// ALL USERS
export const getAllUsers = (users) => ({
  type: actionTypes.GET_ALL_USERS,
  users,
});

export const saveAllUsers = () => async (dispatch) => {
  const allUsers = await fetchData("/api/users");

  dispatch(getAllUsers(allUsers));
};

// POSTS
export const getPosts = (posts) => ({
  type: actionTypes.GET_ALL_POSTS,
  posts,
});

export const saveAllPosts = () => async (dispatch) => {
  const allPosts = await fetchData("/api/posts");

  dispatch(getPosts(allPosts));
};
