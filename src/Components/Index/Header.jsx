import axios from "axios";
import React from "react";
import { useLayoutEffect } from "react";
import { useState } from "react";
import Loading from "react-fullscreen-loading";
import { Link } from "react-router-dom";
import { useAuthDispatch, useAuthState } from "../../Context/auth-context";
import { actionTypes } from "../../Context/reducer";

export default function Header() {
  const { token } = useAuthState();
  const localToken = localStorage.getItem("token");
  const id = localStorage.getItem("id");
  const dispatch = useAuthDispatch();
  const [loading, setLoading] = useState(false);

  const getUser = async (id) => {
    const { data } = await axios.get(`http://localhost:5001/users?id=${id}`);
    return data;
  };

  useLayoutEffect(() => {
    if (!token && localToken && id) {
      setLoading(true);
      getUser(id).then((data) => {
        dispatch({
          type: actionTypes.LOGIN_SUCCESS,
          payload: {
            user: data[0].username,
            token: localToken,
          },
        });
      });

      setTimeout(() => {
        setLoading(false);
      }, 500);
    }
  }, [token, dispatch, id, localToken]);

  return (
    <>
      {loading ? (
        <Loading loading background="#fff" loaderColor="#384aeb" />
      ) : (
        <header className="header_area">
          <div className="main_menu">
            <nav className="navbar navbar-expand-lg navbar-light">
              <div className="container">
                <Link to="/">
                  <span className="navbar-brand logo_h">
                    <img src={require("../../img/logo.png")} alt="" />
                  </span>
                </Link>
                <button
                  className="navbar-toggler"
                  type="button"
                  data-toggle="collapse"
                  data-target="http://foofle.comnavbarSupportedContent"
                  aria-controls="navbarSupportedContent"
                  aria-expanded="false"
                  aria-label="Toggle navigation"
                >
                  <span className="icon-bar"></span>
                  <span className="icon-bar"></span>
                  <span className="icon-bar"></span>
                </button>
                <div
                  className="collapse navbar-collapse offset"
                  id="navbarSupportedContent"
                >
                  <ul className="nav navbar-nav menu_nav ml-auto mr-auto">
                    <li className="nav-item active">
                      <Link to={"/"}>
                        <span className="nav-link">Home</span>
                      </Link>
                    </li>
                    <li className="nav-item submenu dropdown">
                      <Link to={"/shop"}>
                        <span
                          className="nav-link dropdown-toggle"
                          data-toggle="dropdown"
                          role="button"
                          aria-haspopup="true"
                          aria-expanded="false"
                        >
                          Shop
                        </span>
                      </Link>
                    </li>

                  </ul>

                  <ul className="nav-shop">
                    <li className="nav-item">
                      {token ? (
                        <>
                          <Link to="/dashboard">
                            <span className="button button-header">
                              dashboard
                            </span>
                          </Link>
                        </>
                      ) : (
                        <Link to="/login">
                          <span className="button button-header">Login</span>
                        </Link>
                      )}
                    </li>
                  </ul>
                </div>
              </div>
            </nav>
          </div>
        </header>
      )}
    </>
  );
}
