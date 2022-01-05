import React, { useMemo } from 'react'

import { Link, useLocation } from 'react-router-dom'
import { parseISO } from 'date-fns'

import { timeFormat } from '../utils'
import { useIsPostPublic } from '../utils/customHooks/useIsPostPublic'
import useUser from '../utils/customHooks/useUser'

import Avatar from './Avatar'
import CopyPostURL from './CopyURL'
import Markdown from './Markdown'
import PostCategories from './PostCategories'
import ReactionBar from './ReactionBar'
import TextBlock from './TextBlock'
import { Transition } from './Transition'
import UserPostMenu from '../authenticated/UserPostMenu'

const PostContent = ({ animationDelay, post, review, userMenu }) => {
  const { pathname } = useLocation()
  const user = useUser()

  const isPublic = useIsPostPublic(post.isPublic)
  const parsed = parseISO(post.createdAt)
  const date = timeFormat(parsed)

  const isPostOwner = useMemo(() => {
    if (user && post) {
      return user.uuid === post.author.uuid
    }
  }, [user, post])

  const title =
    pathname === 'search' ? <TextBlock value={post.title} /> : post.title

  const linkToOwnerOfPostProfile = isPostOwner
    ? `/profile`
    : `/authors/${post.author.userName}`

  return (
    <Transition name="post-animation" delay={animationDelay}>
      <article
        className="post"
        style={{ transitionDelay: `${animationDelay}ms` }}
      >
        <div className="post__header">
          <div className="post__details">
            <Link
              to={linkToOwnerOfPostProfile}
              className="post__link user-avatar"
            >
              <Avatar imageUrl={post.author.image} background="light" />
            </Link>
            <div className="post__text-details">
              <Link to={linkToOwnerOfPostProfile} className="post__link">
                <div className="post__owner">
                  <span className="animation">
                    {post.author.firstName} {post.author.lastName}
                  </span>
                </div>
              </Link>
              <div className="post__date">{date}</div>
              <div className="post__is-public">{isPublic}</div>
            </div>
          </div>

          {!review && <CopyPostURL postId={post.id} />}
        </div>
        <div>
          <span className="post__title">{title}</span>
        </div>
        <div className="post__body">
          <Markdown source={post.body} />
        </div>
        <div className="post__footer">
          <PostCategories categories={post.categories} />
          {!review && <ReactionBar post={post} />}
        </div>
        {(userMenu || isPostOwner) && (
          <UserPostMenu post={post} userMenu={userMenu} isOnReview={review} />
        )}
      </article>
    </Transition>
  )
}

export default PostContent