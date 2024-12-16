import PropTypes from "prop-types";
import React, { Fragment , useState , useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { getProducts } from "../../helpers/product";
import ProductGridSingleThree from "../../components/product/ProductGridSingleThree";

const ProductGridThree = ({
  spaceBottomClass,
  category,
  type,
  limit
}) => {
  const { products } = useSelector((state) => state.product);
  const currency = useSelector((state) => state.currency);
  const { cartItems } = useSelector((state) => state.cart);
  const { wishlistItems } = useSelector((state) => state.wishlist);
  const { compareItems } = useSelector((state) => state.compare);


  const [newProduct, setProducts] = useState([]);

  useEffect(() => {
    // Function to fetch products
    const fetchProducts = async () => {
      console.log("prod from system", products);
      try {
        const response = await axios.get('http://localhost:5005/api/v1/product/getallproducts');
        console.log("API responce:", response.data);
        const transformedProducts = response.data.map(product => ({
          id: product.id.toString(), // Converts the ID to a string
          sku: product.sku, // Uses the SKU as is
          name: product.name, // Uses the product name as is
          price: parseFloat(product.price), // Converts the price to a float
          discount: parseFloat(product.discount), // Converts the discount to a float
          new: !!product.new, // Converts 1/0 to true/false
          rating: parseInt(product.rating), // Converts the rating to an integer
          saleCount: product.saleCount !== null ? parseInt(product.saleCount) : 0, // Converts saleCount to an integer, defaults to 0 if null
          category: [product.category.toLowerCase()], // Converts the category to lowercase and wraps it in an array
          tag: product.tag ? product.tag.split(',').map(tag => tag.trim()) : [], // Splits the tags into an array and trims spaces
          stock: parseInt(product.stock), // Converts the stock to an integer
          image: [product.image], // Wraps the image URL in an array
          shortDescription: product.short_description, // Maps the short description
          fullDescription: product.full_description // Maps the full description
        }));
        
        console.log(transformedProducts);
        
        
       
        console.log("Products fetched and transformed successfully:", transformedProducts);

        setProducts(transformedProducts);
      } catch (err) {
        console.error("Error fetching products:", err);
      }
    };
  
    fetchProducts();

  }, []);
  
  
  

  // const newProduct = [
  //   {
  //     "id": "10",
  //     "sku": "asdf132",
  //     "name": "Lorem ipsum blender",
  //     "price": 15.6,
  //     "discount": 0,
  //     "new": false,
  //     "rating": 4,
  //     "saleCount": 90,
  //     "category": ["electronics"],
  //     "tag": ["electronics"],
  //     "stock": 15,
  //     "image": [
  //       "/assets/img/product/electronics/1.jpg",
  //       "/assets/img/product/electronics/2.jpg",
  //       "/assets/img/product/electronics/3.jpg",
  //       "/assets/img/product/electronics/4.jpg",
  //       "/assets/img/product/electronics/5.jpg"
  //     ],
  //     "shortDescription": "Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur.",
  //     "fullDescription": "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt."
  //   },
  // ]



  const prods = getProducts(newProduct, category, type, limit);
  console.log("pods",prods);
  return (
    <Fragment>
      {prods?.map(product => { 
        return (
          <div className="custom2-col-5" key={product.id}>
            <ProductGridSingleThree
              spaceBottomClass={spaceBottomClass}
              product={product}
              currency={currency}
              cartItem={
                cartItems.find(cartItem => cartItem.id === product.id)
              }
              wishlistItem={
                wishlistItems.find(
                  wishlistItem => wishlistItem.id === product.id
                )
              }
              compareItem={
                compareItems.find(
                  compareItem => compareItem.id === product.id
                )
              }
            />
          </div>
        );
      })}
    </Fragment>
  );
};

ProductGridThree.propTypes = {
  spaceBottomClass: PropTypes.string,
};


export default ProductGridThree;