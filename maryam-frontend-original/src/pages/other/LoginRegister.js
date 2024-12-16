import React, { Fragment } from "react";
import Cookies from 'js-cookie';
import { Link, useLocation } from "react-router-dom";
import Tab from "react-bootstrap/Tab";
import Nav from "react-bootstrap/Nav";
import SEO from "../../components/seo";
import LayoutOne from "../../layouts/LayoutOne";
import Breadcrumb from "../../wrappers/breadcrumb/Breadcrumb";

const Swal = require('sweetalert2');

const LoginRegister = () => {
  let { pathname } = useLocation();

  // Function to handle registration form submission
  const handleRegister = async (e) => {
    e.preventDefault();

    // Get form values
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());

    try {
      const response = await fetch("http://localhost:5005/api/v1/userauth/adduser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        // Show success message
        Swal.fire({
          icon: 'success',
          title: 'User Registered Successfully',
          showConfirmButton: false,
          timer: 1500,
        });
      } else {
        // Show error message
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'User registration failed. Please try again.',
        });
      }
    } catch (error) {
      // Show error message
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Something went wrong!',
      });
    }
  };

  // Function to handle login form submission
  const handleLogin = async (e) => {
    e.preventDefault();
  
    // Get form values
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());
  
    try {
      const response = await fetch("http://localhost:5005/api/v1/userauth/userlogin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
  
      const result = await response.json(); // Parse response as JSON
  
      if (response.ok) {


        //Store the token in a cookie
      Cookies.set('token', result.token, { expires: 1 });

        // Show success message and handle successful login
        Swal.fire({
          icon: 'success',
          title: 'Login Successful',
          showConfirmButton: false,
          timer: 1500,
        });
        // Optionally redirect to another page or handle the token
        // window.location.href = '/dashboard';
      } else {
        // Show error message
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text:  'Login failed. Please check your credentials and try again.',
        });
      }
    } catch (error) {
      // Show error message
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Something went wrong!',
      });
    }
  };
  

  return (
    <Fragment>
      <SEO
        titleTemplate="Login"
        description="Login page of flone react minimalist eCommerce template."
      />
      <LayoutOne headerTop="visible">
        {/* breadcrumb */}
        <Breadcrumb 
          pages={[
            { label: "Home", path: process.env.PUBLIC_URL + "/" },
            { label: "Login Register", path: process.env.PUBLIC_URL + pathname }
          ]}
        />
        <div className="login-register-area pt-100 pb-100">
          <div className="container">
            <div className="row">
              <div className="col-lg-7 col-md-12 ms-auto me-auto">
                <div className="login-register-wrapper">
                  <Tab.Container defaultActiveKey="login">
                    <Nav variant="pills" className="login-register-tab-list">
                      <Nav.Item>
                        <Nav.Link eventKey="login">
                          <h4>Login</h4>
                        </Nav.Link>
                      </Nav.Item>
                      <Nav.Item>
                        <Nav.Link eventKey="register">
                          <h4>Register</h4>
                        </Nav.Link>
                      </Nav.Item>
                    </Nav>
                    <Tab.Content>
                      <Tab.Pane eventKey="login">
                        <div className="login-form-container">
                          <div className="login-register-form">
                            <form onSubmit={handleLogin}>
                              <input
                                type="email"
                                name="email"
                                placeholder="Username"
                              />
                              <input
                                type="password"
                                name="password"
                                placeholder="Password"
                              />
                              <div className="button-box">
                                <div className="login-toggle-btn">
                                  <input type="checkbox" />
                                  <label className="ml-10">Remember me</label>
                                  <Link to={process.env.PUBLIC_URL + "/forgot-password"}>
                                    Forgot Password?
                                  </Link>
                                </div>
                                <button type="submit">
                                  <span>Login</span>
                                </button>
                              </div>
                            </form>
                          </div>
                        </div>
                      </Tab.Pane>
                      <Tab.Pane eventKey="register">
                        <div className="login-form-container">
                          <div className="login-register-form">
                            <form onSubmit={handleRegister}>
                              <input
                                type="text"
                                name="full_name"
                                placeholder="Full Name"
                              />
                              <input
                                type="text"
                                name="username"
                                placeholder="User Name"
                              />
                              <input
                                name="email"
                                placeholder="Email"
                                type="email"
                              />
                              <input
                                type="password"
                                name="password"
                                placeholder="Password"
                              />
                              <input
                                name="usertype"
                                placeholder="User Type"
                                type="text"
                              />
                              <div className="button-box">
                                <button type="submit">
                                  <span>Register</span>
                                </button>
                              </div>
                            </form>
                          </div>
                        </div>
                      </Tab.Pane>
                    </Tab.Content>
                  </Tab.Container>
                </div>
              </div>
            </div>
          </div>
        </div>
      </LayoutOne>
    </Fragment>
  );
};

export default LoginRegister;