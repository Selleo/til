import React from 'react'
import { useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { useState } from 'react'
import { saveAllPosts } from '../store/actions/actions'
import PostContent from '../components/PostContent'
import { useQuery, fetchReviewPost, approvePost } from '../utils'

const { REACT_APP_API_URL: API_URL } = process.env

const ReviewPost = () => {
  const history = useHistory()
  const dispatch = useDispatch()
  const query = useQuery()
  const [post, setPost] = useState(null)
  const [hash, setHash] = useState(null)

  useEffect(() => {
    const fetchpost = async () => {
      const hash = query.get('hashed_id')
      const post = await fetchReviewPost(`${API_URL}/api/posts/${hash}/review`)
      setHash(hash)
      setPost(post)
    }

    fetchpost()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const approvePostHandler = () => {
    const response = approvePost(`${API_URL}/api/posts/${hash}/review`)
    if (response) {
      dispatch(saveAllPosts())
      history.push('/')
    }
  }

  if (!post) {
    return <p>...loading...</p>
  }

  if (post.errors) {
    return <p>post {post.errors.detail}</p>
  }

  return (
    <div className="review-post__container">
      <PostContent post={post} review={true} />
      <button
        className="review-post__confirm-button"
        onClick={approvePostHandler}
      >
        APPROVE?
      </button>
    </div>
  )
}

export default ReviewPost
