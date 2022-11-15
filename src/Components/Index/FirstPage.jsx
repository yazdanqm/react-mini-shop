import React from "react";
import Header from "./Header";
import Banner from './Banner'
import LastProducts from './LastProducts'
import LastBanner from './LastBanner'
import Post from "./Post"
import Footer from "./Footer";
import { useState } from "react";
import { useEffect } from "react";
import {getProducts} from './getProducts'

export default function FirstPage() {

  const [products, setProducts] = useState([]);

  useEffect(() => {
    getProducts().then(data => {
      setProducts(data)
    });
  }, []);

  const DisplayProducts = products.map((product) =>
    {
    return (
      <Post product={product} />
    );
    }
  );

  return (
    <>
      <Header />
      <main className="site-main">
        <Banner />
        <LastProducts products={DisplayProducts} />
        <LastBanner />
      </main>
      <Footer />
    </>
  );
}
