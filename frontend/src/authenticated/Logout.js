import React from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { deleteToken } from "../utils";
import { logOut } from "../store/actions/actions";

const Logout = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const logOutHandler = () => {
    deleteToken();
    dispatch(logOut());
    history.push("/");
  };

  return <p onClick={logOutHandler}>Log Out</p>;
};

export default Logout;
