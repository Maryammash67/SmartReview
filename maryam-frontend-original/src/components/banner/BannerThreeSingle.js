import PropTypes from "prop-types";
import clsx from "clsx"
import { Link } from "react-router-dom";

const BannerThreeSingle = ({ data, spaceBottomClass }) => {
  return (
    <div className={clsx("single-banner-2", spaceBottomClass)}>
      <Link to={process.env.PUBLIC_URL + data.link}>
        <img src={process.env.PUBLIC_URL + data.image} alt="" />
      </Link>
      <div className="banner-content-2">
        <h3>{data.title}</h3>
        <h4 style={{color: "white"}}>
          {data.subtitle} <span>{data.price}</span>
        </h4>
        <Link style={{color: "white"}} to={process.env.PUBLIC_URL + data.link}>
          <i className="fa fa-long-arrow-right" />
        </Link>
      </div>
    </div>
  );
};

BannerThreeSingle.propTypes = {
  data: PropTypes.shape({}),
  spaceBottomClass: PropTypes.string
};

export default BannerThreeSingle;
