import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { saveSearchedPosts, saveSearchedQuery } from '../store/actions/actions'
import { useOnRouteLeave } from '../utils/customHooks/useOnRouteLeave'
import { ReactComponent as SearchIcon } from '../assets/icons/search.svg'
import { useDisableActionOnRouteWithMessage } from '../utils/customHooks/useDisableActionOnRouteWithMessage'

const Search = () => {
  const [input, setInput] = useState('')
  const [timeoutID, setTimeoutID] = useState(null)
  const dispatch = useDispatch()
  const history = useHistory()
  const hasLeavedRoute = useOnRouteLeave('/search')

  const { isDisabled, notifyMessage } = useDisableActionOnRouteWithMessage(
    ['add', 'edit'],
    "Can't search while post is creating/editing"
  )

  useEffect(() => {
    if (hasLeavedRoute) {
      dispatch(saveSearchedQuery(''))
      setInput('')
    }
  }, [hasLeavedRoute, dispatch])

  useEffect(() => {
    if (!input.length) {
      history.push('/')
    }
  }, [input, history])

  const handleInput = event => {
    const targetValue = event.target.value

    setInput(targetValue)
    clearTimeout(timeoutID)

    if (targetValue) {
      const timeout = setTimeout(() => {
        history.push('/search')

        dispatch(saveSearchedPosts(targetValue))
      }, 300)
      setTimeoutID(timeout)
    }
  }

  return (
    <div className="search-box" onClick={notifyMessage}>
      <input
        className="search-box__input"
        type="text"
        placeholder="Search"
        value={input}
        disabled={isDisabled}
        onChange={handleInput}
      />

      <SearchIcon className="search-box__icon" />
    </div>
  )
}

export default Search
