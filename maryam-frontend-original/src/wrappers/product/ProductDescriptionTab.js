import React, { Fragment, useState, useEffect } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import Tab from "react-bootstrap/Tab";
import Nav from "react-bootstrap/Nav";
import { Pie } from "react-chartjs-2";
import 'chart.js/auto';
import Chatbot from "./Chatbot";
import axios from "axios";
import Cookies from 'js-cookie';
const Swal = require('sweetalert2');

const ProductDescriptionTab = ({ spaceBottomClass, productFullDesc, productId }) => {

    // State for adding a review
    const [rating, setRating] = useState("");
    const [review, setReview] = useState("");

    // State for fetched reviews
    const [reviewData, setReviewData] = useState({
        review_count: 0,
        average_rating: 0,
        reviews: [],
    });

    const [aiSummary, setAiSummary] = useState("");


    const data = {
        labels: ['Positive Review %', 'Negative Review %'],
        datasets: [
            {
                label: 'Reviews',
                data: [72, 28],
                backgroundColor: [
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(255, 99, 132, 0.2)',
                ],
                borderColor: [
                    'rgba(75, 192, 192, 1)',
                    'rgba(255, 99, 132, 1)',
                ],
                borderWidth: 1,
            },
        ],
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const token = Cookies.get('token');

        try {
            const response = await axios.post("http://localhost:5005/api/v1/review/addreview", {
                product_id: productId,
                rating: parseFloat(rating),
                comment: review,
            },
                {
                    headers: {
                        Authorization: `Bearer ${token}`, // Send the token in the Authorization header
                    },
                }
            );

            console.log("Review added:", response.data);

            Swal.fire({
                icon: 'success',
                title: 'Review Added',
                text: 'Review added successfully.',
            });

            // Clear form fields
            setRating("");
            setReview("");
        } catch (error) {
            console.error("Error adding review:", error);
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Error adding review. First, you need to log in to the system.',
            });
        }
    };

    const fetchAiSummary = async (reviews) => {
        try {
            const response = await axios.post("http://127.0.0.1:5000/summarybot", {
                reviews: reviews,
            });
            setAiSummary(response.data.summary);

        } catch (error) {
            console.error("Error fetching AI summary:", error);
        }
    };


    // Fetch reviews when component mounts or productId changes
    useEffect(() => {
        const fetchReviews = async () => {
            try {
                const response = await axios.get(`http://localhost:5005/api/v1/review/product/${productId}/reviews`);
                console.log("pppp", response.data);
                setReviewData(response.data);

                // Fetch AI summary after reviews are loaded
                if (response.data.reviews.length > 0) {
                    fetchAiSummary(response.data.reviews.map(review => review.comment));
                }

            } catch (err) {
                console.error("Error fetching product reviews:", err);

            }
        };

        fetchReviews();
    }, [productId]);


    return (
        <div className={clsx("description-review-area", spaceBottomClass)}>
            <div className="container">
                <div className="description-review-wrapper">
                    <Tab.Container defaultActiveKey="productDescription">
                        <Nav variant="pills" className="description-review-topbar">
                            <Nav.Item>
                                <Nav.Link eventKey="additionalInfo">Additional Information</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link eventKey="productDescription">Description</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link eventKey="productReviews">Reviews</Nav.Link>
                            </Nav.Item>
                        </Nav>
                        <Tab.Content className="description-review-bottom">
                            <Tab.Pane eventKey="additionalInfo">
                                <div className="product-anotherinfo-wrapper">
                                    <ul>
                                        <li><span>Weight</span></li>
                                        <li><span>Dimensions</span> </li>
                                        <li><span>Materials</span> </li>
                                        <li><span>Other Info</span></li>
                                    </ul>
                                </div>
                            </Tab.Pane>
                            <Tab.Pane eventKey="productDescription">
                                {productFullDesc}
                            </Tab.Pane>
                            <Tab.Pane eventKey="productReviews">
                                <div className="row">
                                    <div className="col-lg-6">
                                        <div className="review-wrapper">
                                            <div className="single-review">
                                                <div className="ratting-form-wrapper pl-50">
                                                    <h3>Add a Review</h3>
                                                    <div className="ratting-form">
                                                        <form onSubmit={handleSubmit}>
                                                            <div className="star-box">
                                                                <span>Your rating:</span>
                                                                <div className="ratting-star">
                                                                    {/* You can enhance this to be interactive */}
                                                                    <i className="fa fa-star" />
                                                                    <i className="fa fa-star" />
                                                                    <i className="fa fa-star" />
                                                                    <i className="fa fa-star" />
                                                                </div>
                                                            </div>
                                                            <div className="row">
                                                                <div className="col-md-12">
                                                                    <label>Rating</label>
                                                                    <input
                                                                        type="number"
                                                                        max={5}
                                                                        min={1}
                                                                        name="rating"
                                                                        value={rating}
                                                                        onChange={(e) => setRating(e.target.value)}
                                                                        placeholder="Rating (1-5)"
                                                                        required
                                                                    />
                                                                    <br />
                                                                    <br />
                                                                    <div className="rating-form-style form-submit">
                                                                        <textarea
                                                                            value={review}
                                                                            onChange={(e) => setReview(e.target.value)}
                                                                            placeholder="Your Review"
                                                                            required
                                                                        />
                                                                        <input type="submit" value="Submit" />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </form>
                                                    </div>
                                                    {/* line with break */}
                                                    <br />
                                                    <hr style={{ border: '1px solid #f9f9f9' }}></hr>
                                                    <br />

                                                    {reviewData.reviews.length > 0 ? (
                                                        reviewData.reviews.map((rev, index) => (
                                                            <div key={index} className="review-top-wrap">
                                                                <div className="review-left">
                                                                    <div className="review-name">
                                                                        <h4>{rev.user}</h4>
                                                                    </div>
                                                                    <div className="review-rating">
                                                                        {Array.from({ length: 5 }, (_, i) =>
                                                                            i < rev.rating ? (
                                                                                <i key={i} className="fa fa-star" />
                                                                            ) : (
                                                                                <i key={i} className="fa fa-star-o" />
                                                                            )
                                                                        )}
                                                                    </div>
                                                                    <div className="review-left">
                                                                        {/* <button>Reply</button> */}
                                                                    </div>
                                                                </div>
                                                                <div className="review-bottom">
                                                                    <p>{rev.comment}</p>
                                                                </div>
                                                            </div>
                                                        ))
                                                    ) : (
                                                        <p>No reviews yet. Be the first to write a review!</p>
                                                    )}

                                                </div>

                                            </div>
                                        </div>
                                    </div>

                                    <div className="col-lg-6">
                                        <div
                                            style={{
                                                backgroundColor: '#f9f9f9',
                                                padding: '20px',
                                                borderRadius: '10px',
                                                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                                                textAlign: 'center'
                                            }}
                                        >
                                            <div className="overall-rating" style={{ marginBottom: '20px' }}>
                                                <h4>Overall Rating</h4>
                                                <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#f39c12' }}>
                                                    {reviewData.average_rating}
                                                </div>
                                                <div>
                                                    {Array.from({ length: 5 }, (_, index) => {
                                                        if (index < Math.floor(reviewData.average_rating)) {
                                                            return <i key={index} className="fa fa-star" style={{ color: '#f39c12', fontSize: '1.2rem' }} />;
                                                        } else if (index < reviewData.average_rating && reviewData.average_rating % 1 >= 0.5) {
                                                            return <i key={index} className="fa fa-star-half-o" style={{ color: '#f39c12', fontSize: '1.2rem' }} />;
                                                        } else {
                                                            return <i key={index} className="fa fa-star-o" style={{ color: '#f39c12', fontSize: '1.2rem' }} />;
                                                        }
                                                    })}
                                                </div>
                                            </div>
                                            <h3>Rating Summary</h3>
                                            <div style={{ maxWidth: '200px', margin: '0 auto' }}>
                                                <Pie data={data} />
                                            </div>
                                            <div style={{ marginTop: '20px', fontStyle: 'italic', color: '#555' }}>
                                                <h4>AI Summary</h4>
                                                <p>
                                                {aiSummary || "Loading summary..."}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <Chatbot />
                            </Tab.Pane>
                        </Tab.Content>
                    </Tab.Container>
                </div>
            </div>
        </div>
    );
};

ProductDescriptionTab.propTypes = {
    spaceBottomClass: PropTypes.string,
    productFullDesc: PropTypes.string
};

export default ProductDescriptionTab;
