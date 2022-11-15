import React from "react";
import Footer from "../Index/Footer";
import Header from "../Index/Header";
import { useAuthDispatch, useAuthState } from "../../Context/auth-context";
import { actionTypes } from "../../Context/reducer";
import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";

export default function Cart() {
  const { user } = useAuthState();
  const dispatch = useAuthDispatch();
  const user_id = localStorage.getItem("id");
  const [data, setData] = useState([]);
  const [products, setProducts] = useState([]);
  const [sum, setSum] = useState(0);

  function logOutHandler() {
    localStorage.removeItem("id");
    localStorage.removeItem("token");
    dispatch({
      type: actionTypes.LOGOUT,
    });
  }

  const getUserCart = async (id) => {
    const { data } = await axios.get(
      `http://localhost:5001/carts?user_id=${id}`
    );
    return data;
  };

  const getProducts = async () => {
    const { data } = await axios.get(`http://localhost:5001/products`);
    return data;
  };

  useEffect(() => {
    getUserCart(user_id).then((data) => setData(data));
  }, [user_id]);

  useEffect(() => {
    if (data) {
      getProducts().then((data) => setProducts(data));
    }
  }, [data]);

let summ = 0;
  const userCartTable = products.map((product) => {
    
    return data.map((da , index) => {
      if (da.post_id == product.id) {
        summ += product.price
        return (
          <tr key={index}>
            <td>
              <div className="media">
                <div className="d-flex" style={{ width: "100px" }}>
                  <img src={product.image} width="100%" alt="" />
                </div>
                <div className="media-body">
                  <p>{product.title}</p>
                </div>
              </div>
            </td>
            <td>
              <h5>{`$${product.price}`}</h5>
            </td>
          </tr>
        );
      }
    });
  });



  

  return (
    <>
      <Header />
      <section className="blog-banner-area" id="category">
        <div className="container h-100">
          <div className="blog-banner">
            <div className="text-center">
              <h1>{user ? `welceom ${user}` : "Dashboard"}</h1>
              <nav aria-label="breadcrumb" className="banner-breadcrumb">
                <ol className="breadcrumb">
                  <li
                    style={{ cursor: "pointer" }}
                    onClick={logOutHandler}
                    className="breadcrumb-item text-danger"
                  >
                    <span>Logout</span>
                  </li>
                </ol>
              </nav>
            </div>
          </div>
        </div>
      </section>

      <section className="cart_area">
        <div className="container">
          <h4 className="mb-4">Your Cart</h4>
          <div className="cart_inner">
            <div className="table-responsive">
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">Product</th>
                    <th scope="col">Price</th>
                  </tr>
                </thead>
                <tbody>
                  {/* this is is  */}
                  {userCartTable}
                </tbody>
              </table>

              <div className="d-flex">
                <div>Total : </div>
                <div className="text-success ml-2"> ${Math.round(summ)} </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
