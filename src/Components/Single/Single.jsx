import axios from "axios";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { useAuthState } from "../../Context/auth-context";
import Footer from "../Index/Footer";
import Header from "../Index/Header";

export default function Single(props) {
  const { id } = useParams();
  const [product, setProduct] = useState({});
  const { token } = useAuthState();
  const user_id = localStorage.getItem("id");
  const [added, setAdded] = useState(false);
  

  const getProduct = async (id) => {
    const { data } = await axios.get(`http://localhost:5001/products?id=${id}`);
    return data;
  };

  const addToCart = async (post_id, user_id) => {
    await axios
      .post("http://localhost:5001/carts", {
        post_id,
        user_id,
      })
      .then(function (response) {
        if (response.status === 201) {
          setAdded(true);
        }
      });
  };

  useEffect(() => {
    getProduct(id).then((data) => {
      setProduct(data[0]);
    });
  }, [id]);

  function handleAddToCart() {
    addToCart(id, user_id);
  }

  return (
    <>
      <Header />
      <section className="blog-banner-area" id="blog">
        <div className="container h-100">
          <div className="blog-banner">
            <div className="text-center">
              <h1>{product.title}</h1>
              <nav aria-label="breadcrumb" className="banner-breadcrumb">
                <ol className="breadcrumb">
                  <li className="breadcrumb-item">
                    <a href="#">Home</a>
                  </li>
                  <li className="breadcrumb-item active" aria-current="page">
                    {product.title}
                  </li>
                </ol>
              </nav>
            </div>
          </div>
        </div>
      </section>

      <div className="product_image_area" style={{ marginBottom: "120px" }}>
        <div className="container">
          <div className="row s_product_inner">
            <div className="col-lg-6">
              <div className="single-prd-item">
                <img className="img-fluid" src={product.image} alt="" />
              </div>
            </div>
            <div className="col-lg-5 offset-lg-1">
              <div className="s_product_text">
                <h3>{product.title}</h3>
                <h2>{`$${product.price}`}</h2>
                <ul className="list">
                  <li>
                    <span>Category</span> : {product.category}
                  </li>
                  <li>
                    <span>Availibility</span> : In Stock
                  </li>
                </ul>
                <p>{product.description}</p>
                <div className="product_count">
                  {token ? (
                    <span
                      onClick={handleAddToCart}
                      className="button primary-btn"
                      style={{ cursor: "pointer" }}
                    >
                      Add to Cart
                    </span>
                  ) : (
                    <>
                      <span className="text-danger">
                        You should login for adding a product to cart
                      </span>
                      <Link to={"/login"}>
                        <span
                          className="button primary-btn mt-4"
                          style={{ cursor: "pointer" }}
                        >
                          Login to your account
                        </span>
                      </Link>
                    </>
                  )}
                  {added ? (
                    <div className="text-success mt-2">
                      Item successfully added to you cart
                    </div>
                  ) : (
                    ""
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}
