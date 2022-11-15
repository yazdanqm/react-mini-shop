import { Link } from "react-router-dom";
export default function Post({product}){
  return(
    <div key={product.id} className="col-md-6 col-lg-4 col-xl-3">
      <div className="card text-center card-product">
        <div className="card-product__img">
          <img className="card-img" src={product.image} alt="" />
        </div>
        <div className="card-body">
          <p>{product.category}</p>
          <h4 className="card-product__title">
            <Link to={"products/" + product.id}>
              <span href="single-product.html">{product.title}</span>
            </Link>
          </h4>
          <p className="card-product__price">{`$${product.price}`}</p>
        </div>
      </div>
    </div>
  )
}
