import React, { Fragment, useState, useEffect } from "react";
import axios from "axios";
import { useParams, useLocation } from "react-router-dom";
import SEO from "../../components/seo";
import LayoutOne from "../../layouts/LayoutOne";
import Breadcrumb from "../../wrappers/breadcrumb/Breadcrumb";
import ProductDescriptionTab from "../../wrappers/product/ProductDescriptionTab";
import ProductImageDescription from "../../wrappers/product/ProductImageDescription";

const Product = () => {
  let { pathname } = useLocation();
  let { id } = useParams(); // Extract the product ID from the URL parameters

  const [product, setProduct] = useState(null); // Initialize state to store the product

  // Function to fetch product by ID
  const fetchProductById = async (productId) => {
    try {
      const response = await axios.get(`http://localhost:5005/api/v1/product/getproduct/${productId}`);
      const productData = response.data;

      // Transform the product data
      const transformedProduct = {
        id: productData.id.toString(),  // Convert id to string
        sku: productData.sku,
        name: productData.name,
        price: parseFloat(productData.price),  // Ensure price is a float
        discount: parseFloat(productData.discount || 0),  // Default to 0 if discount is null
        new: productData.new === 1,  // Convert 1 to true and 0 to false
        rating: parseFloat(productData.rating),  // Ensure rating is a float
        saleCount: productData.saleCount ? parseInt(productData.saleCount, 10) : 0,  // Default to 0 if saleCount is null, ensure it's an integer
        category: Array.isArray(productData.category)
          ? productData.category.map(cat => cat.toLowerCase())
          : [productData.category.toLowerCase()],  // Ensure category is an array and convert to lowercase
        tag: productData.tag ? productData.tag.split(',').map(tag => tag.trim()) : [],  // Convert tag string to an array
        stock: parseInt(productData.stock, 10),  // Ensure stock is an integer
        image: Array.isArray(productData.image)
          ? productData.image
          : [productData.image],  // Ensure image is an array
        shortDescription: productData.short_description,
        fullDescription: productData.full_description
      };

      setProduct(transformedProduct); // Set the transformed product to state
      console.log("Transformed Product:", transformedProduct); // For debugging
    } catch (error) {
      console.error("Failed to fetch product:", error);
    }
  };

  // useEffect to fetch the product when the component mounts
  useEffect(() => {
    fetchProductById(id); // Fetch the product by ID when the component mounts
  }, [id]); // Re-run the effect if the product ID changes

  return (
    <Fragment>
      <SEO
        titleTemplate="Product Page"
        description="Product Page of flone react minimalist eCommerce template."
      />

      <LayoutOne headerTop="visible">
        {/* Breadcrumb */}
        <Breadcrumb
          pages={[
            { label: "Home", path: process.env.PUBLIC_URL + "/" },
            { label: "Shop Product", path: process.env.PUBLIC_URL + pathname }
          ]}
        />

        {/* Product description with image */}
        {product && (
          <>
            <ProductImageDescription
              spaceTopClass="pt-100"
              spaceBottomClass="pb-100"
              product={product}
            />

            {/* Product description tab */}
            <ProductDescriptionTab
              spaceBottomClass="pb-90"
              productFullDesc={product.fullDescription}
              productId={product.id}
            />
          </>
        )}
      </LayoutOne>
    </Fragment>
  );
};

export default Product;