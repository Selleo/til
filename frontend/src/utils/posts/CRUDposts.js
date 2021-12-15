import { checkForToken, getToken } from '../auth'

// FETCH ALL POSTS
export const fetchData = async url => {
  const optionsToken = checkForToken()

  const response = await fetch(url, optionsToken)
  const data = response.json()

  return data
}

// FETCH CATEGORY POSTS
export const fetchCategoryPosts = async url => {
  const optionsToken = checkForToken()

  const response = await fetch(url, optionsToken)
  const data = response.json()

  return data
}

// CREATE, UPDATE, DELETE POST
export const request = async (action, url, data) => {
  const response = await fetch(url, {
    method: action,
    headers: {
      Authorization: `Bearer ${getToken()}`,
      'Content-Type': 'application/json',
    },
    body: data,
  })

  return response
}

// FETCH SINGLE POST
export const fetchSinglePost = async (url, id) => {
  const optionsToken = checkForToken()

  const response = await fetch(url + id, optionsToken)
  const post = response.json()

  return post
}

// FETCH USERS POSTS
export const fetchUserPosts = async (url, username) => {
  try {
    let optionsToken = checkForToken()
    const response = await fetch(url + username, optionsToken)
    const user = await response.json()
    const userPosts = user.posts

    return userPosts
  } catch (error) {
    console.warn(error)
  }
}
