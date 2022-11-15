import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import Footer from "../Index/Footer";
import Header from "../Index/Header";

export default function Shop() {
  const getProducts = async () => {
    const { data } = await axios.get(`http://localhost:5001/products`);
    return await data;
  };

  const [products, setProducts] = useState([]);
  const [searchValue , setSearchValue] = useState('')
  const [currentCategory, setcurrentCategory] = useState();

  useEffect(() => {
    getProducts().then((data) => {
      setProducts(data);
    });
  }, []);

  function handleCategoryChange(e) {
    setcurrentCategory(e.target.id)
  }

  function handleAll(){
    setcurrentCategory('all')
  }

  function handleSeacrh(e){
    setSearchValue(e.target.value)
  }



const filteredData = products.filter(product => {
    if (currentCategory && product.category == currentCategory) {
        if (product.title.toLowerCase().includes(searchValue.toLowerCase())) {
          return product
        }
    } else if (!currentCategory || currentCategory === 'all'){
      if (product.title.toLowerCase().includes(searchValue.toLowerCase())) {
        return product
      }
    }
})


const outPut = filteredData.map(product => {
    return (
      <div key={product.id} className="col-md-6 col-lg-4 col-xl-3">
        <div className="card text-center card-product">
          <div className="card-product__img">
            <img className="card-img" src={product.image} alt="" />
          </div>
          <div className="card-body">
            <p>{product.category}</p>
            <h4 className="card-product__title">
              <Link to={{ pathname: "/products/" + product.id }}>
                <span href="single-product.html">{product.title}</span>
              </Link>
            </h4>
            <p className="card-product__price">{`$${product.price}`}</p>
          </div>
        </div>
      </div>
    )
})



  const catsArray = new Set();
  products.map((product) => {
    catsArray.add(product.category);
  });

  const categoryNames = [...catsArray];

  const categoryElements = categoryNames.map((cat , index) => {
    return (
      <li key={index} className="filter-list" onClick={event => handleCategoryChange(event)}>
        <input className="pixel-radio" type="radio" id={cat} name="brand" />
        <label htmlFor={cat}>{cat}</label>
      </li>
    );
  });




  return (
    <>
      <Header />
      <section className="blog-banner-area" id="category">
        <div className="container h-100">
          <div className="blog-banner">
            <div className="text-center">
              <h1>Shop</h1>
              <nav aria-label="breadcrumb" className="banner-breadcrumb">
                <ol className="breadcrumb">
                  <li className="breadcrumb-item">
                    <Link to={"/"}>Home</Link>
                  </li>
                  <li className="breadcrumb-item active" aria-current="page">
                    Shop
                  </li>
                </ol>
              </nav>
            </div>
          </div>
        </div>
      </section>

      <section className="section-margin--small mb-5">
        <div className="container">
          <div className="row">
            <div className="col-xl-3 col-lg-4 col-md-5">
              <div className="sidebar-categories">
                <div className="head">Browse Categories</div>
                <ul className="main-categories">
                  <li className="common-filter">
                    <form action="#">
                      <ul>
                      <li className="filter-list" >
                        <input onClick={handleAll} className="pixel-radio" type="radio" id='all' name="brand" />
                        <label onClick={handleAll} htmlFor='all'>All</label>
                      </li>
                      {categoryElements}
                      </ul>
                    </form>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-xl-9 col-lg-8 col-md-7">
              <div className="filter-bar d-flex flex-wrap align-items-center" style={{display:'flex' , justifyContent : 'end'}}>
                <div>
                  <div className="input-group filter-bar-search">
                    <input value={searchValue} onChange={(event) => handleSeacrh(event)} type="text" placeholder="Search" />
                    <div className="input-group-append">
                    </div>
                  </div>
                </div>
              </div>

              <section className="lattest-product-area pb-40 category-list">
                <div className="row">{outPut}</div>
              </section>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
