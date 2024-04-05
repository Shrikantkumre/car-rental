import React, { useEffect } from 'react';
import Footer from "../components/Footer";
import '../styles/style.css';
import { Link, useNavigate } from "react-router-dom";

function ThankYou() {
    let navigate = useNavigate();

    useEffect(() => {
        // Check if user is logged in
        const isLoggedIn = localStorage.getItem("isLoggedIn");
        if (!isLoggedIn) {
          navigate('/');
        }
      });

  return (
    <>
      <section className="admin-page">
      <section className="login-main-wrapper">
      <div className="main-container">
          <div className="login-process">
              <div className="login-main-container">
                  <div className="thankyou-wrapper">
                      <h1><img src="http://montco.happeningmag.com/wp-content/uploads/2014/11/thankyou.png" alt="thanks" /></h1>
                        <p>for using our service us, we will get in touch with you soon... </p>
                            <Link className="navbar__buttons__register" to="/">
                            Back to home
                            </Link>
                        <div className="clr"></div>
                    </div>
                    <div className="clr"></div>
                </div>
            </div>
            <div className="clr"></div>
        </div>
    </section>
      </section>
     
      <Footer />
    </>
  );
}

export default ThankYou;
