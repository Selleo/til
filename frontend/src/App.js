import React, { useEffect } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import {
  saveAllCategories,
  saveCurrentUser,
  saveAllUsers,
  saveAllPosts,
} from './store/actions/actions'
import AuthenticatedApp from './authenticated'
import AuthHandler from './components/AuthHandler'
import NonAuthenticatedApp from './nonAuthenticated'
import useUser from './utils/customHooks/useUser'
import ScrollToTop from './components/ScrollToTop'
// needed for styling that has not been changed yet
import './App.css'
import './devicon.css'
import './assets/stylesheets/application.sass'
import 'react-tippy/dist/tippy.css'

const App = () => {
  const dispatch = useDispatch()
  const currentUser = useUser()

  useEffect(() => {
    dispatch(saveAllPosts())
    dispatch(saveCurrentUser())
    dispatch(saveAllCategories())
    dispatch(saveAllUsers())
  }, [dispatch])

  const renderApp = currentUser ? <AuthenticatedApp /> : <NonAuthenticatedApp />

  return (
    <Router>
      <div className="app-main" data-testid="app-main">
        <ScrollToTop />
        {renderApp}
        <Route path="/auth">
          <AuthHandler />
        </Route>
      </div>
    </Router>
  )
}

export default App
