import React, { useState } from "react";
import Loading from "react-fullscreen-loading";
import Footer from "../Index/Footer";
import Header from "../Index/Header";
import axios from "axios";
import { useEffect } from "react";
import { useAuthDispatch, useAuthState } from "../../Context/auth-context";
import { actionTypes } from "../../Context/reducer";
import { useLayoutEffect } from "react";
import { Link } from "react-router-dom";


export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [token, setToken] = useState("");
  const [id, setId] = useState("");
  const [users, setUsers] = useState("");
  const dispatch = useAuthDispatch();
  const { loading , error } = useAuthState();

  const getUsers = async () => {
    const { data } = await axios.get(`http://localhost:5001/users`);
    setUsers(data);
  };

  const getUser = async (id) => {
    const { data } = await axios.get(`http://localhost:5001/users?id=${id}`);
    return data;
  };

  useEffect(() => {
    getUsers();
  }, []);

  function handleSubmit(e) {
    e.preventDefault();

    dispatch({
      type: actionTypes.LOGIN_REQUEST,
    });

    const current = users.filter((user) => {
      if (user.username === username && user.password === password) {
        return user;
      }
    });

    if (current.length > 0) {
      setToken(current[0].token);
      setId(current[0].id);
    } else {
      console.log('login error');
      dispatch({
        type: actionTypes.LOGIN_ERROR,
        payload: {
          error : 'username and password are not correct'
        }
      })
    }
  }

  useLayoutEffect(() => {
    const token = localStorage.getItem("token");
    const id = localStorage.getItem("id");
    if (token) {
      dispatch({
        type: actionTypes.LOGIN_REQUEST,
      });
      setToken(token);
      setId(id);
    }
  }, [dispatch]);

  useEffect(() => {
    if (token) {
      getUser(id).then((data) => {
        localStorage.setItem("token", token);
        localStorage.setItem("id", id);
        dispatch({
          type: actionTypes.LOGIN_SUCCESS,
          payload: {
            user: data[0].username,
            token,
          },
        });
      });
    }
  }, [token, id , dispatch]);

  return (
    <>
      {loading ? (
        <Loading loading background="#fff" loaderColor="#384aeb" />
      ) : (
        <>
          <Header />
          <section className="blog-banner-area" id="category">
            <div className="container h-100">
              <div className="blog-banner">
                <div className="text-center">
                  <h1>Login</h1>
                  <nav aria-label="breadcrumb" className="banner-breadcrumb">
                    <ol className="breadcrumb">
                      <li className="breadcrumb-item">
                        <Link to={"/"}>
                          <span href="http://foofle.com">Home</span>
                        </Link>
                      </li>
                      <li
                        className="breadcrumb-item active"
                        aria-current="page"
                      >
                        Login
                      </li>
                    </ol>
                  </nav>
                </div>
              </div>
            </div>
          </section>

          <section className="login_box_area section-margin">
            <div className="container">
              <div className="row">
                <div className="col-lg-6">
                  <div className="login_box_img">
                    <div className="hover">
                      <h4>want to login?</h4>
                      <p>enter your username and password</p>
                      <p>username:yazdan / password :1234</p>
                    </div>
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="login_form_inner">
                    <h3>Log in to enter</h3>
                    <form
                      className="row login_form"
                      onSubmit={handleSubmit}
                      id="contactForm"
                    >
                      <div className="col-md-12 form-group">
                        <input
                          value={username}
                          onChange={(e) => {
                            setUsername(e.target.value);
                          }}
                          type="text"
                          className="form-control"
                          id="name"
                          name="name"
                          placeholder="Username"
                        />
                      </div>
                      <div className="col-md-12 form-group">
                        <input
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          type="password"
                          className="form-control"
                          id="name"
                          name="name"
                          placeholder="Password"
                        />
                      </div>
                      <div className="col-md-12 form-group">
                        <div className="creat_account">
                          <label>
                            Your information will be automatically saved for
                            Next Time !
                          </label>
                        </div>
                      </div>
                      <span>{token}</span>
                      <div className="col-md-12 form-group">
                        <button
                          type="submit"
                          value="submit"
                          className="button button-login w-100"
                        >
                          Log In
                        </button>
                      </div>
                    </form>
                    {error ? <span className="text-danger">{error}</span> : ""}
                  </div>
                </div>
              </div>
            </div>
          </section>
          <Footer />
        </>
      )}
    </>
  );
}
