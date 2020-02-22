import React from 'react'
import {Route, IndexRedirect} from 'react-router'
import AuthService from 'utils/AuthService'
import Container from './Container'
import Home from './Home/Home'
import Login from './Login/Login'
import Profile from './Profile/Profile'
import Instructor from './Instructor/Instructor'
import NewInstructor from './NewInstructor/NewInstructor'

const auth = new AuthService()

// onEnter callback to validate authentication in private routes
const requireAuth = (nextState, replace) => {
  if (!auth.isAuthenticated()) {
    replace({ pathname: '/login' })
  }
}

const requireAdmin = (nextState, replace) => {
  if (!auth.isAuthenticated() || !auth.isAdmin()) {
    replace({ pathname: '/login' })
  }
}

//here auth is provided to Main Container route to get the instance of the route across all the components
// Where is in components we are also importing the authservice just to define proptypes which are coming form
//parent component 

export const makeMainRoutes = () => {
  return (
    <Route path="/" component={Container} auth={auth}>
      <IndexRedirect to="/home" />
      <Route path="home" component={Home} />
      <Route path="login" component={Login} />
      <Route path="profile" component={Profile} onEnter={requireAuth} />
      <Route path="instructor" component={Instructor} onEnter={requireAuth} />
      <Route path="instructor/new" component={NewInstructor} onEnter={requireAdmin} />
    </Route>
  )
}

export default makeMainRoutes
