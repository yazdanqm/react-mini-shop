export default function LastProducts({products}){
  return (
    <section className="section-margin calc-60px">
      <div className="container">
        <div className="section-intro pb-60px">
          <p>New arrivals in the market</p>
          <h2>
            Latest <span className="section-intro__style">Products</span>
          </h2>
        </div>
        <div className="row">
          {products}
        </div>
      </div>
    </section>
  )
}
