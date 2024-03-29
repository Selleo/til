import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { fetchUserPosts } from '../utils'
import PostContent from './PostContent'
import EmptyPage from './EmptyPage'
import { useDispatch, useSelector } from 'react-redux'
import { statusType } from '../utils/constants'
import PostSkeletonTemplate from './PostSkeletonTemplate'
import { isEmpty } from 'lodash'
import { getAuthorPostsStatus } from '../store/actions/actions'
import useUser from '../utils/customHooks/useUser'
import { setPageDescription, setPageTitle } from '../store/actions/actions'

const { REACT_APP_API_URL: API_URL } = process.env

const UserPosts = () => {
  const [userPosts, setUserPosts] = useState([])
  const { username } = useParams()
  const dispatch = useDispatch()
  const user = useUser()
  const statuses = useSelector(state => state.statuses)
  const pageHeader = `Posts created by ${userPosts[0]?.author.firstName} ${userPosts[0]?.author.lastName}`

  useEffect(() => {
    dispatch(getAuthorPostsStatus(username))
    dispatch(setPageTitle(`${user?.firstName} ${user?.lastName}`))
    dispatch(setPageDescription(pageHeader))
    fetchUserPosts(`${API_URL}/api/authors/`, username).then(response =>
      setUserPosts(response?.data)
    )
  }, [username, user, dispatch, pageHeader])

  useEffect(() => {
    return () => {
      dispatch(setPageTitle(null))
      dispatch(setPageDescription(null))
    }
  }, [dispatch])

  if (
    !statuses.authorPostsStatus ||
    statuses.authorPostsStatus === statusType.loading
  )
    return <PostSkeletonTemplate />

  if (isEmpty(userPosts)) return <EmptyPage />

  return (
    <>
      <h3 className="users-posts__title">{pageHeader}</h3>
      {userPosts.map(post => (
        <PostContent key={post.id} post={post} />
      ))}
    </>
  )
}

export default UserPosts
