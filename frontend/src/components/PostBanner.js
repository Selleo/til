import React from 'react'
import LogoSelleo from './LogoSelleo'
import { Transition } from './Transition'

const PostBanner = props => {
  const { postCategory } = props

  if (!postCategory) {
    return null
  }

  const { url, firstText, secondText } = postCategory

  if (!url) {
    return null
  }

  return (
    <Transition name="opacity-animation">
      <div className="post-banner">
        <header className="post-banner__header">
          <img
            className="post-banner__bg"
            src={`${process.env.PUBLIC_URL}/assets/images/banner-bg.svg`}
            alt="banner"
          />

          <LogoSelleo className="post-banner__logo" />

          <div className="post-banner__headers">
            <h3>{firstText}</h3>
            <h3>{secondText}</h3>
          </div>

          <a
            href={url}
            rel="noopener noreferrer"
            target="_blank"
            className="post-banner__learn-more"
          >
            learn more
          </a>
        </header>
      </div>
    </Transition>
  )
}

export default PostBanner
