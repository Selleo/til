import React from 'react'
import Markdown from './Markdown'
import CopyPostURL from './CopyURL'
import PostCategories from './PostCategories'
import UserPostMenu from '../authenticated/UserPostMenu'
import ReactionBar from './ReactionBar'
import { Link, useLocation } from 'react-router-dom'
import TextBlock from './TextBlock'
import { format, parseISO } from 'date-fns'

const Post = props => {
  const { post, userPost, userImage, review } = props
  const location = useLocation()

  let title
  if (location.pathname === '/search') {
    title = <TextBlock value={post.title} />
  } else {
    title = post.title
  }

  const parsed = parseISO(post.createdAt)
  const date = format(parsed, ' dd MMM  hh:mm')

  return (
    <article className="post">
      <div className="post__header">
        <div className="post__details">
          <img
            src={post.author.image || userImage}
            className="user__image"
            alt="author-img"
          />
          <div className="post__text-details">
            <div className="post__author">
              {post.author.firstName} {post.author.lastName}
            </div>
            <div className="post__date">{date}</div>
          </div>
        </div>
        {!review && <CopyPostURL postId={post.id} />}
      </div>
      <div>
        <Link className="post__title" to={`/posts/${post.id}`}>
          {title}
        </Link>
      </div>
      <div className="post__body">
        <Markdown source={post.body} />
      </div>
      <div className="post__footer">
        <PostCategories categories={post.categories} />
        {!review && <ReactionBar post={post} />}
      </div>
      {userPost && <UserPostMenu post={post} />}
    </article>
  )
}

export default Post
