import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const SideBar = props => {
  const user = useSelector(state => state.currentUser);

  return (
    <nav className="side-nav-bar">
      <ul className="side-nav-bar-list">
        {!user && (
          <li>
            <a href="http://localhost:4000/auth/google">login</a>
          </li>
        )}
        <li>
          <Link to="/">home</Link>
        </li>
        <li> search </li>
        <li>
          <Link to="/stats"> stats</Link>
        </li>
        <li>
          <Link to="/random-post"> random</Link>
        </li>
        <li>
          <Link to="/categories"> categories</Link>
        </li>
      </ul>
    </nav>
  );
};

export default SideBar;
