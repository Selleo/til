import React from 'react'
import { useSelector } from 'react-redux'
import SearchedPhrase from './SearchedPhrase'
import PostsList from '../components/PostsList'
import NothingFound from './NothingFound'

const SearchedPosts = () => {
  const searchedPosts = useSelector(state => state.searchedPosts)
  const searchQuery = useSelector(state => state.searchQuery)

  if (!searchedPosts.length) {
    return searchQuery && <NothingFound text={searchQuery} />
  }

  return (
    <>
      <SearchedPhrase phrase={searchQuery} />
      <PostsList posts={searchedPosts} />
    </>
  )
}

export default SearchedPosts
