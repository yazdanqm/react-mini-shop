import { Link } from "react-router-dom";
export default function LastBanner(){
  return (
    <section
      className="offer"
      id="parallax-1"
      data-anchor-target="http://foofle.comparallax-1"
      data-300-top="background-position: 20px 30px"
      data-top-bottom="background-position: 0 20px"
    >
      <div className="container">
        <div className="row">
          <div className="col-xl-5">
            <div className="offer__content text-center">
              <h3>Up To 50% Off</h3>
              <h4>Winter Sale</h4>
              <p>Him she'd let them sixth saw light</p>
              <Link to={'/shop'}>
              <span
                className="button button--active mt-3 mt-xl-4"
              >
                Shop Now
              </span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
