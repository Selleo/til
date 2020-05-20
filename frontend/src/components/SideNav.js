import React from 'react'
import Categories from '../components/Categories'
import Search from './Search'
import StyledSideNav from '../styles/StyledSideNav'

const SideNav = () => (
  <StyledSideNav>
    <ul>
      <li>
        <div className="search-box">
          <Search />
        </div>
      </li>
      <li>Users</li>
      <li>Stats </li>
    </ul>
    <div className="post-categories">
      <Categories />
    </div>
  </StyledSideNav>
)

export default SideNav