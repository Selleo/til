import React, { useState, useEffect } from 'react'
import 'react-mde/lib/styles/css/react-mde-all.css'
import { request, fetchSinglePost, convertToSelectOptions } from '../utils'
import { useHistory, useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { saveCurrentUser, saveAllPosts } from '../store/actions/actions'
import PostPreview from '../authenticated/PostPreview'
import ReactMde from 'react-mde'
import Select from 'react-select'
import customStyles from '../styles/ReactSelectCustomStyles/customStyles'
import postSuccessToast from '../utils/toasts/postSuccessToast'
import PostSeparator from '../components/UI/PostSeparator'
import { Transition } from '../components/Transition'

const { REACT_APP_API_URL: API_URL } = process.env

const EditPost = () => {
  const [buttonState, setButtonState] = useState(true)
  const [markdown, setMarkdown] = useState('')
  const [title, setTitle] = useState('')
  // user categories as strings
  const [categories, setCategories] = useState([])
  // select friendly categories used to pass to select options
  const [categoriesOptions, setCategoriesOptions] = useState('')
  // select friendly user options
  const [userCategoriesOptions, setUserCategoriesOptions] = useState([])
  // allCategories from redux in form {id: 1, name: "java"}
  const allCategories = useSelector(state => state.categories)
  const dispatch = useDispatch()
  const history = useHistory()
  const { id } = useParams()

  useEffect(() => {
    const fetchPost = async () => {
      const post = await fetchSinglePost(`${API_URL}/api/posts/`, id)

      setMarkdown(post.body)
      setTitle(post.title)
      setCategories(post.categories)
    }

    fetchPost()
  }, [id])

  useEffect(() => {
    setCategoriesOptions(convertToSelectOptions(allCategories))
  }, [allCategories])

  useEffect(() => {
    const userCategories = allCategories.filter(category =>
      categories.find(({ name }) => name.includes(category.name))
    )

    const userCategoriesOptions = convertToSelectOptions(userCategories)

    setUserCategoriesOptions(userCategoriesOptions)
  }, [allCategories, categories])

  const updatePost = async () => {
    const markdownPost = {
      body: markdown,
      title: title,
      categories: categories.map(el => el.name),
    }

    const post = await request(
      'PATCH',
      `${API_URL}/api/me/posts/${id}`,
      JSON.stringify(markdownPost)
    )

    if (post.ok) {
      dispatch(saveAllPosts())
      dispatch(saveCurrentUser())
      history.push(`/posts/${id}`)
      postSuccessToast('Post updated successfully')
    }
  }

  const handleInput = input => {
    setMarkdown(input)
  }

  const handleTitle = event => {
    setButtonState(false)

    setTitle(event.target.value)
  }

  const handleSelect = selectedOptions => {
    setButtonState(false)

    if (!selectedOptions) {
      setCategories([])

      return
    }

    const categories = selectedOptions.map(el => ({
      id: el.value,
      name: el.label,
      url: el.url,
    }))

    setCategories(categories)
  }

  const handleCancel = () => {
    history.push('/')
  }

  useEffect(() => {
    if (markdown.length && title && categories.length) {
      setButtonState(false)
    } else {
      setButtonState(true)
    }
  }, [markdown, title, categories])

  return (
    <Transition name="post-animation">
      <>
        <div className="add-post-container">
          <div className="add-post__post-create">
            <div className="add-post__header">Update your post</div>
            <form>
              <label className="form-label">
                Title
                <input
                  className="add-post__title"
                  type="text"
                  name="name"
                  placeholder="Title"
                  value={title}
                  onChange={handleTitle}
                />
              </label>
            </form>
            <label className="form-label">
              Description
              <ReactMde
                classes={{
                  toolbar: 'no-show',
                  textArea: 'text-area',
                  reactMde: 'react-mde',
                  grip: 'grip',
                }}
                onChange={handleInput}
                textAreaProps={{
                  placeholder: 'Write away...',
                }}
                value={markdown}
              />
            </label>
            <Select
              isMulti
              name="colors"
              value={userCategoriesOptions}
              options={categoriesOptions}
              onChange={handleSelect}
              styles={customStyles}
            />
          </div>
          <PostSeparator />
          <PostPreview
            categories={categories}
            title={title || 'Your title'}
            body={markdown || 'Your content'}
          />
        </div>
        <div className="buttons">
          <button onClick={handleCancel} className="buttons__button-cancel">
            Cancel
          </button>
          <button
            className="buttons__button-primary"
            disabled={buttonState}
            onClick={updatePost}
          >
            Update Post
          </button>
        </div>
      </>
    </Transition>
  )
}

export default EditPost
