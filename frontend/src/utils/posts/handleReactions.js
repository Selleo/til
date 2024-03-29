import { getToken } from '../auth'

// REACTIONS
export const handleReaction = async (postId, method, reaction) => {
  let ending = ''

  if (method === 'DELETE') {
    ending = `/${reaction}`
  }

  const response = await fetch(
    `${process.env.REACT_APP_API_URL}/api/posts/${postId}/reactions${ending}`,
    {
      method: `${method}`,
      headers: {
        Authorization: `Bearer ${getToken()}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ type: reaction }),
    }
  )

  return response.ok
}
