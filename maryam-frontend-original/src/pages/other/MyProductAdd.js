import { Fragment, useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import Accordion from "react-bootstrap/Accordion";
import SEO from "../../components/seo";
import LayoutOne from "../../layouts/LayoutOne";
import Breadcrumb from "../../wrappers/breadcrumb/Breadcrumb";
const Swal = require('sweetalert2');


const MyAccount = () => {
  let { pathname } = useLocation();

  const [product, setProduct] = useState({
    sku: "",
    name: "",
    price: 0,
    discount: 0,
    new: false,
    rating: 0,
    saleCount: 0,
    category: "",
    tag: "",
    stock: 0,
    image: "",
    shortDescription: "",
    fullDescription: "",
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setProduct((prevProduct) => ({
      ...prevProduct,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios.post("http://localhost:5005/api/v1/product/addproduct", product)
      .then((response) => {
        console.log("Product added successfully:", response.data);
        
        // Show success message
        Swal.fire({
          icon: 'success',
          title: 'Product Added',
          text: 'The product has been added successfully.',
        });

        // Clear form fields
        setProduct({
          sku: "",
          name: "",
          price: 0,
          discount: 0,
          new: false,
          rating: 0,
          saleCount: 0,
          category: "",
          tag: "",
          stock: 0,
          image: "",
          shortDescription: "",
          fullDescription: "",
        });
      })
      .catch((error) => {
        console.error("Error adding product:", error);
        
        // Show error message
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'An error occurred while adding the product. Please try again.',
        });
      });
  };


  return (
    <Fragment>
      <SEO
        titleTemplate="My Account"
        description="My Account page of flone react minimalist eCommerce template."
      />
      <LayoutOne headerTop="visible">
        {/* breadcrumb */}
        <Breadcrumb 
          pages={[
            { label: "Home", path: process.env.PUBLIC_URL + "/" },
            { label: "Add Product", path: process.env.PUBLIC_URL + pathname }
          ]}
        />
        
        <div className="myaccount-area pb-80 pt-100">
          <div className="container">
            <div className="row">
              <div className="ms-auto me-auto col-lg-9">
                <div className="myaccount-wrapper">
                  <Accordion defaultActiveKey="0">
                    <Accordion.Item eventKey="0" className="single-my-account mb-20">
                      <Accordion.Header className="panel-heading">
                        <span>1 .</span> Add New Product
                      </Accordion.Header>
                      <Accordion.Body>
                        <div className="myaccount-info-wrapper">
                          <div className="account-info-wrapper">
                            <h4>Product Information</h4>
                            <h5>Fill all details</h5>
                          </div>
                          <form onSubmit={handleSubmit}>
                            <div className="row">
                              <div className="col-lg-6 col-md-6">
                                <div className="billing-info">
                                  <label>SKU</label>
                                  <input
                                    type="text"
                                    name="sku"
                                    value={product.sku}
                                    onChange={handleChange}
                                    placeholder="SKU"
                                  />
                                </div>
                              </div>
                              <div className="col-lg-6 col-md-6">
                                <div className="billing-info">
                                  <label>Product Name</label>
                                  <input
                                    type="text"
                                    name="name"
                                    value={product.name}
                                    onChange={handleChange}
                                    placeholder="Name"
                                  />
                                </div>
                              </div>
                              <div className="col-lg-6 col-md-6">
                                <div className="billing-info">
                                  <label>Price</label>
                                  <input
                                    type="number"
                                    name="price"
                                    value={product.price}
                                    onChange={handleChange}
                                    placeholder="Price"
                                  />
                                </div>
                              </div>
                              <div className="col-lg-6 col-md-6">
                                <div className="billing-info">
                                  <label>Discount</label>
                                  <input
                                    type="number"
                                    name="discount"
                                    value={product.discount}
                                    onChange={handleChange}
                                    placeholder="Discount"
                                  />
                                </div>
                              </div>
                              <div className="col-lg-6 col-md-6">
                                <div className="billing-info">
                                  <label>New</label>
                                  <input
                                    type="checkbox"
                                    name="new"
                                    checked={product.new}
                                    onChange={handleChange}
                                  />
                                </div>
                              </div>
                              <div className="col-lg-6 col-md-6">
                                <div className="billing-info">
                                  <label>Rating</label>
                                  <input
                                    type="number"
                                    name="rating"
                                    value={product.rating}
                                    onChange={handleChange}
                                    placeholder="Rating"
                                  />
                                </div>
                              </div>
                              <div className="col-lg-6 col-md-6">
                                <div className="billing-info">
                                  <label>Sale Count</label>
                                  <input
                                    type="number"
                                    name="saleCount"
                                    value={product.saleCount}
                                    onChange={handleChange}
                                    placeholder="Sale Count"
                                  />
                                </div>
                              </div>
                              <div className="col-lg-6 col-md-6">
                                <div className="billing-info">
                                  <label>Category</label>
                                  <input
                                    type="text"
                                    name="category"
                                    value={product.category}
                                    onChange={handleChange}
                                    placeholder="Category (comma separated)"
                                  />
                                </div>
                              </div>
                              <div className="col-lg-6 col-md-6">
                                <div className="billing-info">
                                  <label>Tag</label>
                                  <input
                                    type="text"
                                    name="tag"
                                    value={product.tag}
                                    onChange={handleChange}
                                    placeholder="Tag (comma separated)"
                                  />
                                </div>
                              </div>
                              <div className="col-lg-6 col-md-6">
                                <div className="billing-info">
                                  <label>Stock</label>
                                  <input
                                    type="number"
                                    name="stock"
                                    value={product.stock}
                                    onChange={handleChange}
                                    placeholder="Stock"
                                  />
                                </div>
                              </div>
                              <div className="col-lg-6 col-md-6">
                                <div className="billing-info">
                                  <label>Short Description</label>
                                  <textarea
                                    name="shortDescription"
                                    value={product.shortDescription}
                                    onChange={handleChange}
                                    placeholder="Short Description"
                                  />
                                </div>
                              </div>
                              <div className="col-lg-6 col-md-6">
                                <div className="billing-info">
                                  <label>Full Description</label>
                                  <textarea
                                    name="fullDescription"
                                    value={product.fullDescription}
                                    onChange={handleChange}
                                    placeholder="Full Description"
                                  />
                                </div>
                              </div>
                              <div className="col-lg-6 col-md-6">
                                <div className="billing-info">
                                  <label>Image</label>
                                  <input
                                    type="text"
                                    name="image"
                                    value={product.image}
                                    onChange={handleChange}
                                    placeholder="Image URLs (comma separated)"
                                  />
                                </div>
                              </div>
                            </div>
                            <div className="billing-back-btn">
                              <div className="billing-btn">
                                <button type="submit">Submit</button>
                              </div>
                            </div>
                          </form>
                        </div>
                      </Accordion.Body>
                    </Accordion.Item>
                  </Accordion>
                </div>
              </div>
            </div>
          </div>
        </div>
      </LayoutOne>
    </Fragment>
  );
};

export default MyAccount;